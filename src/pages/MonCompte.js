import React from 'react'
import { UserAuth } from '../context/AuthContext'
import "../styles/MonCompte.css"
import MonCompteApp from '../components/MonCompteApp'
import FadeIn from '../components/FadeIn'

function MonCompte() {
  const { logout } = UserAuth()


  return (
    <>
      <FadeIn>
        <section className='monCompte__header'>
          <h1>Seriez vous kryptonien ? <br />
            Dites nous en plus</h1>
        </section>
      </FadeIn>

      <FadeIn>
        <MonCompteApp />
      </FadeIn>

    </>
  )
}

export default MonCompte