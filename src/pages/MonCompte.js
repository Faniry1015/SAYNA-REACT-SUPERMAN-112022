import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../styles/MonCompte.css"

function MonCompte() {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()

  const deconnecter = async () => {
    try {
      await logout()
      navigate('/login')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <h1>Batman mon Compte</h1>
      <p>Email utilisateur: {user && user.email} </p>
      <button className="text-upercase" onClick={deconnecter}>Déconnecter</button>
    </>
  )
}

export default MonCompte