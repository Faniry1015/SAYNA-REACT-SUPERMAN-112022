import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Cart.css'
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import CartProducts from '../components/CartProducts';

function Cart() {
  console.log('cart')
  const [cartProducts, setCartProducts] = useState([])
  const [state, setState] = useState({ 
    totalPayment: 0, 
    totalArticles: 0 
  })

  const { user } = UserAuth()

  //Récupérer tous le panier depuis firebase
  const getAllCartProduct = async function () {
    if (user) {
      const productsCartArray = []
      const querySnapShot = await getDocs(collection(db, `Cart-${user.uid}`));
      querySnapShot.forEach((doc) => {
        productsCartArray.push({ id: doc.id, ...doc.data() })
      })
      setCartProducts([...productsCartArray])
      console.log('render')
    } else {
      alert('Connectez vous à un compte pour pouvoir faire des achats')
    }
  }

  useEffect(function () {
    getAllCartProduct()
  }, [user])

  //Gestion des produits dans le panier
  //ENCORE DES BUGS DANS DELETE
  const deleteItem = async function (product) {
    // const leftProducts = cartProducts.filter((item) => item.nom !== product.nom)
    // setCartProducts([...leftProducts])
    await deleteDoc(doc(db, `Cart-${user.uid}`, product.nom))
  }

  const qttChange = async function (product, change) {
    const product_cart = product
    if (change === 'increase') {
      ++product_cart.quantité
    } else {
      if (product_cart.quantité > 1) {
        --product_cart.quantité
      }
    }
    product_cart.prixTotalArticles = product_cart.quantité * product_cart.prix

    //Mise à jour de l'état
    const changedProducts = cartProducts.map((item) => {
      if (item.nom === product.nom) {
        return { ...product, quantité: product_cart.quantité, prixTotalArticles: product_cart.prixTotalArticles }
      } else {
        return item
      }
    })

    setCartProducts([...changedProducts])

    //Mise à jour de la BDD 
    try {
      const cartProductRef = doc(db, `Cart-${user.uid}`, product.nom)
      await updateDoc(cartProductRef, {
        quantité: product_cart.quantité,
        prixTotalArticles: product_cart.prixTotalArticles
      });
    } catch (e) {
      alert('Impossible de mettre à jour les articles du panier:', e.message)
    }
  }

  //Modification des sous-totaux
  useEffect(() => {
    const totalPaiementArray = cartProducts.map((product) => {
      return product.prixTotalArticles
    })
    const totalArticlesArray = cartProducts.map((product) => {
      return product.quantité
    })

    const add = function (arr) {
      return arr.reduce((a, b) => a + b, 0);
    };

    let sumPayement = add(totalPaiementArray);
    let sumArticles = add(totalArticlesArray);
    setState((state, props) => ({ totalPayment: sumPayement, totalArticles: sumArticles }))
  }, [cartProducts])


  return (<>
    {/* {JSON.stringify(cartProducts)} */}
    <div className="container container-largeur">
      <div className="row">
        <div className="d-flex justify-content-between">
          <nav>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/eshop" >eshop</Link></li>
              <li className="breadcremb-item active"><Link to='/eshop/cart'>
                Panier
              </Link>
              </li>
            </ul>
          </nav>
          <div className="cart"><Link to='/eshop/cart'></Link>
            <i className="fa-solid fa-2x fa-cart-plus"></i>
          </div>
        </div>
      </div>
      <div className="recap">
        <p>Récapitulatif du panier</p>
      </div>
      <div className="product-box">
        <CartProducts cartProducts={cartProducts} deleteItem={deleteItem} qttChange={qttChange} />
      </div>

      <div className="sous-total container-largeur">
        <h3 className="float-end">
          <strong>Nombre total d'Articles : {state.totalArticles}</strong> <br />
          <strong>Total à payer : {state.totalPayment}$</strong>
        </h3>
      </div>
    </div>
    <section className="container container-largeur d-flex mx-auto my-5">
      <Link to='/eshop'>
        <button className="mx-2">Continuer mes achats</button>
      </Link>
      <Link to='/eshop/cart'>
        <button className="mx-2">
          Passer commande
        </button>
      </Link>
    </section>
    {cartProducts.length <= 0 && <>
      <br />
      <br />
      <h1 className="text-center">Ton panier est vide</h1>
      <div className="container-largeur">
        <Link to='/eshop'>
          <button>Faire des Achats</button>
        </Link>
      </div>
    </>}
  </>
  )
}

export default Cart