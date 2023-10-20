import React, { useState } from 'react'
import '../styles/DeliveryPayment.css'

function PaymentMethod() {
    const [paymentMethod, setPaymentMethod] = useState('cash')

    const handlePaymentMethod = (e) => {
        setPaymentMethod((e.target.value))

    }
    return (
        <div className='monCompte__Container'>
            <section className='monCompte__infoPersContainer'>
                <h3>Moyen de paiement</h3>
                <hr />
                <div>
                    <ul>
                        <li><label htmlFor="paymentMethod">Méthode de livraison :</label>  <select className="custom-select w-100" id="deliveryMethod" value={paymentMethod} onChange={handlePaymentMethod}>
                            <option value="cash">En espèce à la livraison</option>
                            <option value="visa">Carte VISA</option>
                            <option value="mobile">Mobile banking</option>
                            <option value="autre">Autre</option>
                        </select></li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default PaymentMethod