import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/MonCompteTabs.css'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export function Tabs({ children }) {
    //Add user Info
    const childrenArray = (React.Children.toArray(children))

    const [current, setCurrent] = React.useState(childrenArray[0].key);

    const newChildren = childrenArray.map((child) => {
        return React.cloneElement(child, { selected: child.key === current });
    });

    const handleTabChange = (tab) => {
        
    }

    //Logoff
    const navigate = useNavigate()
    const {logout} = UserAuth()

    const logOff = async () => {
      try {
        await logout()
        navigate('/login')
      } catch (e) {
        console.log(e)
      }
    }

    return (
        <>
            <section className='monCompte__mainSection'>
                <div className="row">
                    <div className="col-md-3">
                        <nav className='monCompte__nav'>
                            <ul>
                                {newChildren.map((child) => {
                                    return <li key={child.key}>
                                        <Link  onClick={() => setCurrent(child.key)} >{child.props.title}</Link>
                                    </li>
                                })}
                            </ul>
                            <button className="logoff" onClick={logOff}>Déconnecter</button>
                        </nav>
                    </div>
                    <div className="col-md-9">
                        <section>{newChildren}</section>
                    </div>
                </div>
            </section>

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
