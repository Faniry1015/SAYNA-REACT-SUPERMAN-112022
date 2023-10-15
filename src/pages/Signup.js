import { React, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../styles/signup.css"
import { UserAuth } from '../context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import logoGoogle from '../assets/logos/logo_8.png'
import logoFB from '../assets/logos/facebook.png'
import logoApple from '../assets/logos/logo_7.png'

function Signup() {
    const defaultState = {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        password2: "",
        checked: false,
        error: ""
    }

    const [state, setState] = useState(defaultState)

    const passwordConfirmRef = useRef()

    const navigate = useNavigate();

    const { createUser } = UserAuth()

    function handleChange(e) {
        if (e.target.type === "checkbox") {
            setState((state, props) => ({ ...state, checked: e.target.checked }))
        } else {
            setState((state, props) => ({ ...state, [e.target.id]: e.target.value }))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (password !== password2) {
            return setState((state, props) => ({ ...state, error: 'Les mots de passes ne sont pas identiques' }))
        }
        /*On peut également utilisé le useRef
         if (password !== passwordConfirmRef.current.value) {
             return setState((state, props) => ({ ...state, error: 'Les mots de passes ne sont pas identiques' }))
        }

        setState((state, props) => ({...state, error:""}));*/
        try {
            await createUser(email, password);
            await setDoc(doc(db, 'usersDetails', `id-${state.email}`), state);
            navigate('/compte');
        } catch (e) {
            setState((state, props) => ({ ...state, error: e.message }));
        }
    }

    const { nom, prenom, email, password, password2, checked, error } = state

    return (
        <>
            <section id='hero'>
                <div className="hero-signup-image">
                    <div className="container">
                        {/* <h1 className="herotitle text-uppercase text-white"></h1> */}
                        <section className="inscription">
                            <div className="container formulaire">
                                <div className="head text-center">
                                    <h2>Inscription</h2>
                                    <p>
                                        Vous avez déjà un compte ?
                                        <Link to="/login">connectez-vous ici!</Link>
                                    </p>
                                </div>
                                <div className="form-body">
                                    <form type="submit" onSubmit={handleSubmit}>
                                        <div className="signup-form-group mb-3">
                                            <label htmlFor="nom" className="form-label">Nom</label>
                                            <input type="text" className="form-control" id="nom" name='nom' placeholder="Nom" value={nom} onChange={handleChange} />
                                        </div>
                                        <div className="signup-form-group mb-3">
                                            <label htmlFor="prenom" className="form-label">Prénom</label>
                                            <input type="text" className="form-control" id="prenom" name='prenom' placeholder="Prénom" value={prenom} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Addresse mail</label>
                                            <input type="email" className="form-control" id="email" name='email' placeholder='email' value={email} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Mot de passe</label>
                                            <input type="password" className="form-control" id="password" placeholder='mot de passe' value={password} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="passwordConfirm" className="form-label">Confirmez votre mot de passe</label>
                                            <input type="password" ref={passwordConfirmRef} className="form-control" id="password2" placeholder='mot de passe' value={password2} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <div className='acceptanceContainer'>
                                                <div>
                                                    <label className="form-check-label mb-3" htmlFor="exampleCheck1">Je reconnais avoir pris connaissance et j'accepte les termes des <Link to="/">conditions générales d'utilisation.</Link></label>
                                                </div>
                                                <div className='switchContainer'>
                                                    <label htmlFor="" className="switch">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={checked} onChange={handleChange} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='btnContain mb-3'>
                                            <button type="submit" className="btnContain__form">valider</button>
                                        </div>
                                        <div className='social mb-3'>
                                            <div className='connectWith__container mb-3'>
                                                <div className='connectWith mb-2'>Connectez vous avec</div>
                                                <div className='line'></div>
                                            </div>

                                            <div className='socialLogo'>
                                                <Link to="/login"><img src={logoGoogle} alt="Google+" /></Link>
                                                <Link to="/login"><img src={logoFB} alt="Facebook" /></Link>
                                                <Link to="/login"><img src={logoApple} alt="Apple" /></Link>
                                            </div>
                                        </div>
                                    </form>
                                    <div className='errorMessage'>{error}</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Signup