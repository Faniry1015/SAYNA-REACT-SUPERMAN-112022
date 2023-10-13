import { React } from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/Header.css";
import { UserAuth } from '../context/AuthContext';
import logoSupermanBlanc from '../assets/logos/logo_blanc.png'

function Header() {
    const { user } = UserAuth()
    return (
        <header className="header">
            <div className="header">
                <div className="header__divLogo">
                    <NavLink to="/"><img src={logoSupermanBlanc} alt="Logo Superman" className="header__logo"
                        title="HOME" />
                    </NavLink>
                </div>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink> </li>
                        <li><NavLink to="eshop">E-Shop</NavLink> </li>
                        <li><NavLink to="compte">Mon Compte</NavLink> </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header