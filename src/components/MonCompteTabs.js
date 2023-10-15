import React from 'react'
import { Link } from 'react-router-dom';

export function Tabs({ children }) {
    const childrenArray = (React.Children.toArray(children))

    const [current, setCurrent] = React.useState(childrenArray[0].key);

    const newChildren = childrenArray.map((child) => {
        return React.cloneElement(child, { selected: child.key === current });
    });

    return (
        <>
            <nav>
                {newChildren.map((child) => {
                    return <Link key={child.key} onClick={() => setCurrent(child.key)} >{child.props.title}</Link>
                })}
            </nav>
            <section>{newChildren}</section>
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
