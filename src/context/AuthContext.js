import { React, createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase-config';

import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const UserContext = createContext();

const AuthContextProvider = ({children}) => {
    
    const [user, setUser] = useState({})

    //Créer un User
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //Pour avoir le currentUser
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
        return unSubscribe;
    }, [])

    //Déconnexion
    const logout = () => {
        return signOut(auth)
    }

    //Connexion
    const login = (email, password ) => {
        return signInWithEmailAndPassword(auth, email,password)
    }

    //Reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    //Valeur des fonctions  à exporter
    const value = { 
        createUser,
        user,
        logout,
        login,
        resetPassword,
    }

    return <UserContext.Provider value={value}> 
        {children}
    </UserContext.Provider>
}; 

const UserAuth = () => {
    return useContext(UserContext);
};

export {AuthContextProvider, UserAuth}