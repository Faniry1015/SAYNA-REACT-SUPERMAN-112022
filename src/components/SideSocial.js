import React from 'react'
import '../styles/SideSocial.css'
import facebookImg from '../assets/icones/facebook.png';
import instagramImg from '../assets/icones/instagram.png';
import twitterImg from '../assets/icones/twitter.png';

function SideSocial() {
    
    return (
        <aside>
            <figure>
                <div>
                    <a href="https://www.facebook.com/frdccomics/?locale=fr_FR"><img src={facebookImg} alt="facebook DC" title="FB DC Comics" /></a>
                </div>
                <div>
                    <a href="https://www.instagram.com/dcofficial/?hl=fr"><img src={instagramImg} alt="instagram" title="Insta DC Comics" /></a>
                </div>
                <div>
                    <a href="https://twitter.com/DCComics"><img src={twitterImg} alt="twitter" title="Twitter DC Comics" /></a>
                </div>
            </figure>
        </aside>
    )
}

export default SideSocial