import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Cart.css'
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import CartProducts from '../components/CartProducts';

function Cart() {
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
    } else {
      alert('Connectez vous à un compte pour pouvoir faire des achats')
    }
  }

  useEffect(function () {
    getAllCartProduct()
    // eslint-disable-next-line
  }, [user])

  //Gestion des produits dans le panier
  const deleteItem = async function (product) {
    const product_cart = product
    product.quantité = 0
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
      await deleteDoc(doc(db, `Cart-${user.uid}`, product.nom))
    } catch (e) {
      console.log(e.message)
      alert('Erreur lors de la mise à jour des éléments du panier en ligne, vérifier votre connexion internet et actualiser la page:')
    }
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
      console.log(e.message)
      alert('Erreur lors de la mise à jour des éléments du panier en ligne, vérifier votre connexion internet et actualiser la page:')
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

  function padSingleDigit(number) {
    const numberString = number.toString();

    if (numberString.length === 1) {
      return '0' + numberString;
    }
    return numberString;
  }

  return (
    <section >
      <div className="container container-largeur mb-5">
        <div className="row mb-5 mt-5">
          <div className="d-flex justify-content-between">
            <nav>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/eshop" >E-shop </Link></li><span>&nbsp;/&nbsp;</span>
                <li className="breadcremb-item active"><span className='cartInactiveLabel'>
                  Panier
                </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="recap">
          <h3>Récapitulatif du panier</h3>
        </div>
      </div>
      {cartProducts.length > 0 && <>
        <div className="product-box container-largeur mb-5">
          <CartProducts cartProducts={cartProducts} deleteItem={deleteItem} qttChange={qttChange} />
        </div>

        <div className="sous-total container-largeur">
          <h3 className="">
            <span>Nombre total d'Articles : </span><strong> {padSingleDigit(state.totalArticles)}</strong>
          </h3>
          <h3>
            <span>Total à payer :</span><strong> {padSingleDigit(state.totalPayment)}€</strong>
          </h3>
          <hr />
        </div>
        <section className="container container-largeur d-flex justify-content-center align-items-center">
          <Link to='/eshop'>
            <button className="mx-2">Continuer mes achats</button>
          </Link>
          <Link to='/eshop/cart/orderRecap'>
            <button className="mx-2">
              Passer commande
            </button>
          </Link>
        </section>
        {/* {cartProducts.length}
      {JSON.stringify(cartProducts)} */}
      </>}
      {
        cartProducts.length <= 0 && <>
          <h2 className="text-center mb-5">Ton panier est vide</h2>
          <div className="container-largeur d-flex justify-content-center">
            <Link to='/eshop'>
              <button>Faire des Achats</button>
            </Link>
          </div>
        </>
      }
    </section>
  )
}

export default Cart