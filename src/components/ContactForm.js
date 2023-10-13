import React, { useState } from 'react';
import '../styles/ContactForm.css'

export const ContactForm = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [invalidMail, setInvalidMail] = useState('');
    const [warningMessage, setWarningMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email === '') {
            setInvalidMail('Champ obligatoire: Entrez votre adresse email !');
            return;
        } else if (message === '') {
            setWarningMessage('Champ obligatoire: Entrez votre message !');
            return;
        }

        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setInvalidMail('');
        setWarningMessage('');
    };

    return (
        <div>
            <section className="reveal">
                <div className="sec7">
                    <h2 className="sec7__title">PRENONS CONTACT</h2>
                    <form className="sec7__form mb-5" onSubmit={handleSubmit}>
                        <div className="sec7__form__div">
                            <h4 className="sec7__form__div__h4">ADRESSE EMAIL</h4>
                            <input
                                className="sec7__form__div__input"
                                type="email"
                                name="addresse-mail"
                                id="userMail"
                                placeholder="Addresse email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="invalidMail">{invalidMail}</span>
                        </div>

                        <div className="sec7__form__div">
                            <h4 className="sec7__form__div__h4">NEWSLETTER</h4>
                            <div className="sec7__form__div__checkbox">
                                <label htmlFor="newsletter">
                                    En cochant cette case vous acceptez de recevoir l'actualité concernant les aventures de Batman:
                                </label>
                                <input type="checkbox" required name="newsletter" id="newsletter" />
                            </div>

                            <div className="sec7__form__div__selectContainer">
                                <select className="sec7__form__div__selectContainer__select" name="frequence" id="frequence">
                                    <option className="sec7__form__div__selectContainer__select__option" value="null" defaultValue>
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
                                onChange={(e) => setMessage(e.target.value)}
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
