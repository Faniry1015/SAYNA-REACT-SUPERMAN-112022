import React, { useRef, useState } from 'react';
import '../styles/ContactForm.css'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase-config';

export const ContactForm = () => {
    const defaultState = {
        showPopup: false,
        newsletter: false,
        newsletterFrequency: "choisir",
        email: '',
        message: '',
        invalidMail: '',
        warningMessage: '',
    }
    const [state, setState] = useState(defaultState)

    const contactFormRef = useRef(null)

    const {showPopup, email, message, invalidMail, warningMessage, newsletter, newsletterFrequency} = state

    const handleChange = (e) => {
        e.target.name === 'message' ? setState({...state, message: e.target.value}) : setState({...state, email: e.target.value})
    }

    const handleNewsLetter = (e) => {
        e.target.name === 'newsletter' ? setState({...state, newsletter: !newsletter}) : setState({...state, newsletterFrequency: e.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === '') {
            setState({...state, invalidMail: 'Champ obligatoire: Entrez votre adresse email !'});
            return;
        } else if (message === '') {
            setState({...state, warningMessage: 'Champ obligatoire: Entrez votre adresse email !'});;
            return;
        }

        setState({...state, showPopup: true});
        const date = Date.now()
        await setDoc(doc(db, "User_Message", JSON.stringify(date)), state);
    };

    const handlePopupClose = () => {
        setState({...defaultState})
        contactFormRef.current.reset()
    };

    return (
        <div>
            <section className="reveal">
                <div className="sec7">
                    <h2 className="sec7__title">PRENONS CONTACT</h2>
                    <form className="sec7__form mb-5" onSubmit={handleSubmit} ref={contactFormRef}>
                        <div className="sec7__form__div">
                            <h4 className="sec7__form__div__h4">ADRESSE EMAIL</h4>
                            <input
                                className="sec7__form__div__input"
                                type="email"
                                name="addresse-mail"
                                id="userMail"
                                placeholder="Addresse email"
                                value={email}
                                onChange={handleChange}
                            />
                            <span className="invalidMail">{invalidMail}</span>
                        </div>

                        <div className="sec7__form__div">
                            <h4 className="sec7__form__div__h4">NEWSLETTER</h4>
                            <div className="sec7__form__div__checkbox">
                                <label htmlFor="newsletter">
                                    En cochant cette case vous acceptez de recevoir l'actualité concernant les aventures de Batman:
                                </label>
                                <input type="checkbox" required name="newsletter" id="newsletter" checked={newsletter} onChange={handleNewsLetter}/>
                            </div>

                            <div className="sec7__form__div__selectContainer">
                                <select className="sec7__form__div__selectContainer__select" name="newsLetterFrequency" id="frequence" value={newsletterFrequency} onChange={handleNewsLetter}>
                                    <option className="sec7__form__div__selectContainer__select__option" value="choisir" defaultValue>
                                        Choisissez la fréquence à laquelle vous souhaitez recevoir votre newsletter
                                    </option>
                                    <option className="sec7__form__div__selectContainer__select__option" value="par semaine">
                                        Une fois par semaine
                                    </option>
                                    <option className="sec7__form__div__selectContainer__select__option" value="toutes les deux semaines">
                                        Une fois toutes les deux semaines
                                    </option>
                                    <option className="sec7__form__div__selectContainer__select__option" value="par mois">
                                        Une fois par mois
                                    </option>
                                    <option className="sec7__form__div__selectContainer__select__option" value="tous les trois mois">
                                        Une fois tous les trois mois
                                    </option>
                                    <option className="sec7__form__div__selectContainer__select__option" value="tous les six mois">
                                        Une fois tous les six mois
                                    </option>
                                </select>
                            </div>

                            <div className="sec7__form__div">
                                <fieldset className="sec7__form__div__fieldset">
                                    <legend className="sec7__form__div__fieldset__legend">Souhaitez vous recevoir des news</legend>
                                    <div className="sec7__form__div__fieldset__radioContain">
                                        <input
                                            className="sec7__form__div__fieldset__radioContain__choice"
                                            type="radio"
                                            name="natureSend"
                                            id="films"
                                        />
                                        <label htmlFor="films">Des films</label>
                                        <input
                                            className="sec7__form__div__fieldset__radioContain__choice"
                                            type="radio"
                                            name="natureSend"
                                            id="comics"
                                        />
                                        <label htmlFor="comics">Des comics</label>
                                        <input
                                            className="sec7__form__div__fieldset__radioContain__choice"
                                            type="radio"
                                            name="natureSend"
                                            id="tout"
                                        />
                                        <label htmlFor="tout">De tout</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                        <div className="sec7__form__div">
                            <h4 className="sec7__form__div__h4">MESSAGE</h4>
                            <textarea
                                className="sec7__form__div__textarea"
                                name="message"
                                id="message"
                                cols="30"
                                rows="1"
                                placeholder="Laissez un commentaire pour la communauté"
                                value={message}
                                onChange={handleChange}
                            ></textarea>
                            <span className="warningMessage">{warningMessage}</span>
                        </div>

                        <div className="sec7__form__submit">
                            <button type="submit" className="btnContain__btn submitmessageBtn">
                                CONFIRMER
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* PopupBox Message reçu */}
            {showPopup && (
                <div className="popupBox" onClick={handlePopupClose}>
                    <div className="inside">
                        <h1>Message reçu!</h1>
                    </div>
                </div>
            )}
        </div>
    );
};
