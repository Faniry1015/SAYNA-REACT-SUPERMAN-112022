import React from 'react'
import { useInView } from 'react-intersection-observer'

function FadeIn({ children }) {
    const [ref, inView] = useInView(
        {
            threshold: 0.1,
            triggerOnce: true,
        });
    return (
        <div ref={ref} className={`fadeIn ${inView ? 'visible' : ''}`}>
            {children}
        </div>
    )
}

export default FadeIn