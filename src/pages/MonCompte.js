import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../styles/MonCompte.css"
import MonCompteApp from '../components/MonCompteApp'

function MonCompte() {
  const { logout } = UserAuth()


  return (
    <>
      <section className='monCompte__header'>
        <h1>Seriez vous kryptonien ? <br />
          Dites nous en plus</h1>
      </section>
      <MonCompteApp />


    </>
  )
}

export default MonCompte