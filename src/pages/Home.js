import React from 'react';
import SideSocial from '../components/SideSocial';

function Home() {
    //Scroll to Hero/enemies
    const scrollToAnchor = (anchorId) => {
        const anchorElement = document.getElementById(anchorId);

        if (anchorElement) {
            anchorElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }

    return (
        <main>
            {/* Icônes latéraux de réseaux sociaux */}
            <SideSocial />

            {/* Section 1 Il est Batman */}
            <section className="reveal">
            
            </section>
        </main>
    );
}

export default Home;

