import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/orderConfirmed.css'

function OrderConfirmed() {

    return (<>
        <section className="mb-5 mt-5">
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
        </section>
        <section className='orderConfirmed__mainSection d-flex justify-content-center align-items-center flex-column'>
            <div className="orderConfirmed__btnContainer d-flex justify-content-center align-items-center">
                <Link to='/eshop'>
                    <button className='m-5'>Retourner au catalogue</button>
                </Link>
                <Link to='/'>
                    <button className='m-5'>Revenir à l'accueil</button>
                </Link>
            </div>
            <div className="orderConfirmed__TextContainer text-center m-5">
                <h4>Merci pour votre commande !</h4>
                <p>
                    Superman se charge de livrer votre commande ! Ce sera fait à la vitesse de l’éclair tant que Lex Luthor se tiendra tranquille ou que Batman ne cherche pas des noises à notre journaliste préféré ! <br />
                    {/* L'envoi de mail nécéssite une fonction payante de firebase */}
                    {/* Retrouvez le détail de votre commande ci-dessous et dans le mail de confirmation envoyé à l’adresse mail renseignée. Vous n’avez pas reçu le mail ? Renvoyer la confirmation d’achat. */}
                </p>
            </div>
        </section>
    </>
    )
}

export default OrderConfirmed