import  React, {useState, useEffect}  from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/Header.css";
import { UserAuth } from '../context/AuthContext';
import logoSupermanBlanc from '../assets/logos/logo_blanc.png'

function Header() {
    const { user } = UserAuth()

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Utilisation d'un effet React pour détecter la largeur de l'écran
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 800) {
                console.log(window.innerWidth)
                setIsOpen(false); // Ferme le menu si la largeur est supérieure à 800 pixels
            } else {
                setIsOpen(true)
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
                <nav className={`burger-menu ${isOpen ? 'open' : ''}`}>
                    <button onClick={toggleMenu} className="burger-button">
                        ☰
                    </button>
                    <ul className="menu-list">
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