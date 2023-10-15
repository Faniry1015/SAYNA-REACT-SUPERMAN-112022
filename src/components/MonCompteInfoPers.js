import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext'
import { doc, getDoc } from "firebase/firestore";

function MonCompteInfoPers({ title, selected }) {

    const { user } = UserAuth()

    const [userData, setUserData] = useState({})

    const getUserInfo = async () => {
        if (user.email) {
            try {
                const userRef = doc(db, "usersDetails", user.email);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    console.log("User data:", userSnap.data());
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
    }, [user])

    const { nom, prenom, email, adress, phone, password } = userData
    return (
        <section className='monCompte__infoPersContainer' hidden={!selected}>
            <h3>{title}</h3>
            <hr />
            <div>
                <ul>
                    <li>Nom: {nom} </li>
                    <li>prénom: {prenom} </li>
                    <li>Mot de passe: {password}  </li>
                    <li>Email: {email} </li>
                    <li>Numéro de téléphone: {phone} </li>
                    <li>Addresse : {adress} </li>
                </ul>
                <button>Modifier</button>
            </div>
        </section>
    )
}

export default MonCompteInfoPers