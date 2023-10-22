import React, { useState } from 'react'
import OrderRecapMain from '../components/OrderRecapMain'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/DeliveryPayment.css'
import MonCompteInfoPersMain from '../components/MonCompteInfoPersMain'
import DeliveryMethod from '../components/DeliveryMethod'
import PaymentMethod from '../components/PayMentMethod'
import { db } from '../firebase-config'
import { setDoc, doc, Timestamp, deleteDoc } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'


function DeliveryPayment() {
    const { user } = UserAuth()

    const [orderData, setOrderData] = useState({})
    const navigate = useNavigate()

    const handleInfoPersChange = (infoPersData) => {
        const filteredInfo = { ...infoPersData }
        const infoPersToDelete = ['password', 'newsletter']
        infoPersToDelete.forEach(key => {
            delete filteredInfo[key]
        });
        setOrderData((prevData) => ({
            ...prevData,
            clientInfo: filteredInfo
        }

        ));
    };

    const handleDeliveryChange = (deliveryData) => {
        setOrderData((prevData) => ({
            ...prevData,
            deliveryInfo: deliveryData
        }
        ));
    };

    const handlePaymentChange = (paymentData) => {
        setOrderData((prevData) => ({
            ...prevData, paymentInfo: paymentData
        }
        ));
    };

    const handleOrderRecapChange = (orderDetailMainInfo) => {
        setOrderData((prevData) => ({
            ...prevData, articlesAndAmountToPay: orderDetailMainInfo
        }
        ));
    };

    const handleSubmitOrder = async () => {
        const orderSubmitedData = {
            ...orderData, date: Timestamp.fromDate(new Date())
        }
        try {
            await setDoc(doc(db, "commandes", `order-${orderSubmitedData.date}`), orderSubmitedData);
            //Supprimer les articles du panier     
            orderSubmitedData.articlesAndAmountToPay.articlesInfo.forEach(async (article) => {
                console.log(article.id)
                await deleteDoc(doc(db, `Cart-${user.uid}`, article.nom))
            })
            console.log('DETAILS SUR LA COMMANDE ENVOYE: ', orderData);
            navigate('/eshop/cart/orderRecap/deliveryPayment/orderConfirmed')
        } catch (error) {
            console.log(error)
            alert("Erreur lors de l'envoie de la commande, vérifiez votre connexion internet et actualisez la page: ");
        };
    }

    return (<>
        <section>
            {/* {JSON.stringify(orderData)} */}
            <div className="mb-5 mt-5">
                <nav>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/eshop" >E-shop </Link></li><span>&nbsp;/&nbsp;</span>
                        <li className="breadcremb-item">
                            <Link to="/eshop/cart" >Panier</Link>
                        </li><span>&nbsp;/&nbsp;</span>
                        <li className="breadcremb-item">
                            <Link to="/eshop/cart/orderRecap" >Récapitulatif de la commande</Link>
                        </li><span>&nbsp;/&nbsp;</span>
                        <li className="breadcremb-item active"><span className='orderInactiveLabel'>
                            Livraison et paiement
                        </span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className='deliveryLeftComponent pb-4'>
                        <MonCompteInfoPersMain selected={true} onInfoPersChange={handleInfoPersChange} />
                    </div>
                    <div className='deliveryLeftComponent'>
                        <DeliveryMethod onDeliveryChange={handleDeliveryChange} />
                    </div>
                    <div className='deliveryLeftComponent'>
                        <PaymentMethod onPaymentChange={handlePaymentChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <OrderRecapMain onOrderRecapChange={handleOrderRecapChange} />
                </div>
            </div>
            <div className="submitBtnContainer w-100 d-flex justify-content-center">
                <button className="submitOrder" onClick={handleSubmitOrder}>Valider et payer</button>
            </div>
        </section>

    </>
    )
}

export default DeliveryPayment