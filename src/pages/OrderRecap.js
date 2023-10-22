import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/OrderRecap.css'
import OrderRecapMain from '../components/OrderRecapMain';

function OrderRecap() {
    const handleOrderRecapChange = () => {
        //Not used here but in DeliveryPayment.js
        return
    }

    return (<>
        <section className="mb-5 mt-5">
            <div className="d-flex justify-content-between">
                <nav>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/eshop" >E-shop </Link></li><span>&nbsp;/&nbsp;</span>
                        <li className="breadcremb-item">
                            <Link to="/eshop/cart" >Panier</Link>
                        </li><span>&nbsp;/&nbsp;</span>
                        <li className="breadcremb-item active"><span className='orderInactiveLabel'>
                            Récapitulatif de la commande
                        </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
        <OrderRecapMain onOrderRecapChange={handleOrderRecapChange}/>
        <section id='orderRecapBtn' className="container container-largeur d-flex justify-content-center align-items-center">
            <Link to='/eshop'>
                <button className="mx-2">Retourner au catalogue</button>
            </Link>
            <Link to='/eshop/cart/orderRecap/deliveryPayment' >
                <button className="mx-2">
                    Continuer vers paiement
                </button>
            </Link>
        </section>
    </>
    )
}

export default OrderRecap