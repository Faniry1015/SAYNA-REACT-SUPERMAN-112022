import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../styles/MonCompte.css"
import MonCompteApp from '../components/MonCompteApp'

function MonCompte() {
  const { user, logout } = UserAuth()
  const navigate = useNavigate()

  const deconnecter = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <section className='userStatus'>
      <i class="fa-regular fa-2x fa-circle-user"></i> {user && user.email} <button className="logoff" onClick={deconnecter}>Déconnecter</button>
      </section>
      <section className='monCompte__header'>
        <h1>Seriez vous kryptonien ? <br />
          Dites nous en plus</h1>
      </section>
      <MonCompteApp />


    </>
  )
}

export default MonCompte