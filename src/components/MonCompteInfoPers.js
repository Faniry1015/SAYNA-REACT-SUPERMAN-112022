import React from 'react'

function MonCompteInfoPers({ title, selected }) {
    return (
        <section className='monCompte__infoPersContainer' hidden={!selected}>
            <h3>{title}</h3>
            <hr />
            <div>
                <ul>
                    <li>Nom: </li>
                    <li>prénom: </li>
                    <li>Mot de passe: </li>
                    <li>Email: </li>
                    <li>Numéro de téléphone: </li>
                    <li>Addresse de livraison: </li>
                    <li>Adresse de facturation: </li>
                </ul>
                <button>Modifier</button>
            </div>
        </section>
    )
}

export default MonCompteInfoPers