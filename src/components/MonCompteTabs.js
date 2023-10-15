import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/MonCompteTabs.css'

export function Tabs({ children }) {
    const childrenArray = (React.Children.toArray(children))

    const [current, setCurrent] = React.useState(childrenArray[0].key);

    const newChildren = childrenArray.map((child) => {
        return React.cloneElement(child, { selected: child.key === current });
    });

    return (
        <>
            <section className='monCompte__mainSection'>
                <div className="row">
                    <div className="col-md-3">
                        <nav className='monCompte__nav'>
                            <ul>
                                {newChildren.map((child) => {
                                    return <li>
                                        <Link key={child.key} onClick={() => setCurrent(child.key)} >{child.props.title}</Link>
                                    </li>
                                })}
                            </ul>

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
