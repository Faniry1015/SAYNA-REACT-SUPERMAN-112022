import React, { useState } from 'react'
import '../styles/DeliveryPayment.css'

function PaymentMethod() {
    const [payment, setPayment] = useState({paymentMethod: 'cash', paymentDetail: ''})

    const handlePayment = (e) => {
        if (e.target.type === 'option') {
            setPayment({...payment, paymentMethod: e.target.value})
        } else {
            setPayment({...payment, paymentDetail: e.target.value})
        }


    }

    const {paymentMethod, paymentDetail} = payment
    return (
        <div className='monCompte__Container'>
            <section className='monCompte__infoPersContainer'>
                <h3>Paiement</h3>
                <hr />
                <div>
                    <ul>
                        <li>
                            <label htmlFor="paymentMethod">Méthode de livraison :</label>
                            <select className="custom-select w-100" id="deliveryMethod" value={paymentMethod} onChange={handlePayment}>
                                <option value="cash">En espèce à la livraison</option>
                                <option value="visa">Carte VISA</option>
                                <option value="mobile">Mobile banking</option>
                                <option value="autre">Autre</option>
                            </select></li>
                            {paymentMethod !== 'cash' && <li>
                            <label htmlFor="paymentDetail">N° {paymentMethod}</label>
                            <input type="text" name='paymentDetail' className='w-100' onChange={handlePayment}/>
                        </li>}
                        
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default PaymentMethod