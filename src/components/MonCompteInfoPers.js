import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext'
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

    //Handle Newsletter

    const handleChecked = async (event) => {
        setUserData({...userData, newsletter: JSON.parse(event.target.value)})
        if (user) {
            try {
                const userRef = doc(db, "usersDetails", user.email);
                await updateDoc(userRef, {
                    newsletter: JSON.parse(event.target.value)
                });
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la newsletter', error);
            }
        }

    };

    const { nom, prenom, email, adress, phone, password, newsletter } = userData
    return (
        <>
            {JSON.stringify(userData)}
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
            <section>
                <h3>NewsLetter</h3>
                <hr />
                <p>Abonnez vous à la newsletter ! Ne ratez pas nos offres exceptionnels sur votre article préféré</p>
                <div>
                    <label>
                        <input type="radio" name="newsletter" value={true} checked={newsletter} onChange={handleChecked} /> Oui
                    </label> <br />
                    <label>
                        <input type="radio" name="newsletter" value={false} checked={!newsletter} onChange={handleChecked} /> Non
                    </label>
                </div>
            </section>
        </>

    )
}

export default MonCompteInfoPers