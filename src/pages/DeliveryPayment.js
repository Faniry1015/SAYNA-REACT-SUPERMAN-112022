import React from 'react'
import OrderRecapMain from '../components/OrderRecapMain'
import { Link } from 'react-router-dom'
import '../styles/DeliveryPayment.css'

function DeliveryPayment() {
    return (<>
        <section>
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
                <div className="col-md-6">Adresses</div>
                <div className="col-md-6">
                    <OrderRecapMain />
                </div>
            </div>
        </section>

    </>
    )
}

export default DeliveryPayment