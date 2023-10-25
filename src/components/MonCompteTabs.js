import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/MonCompteTabs.css'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export function Tabs({ children }) {
    //Add user Info
    const childrenArray = (React.Children.toArray(children))

    const [current, setCurrent] = React.useState(childrenArray[0].key);
    const [isOpen, setIsOpen] = useState(false);

    const newChildren = childrenArray.map((child) => {
        return React.cloneElement(child, { selected: child.key === current });
    });

    //Logoff
    const navigate = useNavigate()
    const { logout } = UserAuth()

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleConfirm = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (e) {
            console.log(e)
        }
        togglePopup();
    };

    const handleTabStatus = (e) => {
        const liLink = e.target.parentNode
        const liArray = Array.from(liLink.parentNode.children)
        liArray.map((el) => {
            el.classList.remove("active")
        })
        liLink.classList.add("active")
    }

    return (
        <div className='mb-5'>
            <section className='monCompte__mainSection'>
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <nav className='monCompte__nav'>
                            <ul>
                                {newChildren.map((child) => {
                                    return (
                                        <li key={child.key}>
                                            <Link
                                                onClick={(e) => {
                                                    handleTabStatus(e)
                                                    setCurrent(child.key)
                                                }
                                                }
                                                className={child.selected}
                                            >
                                                {child.props.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button className="logoff" onClick={togglePopup}>Déconnexion</button>
                        </nav>
                    </div>
                    <div className="col-md-8">
                        <section>{newChildren}</section>
                    </div>
                </div>
            </section>
            {isOpen && (<div className='monCompte__popupBoxContainer'>
                <span className="close-button" onClick={togglePopup}>
                    <i className="fa-solid fa-3x fa-xmark"></i>
                </span>
                <div className="popup-content d-flex justify-content-center align-items-center flex-column">
                    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                    <button onClick={handleConfirm}>Confirmer</button>
                </div>
            </div>
            )}
        </div>

    )
}



export function Tab({ title, children, selected }) {
    return (
        <div hidden={!selected}>
            <h3>{title}</h3>
            <div>{children}</div>
        </div>
    )
}
