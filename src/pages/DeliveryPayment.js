import React, {useState} from 'react'
import OrderRecapMain from '../components/OrderRecapMain'
import { Link } from 'react-router-dom'
import '../styles/DeliveryPayment.css'
import MonCompteInfoPersMain from '../components/MonCompteInfoPersMain'
import DeliveryMethod from '../components/DeliveryMethod'
import PaymentMethod from '../components/PayMentMethod'

function DeliveryPayment() {

    const [orderData, setOrderData] = useState({})

    const handleInfoPersChange = (infoPersData) => {
        setOrderData({...orderData, ...infoPersData, password: 'hide'})
    }

    const handleDeliveryChange = (deliveryData) => {
        setOrderData({...orderData, ...deliveryData})
    }

    return (<>
        <section>
        {JSON.stringify(orderData)}
            <div className="container container-largeur mb-5">
                <div className="row mb-5 mt-5">
                    <div className="d-flex justify-content-between">
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
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className='deliveryLeftComponent pb-4'>
                        <MonCompteInfoPersMain selected={true} onInfoPersChange={handleInfoPersChange}/>
                    </div>
                    <div className='deliveryLeftComponent'>
                        <DeliveryMethod onDeliveryChange={handleDeliveryChange}/>
                    </div>
                    <div className='deliveryLeftComponent'>
                        <PaymentMethod />
                    </div>
                </div>
                <div className="col-md-6">
                    <OrderRecapMain />
                </div>
            </div>
            <div className="submitBtnContainer w-100 d-flex justify-content-center">
                <button className="submitOrder">Valider et payer</button>
            </div>
        </section>

    </>
    )
}

export default DeliveryPayment