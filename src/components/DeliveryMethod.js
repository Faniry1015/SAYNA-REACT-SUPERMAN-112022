import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext'
import { doc, getDoc } from "firebase/firestore";
import '../styles/DeliveryPayment.css'

function DeliveryMethod() {
    const { user } = UserAuth()
    const [userData, setUserData] = useState({})
    const [state, setState] = useState({ deliveryMethod: 'chronoPost', deliveryAdress: '' })

    const getUserInfo = async () => {
        if (user.email) {
            try {
                const userRef = doc(db, "usersDetails", user.email);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data())
                } else {
                    console.log("No such document!");
                }
            } catch (e) {
                alert('Erreur de chargement des informations utilisateurs', e.message)
            }
        }
    }

    useEffect(() => {
        getUserInfo()
        // eslint-disable-next-line
    }, [user])

    const handleStateChange = (e) => {
        if (e.target.id === 'deliveryMethod') {
            setState((state) => ({ ...state, deliveryMethod: e.target.value }))
        } else {
            setState((state) => ({ ...state, deliveryAdress: e.target.value }))
        }

    }

    const { adress } = userData
    return (
        <div className='monCompte__Container'>
            <section className='monCompte__infoPersContainer deliveryContainer'>
                <h3>Livraison</h3>
                <hr />
                <div>
                    <ul>
                        <li><label htmlFor="deliveryMethod">Méthode de livraison :</label>  <select className="custom-select w-100" id="deliveryMethod" value={state.deliveryMethod} onChange={handleStateChange}>
                            <option value="chronopost">ChronoPost - Livraison à domicile</option>
                            <option value="dhl">DHL</option>
                            <option value="magasin">Récupération en magasin</option>
                            <option value="autre">Autre</option>
                        </select></li>
                        <li>
                            <label htmlFor="deliveryAdress">Addresse de livraison :</label>
                            <input type="text" className='w-100' name="deliveryAdress" id="deliveryAdress" defaultValue={adress} onChange={handleStateChange} />
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default DeliveryMethod