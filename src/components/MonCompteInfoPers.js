import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../styles/MonCompteInfoPers.css'
import MonCompteInfoPersMain from './MonCompteInfoPersMain';
import MonCompteInfoNewsletter from './MonCompteInfoNewsletter';

function MonCompteInfoPers({ selected }) {

    const { user } = UserAuth()

    const [userData, setUserData] = useState({ newsletter: false })
    //handle newsletter change from here (NOT INFO PERS which is also used in payment and delivery page)
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
                console.error('Erreur de chargement des informations utilisateurs', e)
            }
        }
    }

    useEffect(() => {
        getUserInfo()
        // eslint-disable-next-line
    }, [user])

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

    const { newsletter } = userData
    return (
        <div hidden={!selected} className='monCompte__Container'>
            <MonCompteInfoPersMain />
            <MonCompteInfoNewsletter newsletterStatus={newsletter} onNewsletterChange={handleNewsletterChange} />
        </div>
    )
}

export default MonCompteInfoPers