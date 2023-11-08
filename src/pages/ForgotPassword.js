import { React, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../styles/signup.css"
import { UserAuth } from '../context/AuthContext'
export { ForgotPassword }

function ForgotPassword() {

    const navigate = useNavigate()

    const { resetPassword } = UserAuth()

    const [email, setEmail] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await resetPassword(email) 
        .then(function () {
            console.log(`Récupération d'email envoyé à ${email}`)
            navigate('/login')
            alert(`Votre mail de récupération à bien été envoyé à ${email}`)
        })
        .catch(function(e){
            console.log("Erreur de récupération du compte", e)
        } )
    }

    return (
        <>
            <section id='hero'>
                <div className="hero-signup-image">
                    <div className="container">
                        <section className="inscription">
                            <div className="container formulaire">
                                <div className="head text-center">
                                    <h2>Récupérez votre compte</h2>
                                </div>
                                <div className="form-body">
                                    <form type="submit" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Addresse mail</label>
                                            <input type="email" className="form-control" id="email" name='email' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                        <div className='btnContain mb-3'>
                                            <button type="submit" className="btnContain__form">Submit</button>
                                        </div>
                                    </form>
                                    <div>
                                        <Link to="/login">Connectez-vous ici!</Link>
                                    </div>
                                    <div>
                                        <Link to="/signup">Créez un compte!</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>

    )
}