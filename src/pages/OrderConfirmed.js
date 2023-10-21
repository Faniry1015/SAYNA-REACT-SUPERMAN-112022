import React from 'react'
import { Link } from 'react-router-dom'

function OrderConfirmed() {

    return (<>
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
                                <li className="breadcremb-item">
                                    <Link to="/eshop/cart/orderRecap/deliveryPayment" >Livraison et paiement</Link>
                                </li><span>&nbsp;/&nbsp;</span>
                                <li className="breadcremb-item active"><span className='orderInactiveLabel'>
                                    Achat confirmé
                                </span>
                                </li>
                    </ul>
                </nav>
            </div>
        </div>
    </>
    )
}

export default OrderConfirmed