import {React, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import "../styles/signup.css"

function Login() {
  const defaultState = {
    email: "",
    password: "",
    error: ""
}

const [state, setState] = useState(defaultState)

const navigate = useNavigate();

const { login } = UserAuth()

function handleChange(e) {
        setState((state, props) => ({ ...state, [e.target.id]: e.target.value }))
}

async function handleSubmit(e) {
    e.preventDefault()
    try {
        await login(email, password);
        navigate('/compte');
    } catch (e) {
        setState((state, props) => ({...state, error: e.message}));
    }
}

const { email, password, error } = state

  return (
    <>
    <section id='hero'>
        <div className="hero-signup-image">
            <div className="container">
                <h1 className="herotitle text-uppercase text-white"></h1>
                <section className="inscription">
                    <div className="container formulaire">
                        <div className="head text-center">
                            <h2>Connexion</h2>
                            <p>
                                Vous n'avez pas encore de compte compte ?
                                <Link to="/signup"> Créer un compte ici!</Link>
                            </p>
                        </div>
                        <div className="form-body">
                            <form type="submit" onSubmit={handleSubmit}> 
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Adresse mail</label>
                                    <input type="email" className="form-control" id="email" name='email' placeholder='email' value={email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input type="password" className="form-control" id="password" placeholder='mot de passe' value={password} onChange={handleChange} />
                                </div>
                                <div>
                                  <Link to='/forgotPassword'>
                                    Mot de passe oublié ?
                                  </Link>
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
                            <div>{error}</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</>
  )
}

export default Login