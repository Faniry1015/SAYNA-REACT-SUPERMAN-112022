import React from 'react'
import '../styles/MonCompteInfoPers.css'

function MonCompteInfoNewsletter({ newsletterStatus, onNewsletterChange }) {

    const handleNewsletterChange = (e) => {
        onNewsletterChange(e.target.value)
    };
    return (
        <>
            <section className='monCompte__newsletterContainer'>
                <h3>NewsLetter</h3>
                <hr />
                <p>Abonnez vous à la newsletter ! Ne ratez pas nos offres exceptionnels sur votre article préféré</p>
                <div>
                    <label>
                        <input type="radio" name="newsletter" value={true} checked={newsletterStatus} onChange={handleNewsletterChange} /> Oui
                    </label> <br />
                    <label>
                        <input type="radio" name="newsletter" value={false} checked={!newsletterStatus} onChange={handleNewsletterChange} /> Non
                    </label>
                </div>
            </section>
        </>
    )
}

export default MonCompteInfoNewsletter