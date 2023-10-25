import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/Header.css";
import { UserAuth } from '../context/AuthContext';
import logoSupermanBlanc from '../assets/logos/logo_blanc.png'

function Header() {
    const { user } = UserAuth()

    const [isLargeScreen, setIsLargeScreen] = useState(true)
    const [burgerIsVisible, setBurgerIsVisible] = useState(false);
    const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

    const toggleMenu = () => {
        setDropdownIsVisible(!dropdownIsVisible);
    };

    // Utilisation d'un effet React pour détecter la largeur de l'écran
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setIsLargeScreen(true);
                setBurgerIsVisible(false)
                setDropdownIsVisible(false)
            } else {
                setIsLargeScreen(false)
                setBurgerIsVisible(true)
                setDropdownIsVisible(false)
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <header className="header">
            <div className="header">
                <div className="header__divLogo">
                    <NavLink to="/"><img src={logoSupermanBlanc} alt="Logo Superman" className="header__logo"
                        title="HOME" />
                    </NavLink>
                </div>
                <nav className='burger-menu'>
                    <button onClick={toggleMenu} className={`burger-button burgerBtnClose ${!isLargeScreen && burgerIsVisible && !dropdownIsVisible ? 'close-visible' : ''}`}>
                        ☰
                    </button>
                    <button onClick={toggleMenu} className={`burger-button burgerBtnOpen ${!isLargeScreen && burgerIsVisible && dropdownIsVisible ? 'open-visible' : ''}`}>
                    ✕
                    </button>
                    <ul className={`menu-list ${isLargeScreen ? 'inlineMenuList' : 'burgerMenuList'} ${dropdownIsVisible ? 'isDropDown' : 'hideDropDown'}`}>
                        <li><NavLink to="/">Home</NavLink> </li>
                        <li><NavLink to="eshop">E-Shop</NavLink> </li>
                        {user ? <li><NavLink to="compte">Mon compte</NavLink></li> : (
                            <div>
                                <NavLink to="login"><button className='ms-2 btnContain__btn navBarBtn'>Connection</button></NavLink>
                                <NavLink to="signup"><button className='ms-2 btnContain__btn navBarBtn'>Inscription</button></NavLink>
                            </div>
                        )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header