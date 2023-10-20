import React, { createRef, useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../styles/MonCompteInfoPers.css'
import MonCompteInfoPersMain from './MonCompteInfoPersMain';
import MonCompteInfoNewsletter from './MonCompteInfoNewsletter';

function MonCompteInfoPers({ selected }) {

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

    //Handle Newsletter

    const handleNewsletterChange = async (newsletterData) => {
        setUserData({ ...userData, newsletter: JSON.parse(newsletterData) })
        if (user) {
            try {
                const userRef = doc(db, "usersDetails", user.email);
                await updateDoc(userRef, {
                    newsletter: JSON.parse(newsletterData)
                });
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la newsletter', error);
            }
        }

    };

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

    const { nom, prenom, email, adress, phone, password, newsletter } = userData
    return (
        <div hidden={!selected} className='monCompte__Container'>
            <MonCompteInfoPersMain />
            <MonCompteInfoNewsletter newsletterStatus={newsletter} onNewsletterChange={handleNewsletterChange} />
        </div>
    )
}

export default MonCompteInfoPers