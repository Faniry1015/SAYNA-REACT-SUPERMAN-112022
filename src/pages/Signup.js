import { React, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../styles/signup.css"
import { UserAuth } from '../context/AuthContext'

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
            setState((state, props) => ({  checked: e.target.checked, ...state }))
        } else {
            setState((state, props) => ({ [e.target.id]: e.target.value, ...state }))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if ( password !== password2) {
            return setState((state, props) => ({ ...state, error: 'Les mots de passes ne sont pas identiques' }))
        }
        //On peut également utilisé le useRef
        if (password !== passwordConfirmRef.current.value) {
            return setState((state, props) => ({ ...state, error: 'Les mots de passes ne sont pas identiques' }))
        }

        // setState((state, props) => ({...state, error:""}));
        try {
            await createUser(email, password);
            navigate('/compte');
        } catch (e) {
            setState((state, props) => ({...state, error: e.message}));
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
                                        <div className="mb-3 form-check">
                                            <label className="form-check-label" htmlFor="exampleCheck1">Je reconnais avoir pris connaissance et j'accepte les termes des <Link to="/">conditions générales d'utilisation.</Link></label>
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={checked} onChange={handleChange} />
                                        </div>
                                        <div className='btnContain'>
                                            <button type="submit" className="btnContain__form">Submit</button>
                                        </div>
                                        <div className='social'>
                                            <div>Connectez vous avec</div>
                                            <div>
                                                <Link to=""><img src={""} alt="" /></Link>
                                                <Link to=""><img src={""} alt="" /></Link>
                                                <Link to=""><img src={""} alt="" /></Link>
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