import React, { useEffect, useState, createRef } from 'react'
import '../styles/OrderRecap.css'
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import OrderProducts from '../components/OrderProducts.js';

function OrderRecapMain({ onOrderRecapChange }) {

    const [orderProducts, setOrderProducts] = useState([])
    const [state, setState] = useState({
        subTotalState: 0,
        reduction: 0,
        taxe: 20,
        totalPayement: 0,
    })

    const codePromoRef = createRef()
    const [allCodePromo, setAllCodePromo] = useState([])
    const [codePromo, setCodePromo] = useState('')
    const [codePromoValue, setCodePromoValue] = useState(0)

    const [orderRecapData, setOrderRecapData] = useState({})

    const { user } = UserAuth()

    //Récupérer tous le panier depuis firebase
    const getAllOrderProduct = async function () {
        if (user) {
            const productsOrderArray = []
            const querySnapShot = await getDocs(collection(db, `Cart-${user.uid}`));
            querySnapShot.forEach((doc) => {
                productsOrderArray.push({ id: doc.id, ...doc.data() })
            })
            setOrderProducts([...productsOrderArray])
            //Order Info for payment and delivery component
            const infoTokeepForOrder = ['id', 'nom', 'prix', 'categorie', 'quantité', 'prixTotalArticles']
            const filteredProductData = []
            productsOrderArray.forEach((product) => {
                const orderProductInfo = Object.fromEntries(
                    Object.entries(product).filter(([key]) => infoTokeepForOrder.includes(key))
                )
                filteredProductData.push(orderProductInfo)
            })
            setOrderRecapData({
                ...orderRecapData,
                articlesInfo: filteredProductData
            })
        } else {
            alert('Connectez vous à un compte pour pouvoir faire des achats')
        }

        //get all code promo
        const querySnapshot = await getDocs(collection(db, "codePromo"));
        const allCodePromoArray = []
        querySnapshot.forEach((doc) => {
            allCodePromoArray.push({ code: doc.id, value: doc.data().value })
            setAllCodePromo(allCodePromoArray)
        });
        allCodePromoArray.forEach((promo) => {
            console.info(`code promo : ${promo.code} => remise ${promo.value}%`) 
        })
    }

    useEffect(() => {
        (async () => {
            await getAllOrderProduct()
        })()
    } 
    , [])

    //Modification des sous-totaux
    useEffect(() => {
        const subTotal = orderProducts.map((product) => {
            return product.prixTotalArticles
        })

        const add = function (arr) {
            return arr.reduce((a, b) => a + b, 0);
        };

        const sumSubTotal = add(subTotal);
        function reductionAmount() {
            if (codePromoValue !== 0) {
                return (codePromoValue * sumSubTotal / 100)
            } else {
                return 0
            }

        }
        const totalPayement = (sumSubTotal - reductionAmount()) + (sumSubTotal - reductionAmount()) / state.taxe

        setState((state, props) => ({
            taxe: 20, subTotalState: sumSubTotal,
            reduction: reductionAmount(),
            totalPayement: totalPayement,
        }))
        setOrderRecapData({
            ...orderRecapData,
            allAmountDetails: {
                taxe: 20, subTotalState: sumSubTotal,
                reduction: reductionAmount(),
                totalPayement: totalPayement,
            }
        })

    }, [orderProducts, codePromoValue, state.reduction])

    function padSingleDigit(number) {
        const numberString = number.toString();

        if (numberString.length === 1) {
            return '0' + numberString;
        }

        return numberString;
    }

    //Gérer le code promo
    const handleCodePromoSubmit = async (e) => {
        e.preventDefault()
        setCodePromo(codePromoRef.current.value)
    }

    useEffect(() => {
        allCodePromo.find((element) => {
            if (element.code === codePromo) {
                setCodePromoValue(element.value)
            }
        })
    }, [codePromo])

    useEffect(() => {
        onOrderRecapChange(orderRecapData)
    }, [orderRecapData])


    return <>
        {/* {JSON.stringify(orderRecapData)} */}
        <div className="container container-largeur mb-5">
            <div className="orderMainPart">
                <div className="recap">
                    <h3>Commande</h3>
                </div>
                <div className="product-box">
                    <OrderProducts orderProducts={orderProducts} />
                </div>
                <div className="codePromoContainer my-4">
                    <form className='d-flex align-items-center flex-wrap' id='codePromoForm' onSubmit={handleCodePromoSubmit}>
                        <input type="text" name="codePromo" id="codePromo" className='codePromoInput px-1 mb-3' placeholder='Code promo' ref={codePromoRef} />
                        <button type='submit' className='addCodePromoBtn mb-3' placeholder='Code Promo'>Ajouter</button>
                    </form>

                </div>
                <hr />
                {/* {JSON.stringify(state)} */}
                <div className="sous-total">
                    <div className="d-flex justify-content-between w-100">
                        <div>
                            <h4>
                                Sous-total
                            </h4>
                        </div>
                        <div>
                            <h3>
                                {padSingleDigit(state.subTotalState.toFixed(2))}€
                            </h3>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <div>
                            <h4>
                                Réduction {codePromoValue > 0 && <>({codePromoValue}%)</>}
                            </h4>
                        </div>
                        <div>
                            <h3>
                                {padSingleDigit(state.reduction.toFixed(2))}€
                            </h3>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <div>
                            <h4>
                                Taxe
                            </h4>
                        </div>
                        <div>
                            <h3>
                                {state.taxe.toFixed(2)}%
                            </h3>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between w-100">
                        <div>
                            <h4>
                                TOTAL
                            </h4>
                        </div>
                        <div>
                            <h3>
                                {padSingleDigit(state.totalPayement.toFixed(2))}€
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OrderRecapMain