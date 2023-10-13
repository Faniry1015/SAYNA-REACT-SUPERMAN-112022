import React from 'react'
import "../styles/Footer.css"
import wbIcon from "../assets/logos/icon_WB.png"
import saynaLogo from "../assets/logos/logo_sayna_white.png"
import xIcon from "../assets/logos/icon_x.png"
import dcLogo from "../assets/logos/icon_DC.png"
import fbIcon from "../assets/logos/icon_facebook.png"
import igIcon from "../assets/logos/icon_ig.png"
import twIcon from "../assets/logos/icon_tw.png"

function Footer() {
        return (
                <footer id="footer" className="footer reveal">
                        <p>
                                <img src={wbIcon} alt="Warner-Bros" />
                                Ce projet respecte l’univers cinématographique des films Superman.
                        </p>

                        <figure>
                                <a href="https://sayna.io/"><img src={saynaLogo} alt="Logo Sayna"
                                        title="SAYNA Website" /></a>
                                <a href="https://sayna.io/"><img src={xIcon} alt="Logo X" title="SAYNA Website" /></a>
                                <a href="https://www.dc.com/"><img src={dcLogo} alt="Logo Disney Comics"
                                        title="DC Comics Website" /></a>
                                <a href="https://web.facebook.com/search/top/?q=sayna"><img src={fbIcon}
                                        alt="Logo facebook" title="FB SAYNA" /></a>
                                <a href="https://www.instagram.com/hellosayna/?hl=fr"><img src={igIcon}
                                        alt="Logo instagram" title="Insta SAYNA" /></a>
                                <a href="https://twitter.com/madagascarsayna?lang=fr"><img src={twIcon} alt="Logo twitter"
                                        title="Twitter SAYNA" /></a>
                        </figure>
                </footer>
        )
}

export default Footer