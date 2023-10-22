import React, { createRef, useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../styles/MonCompteInfoPers.css'

function MonCompteInfoPersMain({ selected, onInfoPersChange }) {

    const { user } = UserAuth()

    const [userData, setUserData] = useState({ newsletter: false })
    const [changeFormStatus, setChangeFormStatus] = useState(false)
    const infoPersRef = createRef()

    const getUserInfo = async () => {
        if (user.email) {
            try {
                const userRef = doc(db, "usersDetails", user.email);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data())
                    onInfoPersChange(userSnap.data())
                } else {
                    console.log("No such document!");
                }
            } catch (e) {
                console.error('Erreur de chargement des informations utilisateurs, vérifiez votre connexion internet et actualisez la page', e.message)
            }
        }
    }

    useEffect(() => {
        getUserInfo()
        // eslint-disable-next-line
    }, [user])

    const toggleChangeForm = () => {
        setChangeFormStatus(!changeFormStatus)
    }

    const handleSubmitChange = async (e) => {
        e.preventDefault()
        const formData = new FormData(infoPersRef.current);
        const formDataObject = {};
        for (const [name, value] of formData.entries()) {
            formDataObject[name] = value;
        }
        setUserData({ ...userData, ...formDataObject })
        onInfoPersChange({ ...userData, ...formDataObject })
        toggleChangeForm()
        // Mise à jour de la bdd firebase
        try {
            const userRef = doc(db, "usersDetails", user.email);
            await updateDoc(userRef, {
                ...formDataObject
            });
        } catch (error) {
            console.error("Error updating userInfo: ", error)
        }
    }

    const { nom, prenom, email, adress, phone, password } = userData
    return (
        <>
            <section className='monCompte__infoPersContainer'>
                <h3>Informations personnelles</h3>
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
                    <button onClick={toggleChangeForm}>Modifier</button>
                </div>
            </section>
            {changeFormStatus && <div className="changeInfoPersContainer d-flex justify-content-center align-items-around">
                <div className='closeChangeForm ' onClick={toggleChangeForm}><i className="fa-solid fa-2x fa-xmark"></i></div>
                <form ref={infoPersRef} type="submit" onSubmit={handleSubmitChange} className='changeFormInput'>
                <h3>Modifier les informations personnelles</h3>
                <hr />
                    <div className="signup-form-group mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input type="text" className="form-control" id="nom" name='nom' placeholder="Nom" defaultValue={nom} />
                    </div>
                    <div className="signup-form-group mb-3">
                        <label htmlFor="prenom" className="form-label">Prénom</label>
                        <input type="text" className="form-control" id="prenom" name='prenom' placeholder="Prénom" defaultValue={prenom} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Téléphone</label>
                        <input type="tel" className="form-control" id="phone" name='phone' placeholder='téléphone' defaultValue={phone} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adress" className="form-label">Adresse</label>
                        <input type="text" className="form-control" id="adress" name='adress' placeholder='adresse' defaultValue={adress} />
                    </div>
                    <div className='btnContain mb-3'>
                        <button type="submit" className="btnContain__form">valider</button>
                    </div>
                </form>
            </div>}
        </>
    )
}

export default MonCompteInfoPersMain