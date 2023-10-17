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

    return (
        <>
            <section className='monCompte__mainSection'>
                <div className="row">
                    <div className="col-md-4">
                        <nav className='monCompte__nav'>
                            <ul>
                                {newChildren.map((child) => {
                                    return <li key={child.key}>
                                        <Link onClick={() => setCurrent(child.key)} className={child.selected}>{child.props.title}</Link>
                                    </li>
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
                <i class="fa-solid fa-3x fa-xmark"></i>
                </span>
                <div className="popup-content">
                    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                    <button onClick={handleConfirm}>Confirmer</button>
                </div>
            </div>
            )}
        </>

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
