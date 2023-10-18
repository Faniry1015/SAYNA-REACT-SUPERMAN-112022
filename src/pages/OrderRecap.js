import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/OrderRecap.css'
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import OrderProducts from '../components/OrderProducts.js';

function OrderRecap() {

    const [cartProducts, setCartProducts] = useState([])
    const [state, setState] = useState({
        totalPayment: 0,
        totalArticles: 0
    })
    const codePromoRef = createRef()

    const [codePromo, setCodePromo] = useState('')

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
    }, [user])

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

    //Gérer le code promo
    const handleCodePromoSubmit = (e) => {
        e.preventDefault()
        setCodePromo(codePromoRef.current.value)
    }
    return (<>
        <div className="container container-largeur mb-5">
            <div className="row mb-5 mt-5">
                <div className="d-flex justify-content-between">
                    <nav>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/eshop" >E-shop </Link></li><span>&nbsp;/&nbsp;</span>
                            <li className="breadcremb-item">
                                <Link to="/eshop/cart" >Panier</Link>
                            </li><span>&nbsp;/&nbsp;</span>
                            <li className="breadcremb-item active"><span className='cartInactiveLabel'>
                                Récapitulatif de la commande
                            </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="orderMainPart">
                <div className="recap">
                    <h3>Commande</h3>
                </div>
                <div className="product-box">
                    <OrderProducts cartProducts={cartProducts} />
                </div>
                <div className="codePromoContainer d-flex align-items-center my-4">
                    <form onSubmit={handleCodePromoSubmit}>
                        <input type="text" name="codePromo" id="codePromo" className='codePromoInput' placeholder='Code promo' ref={codePromoRef}/>
                        <button type='submit' className='addCodePromoBtn' placeholder='Code Promo'>Ajouter</button>
                    </form>

                </div>
                <hr />
                <div className="sous-total container-largeur">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>
                                Total
                            </h4>
                        </div>
                        <div>
                            <h3>
                                {padSingleDigit(state.totalPayment)}€
                            </h3>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>
                                Réduction
                            </h4>
                        </div>
                        <div>
                            <h3>
                                {padSingleDigit(state.totalPayment / 10)}€
                            </h3>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>
                                Taxe
                            </h4>
                        </div>
                        <div>
                            <h3>
                                20%
                            </h3>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>
                                Total
                            </h4>
                        </div>
                        <div>
                            <h3>
                                {padSingleDigit(state.totalPayment)}€
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className="container container-largeur d-flex justify-content-center align-items-center">
            <Link to='/eshop'>
                <button className="mx-2">Retourner au catalogue</button>
            </Link>
            <Link to='/eshop/cart'>
                <button className="mx-2">
                    Continuer vers paiement
                </button>
            </Link>
        </section>
    </>
    )
}

export default OrderRecap