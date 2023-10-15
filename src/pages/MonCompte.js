import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../styles/MonCompte.css"
import MonCompteApp from '../components/MoCompteApp'

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
      <section className='monCompte__header'>
        <h1>Seriez vous kryptonien ? <br />
          Dites nous en plus</h1>
      </section>
      <section className='monCompte__mainSection'>
        <div className="row">
          <div className="col-md-3">

            <p>Email utilisateur: {user && user.email} </p>
            <button className="text-upercase" onClick={deconnecter}>Déconnecter</button>
          </div>
          <div className="col-md-9">

          </div>
        </div>
      </section>
      <MonCompteApp/>


    </>
  )
}

export default MonCompte