import React, { useState } from 'react'

function Checkboxfilter({ dataFilterArray, children, onCheckChange }) {
    const defaultCheck = dataFilterArray.map(categorie => ({ nom: categorie.nom, checked: false }))
    const [check, setCheck] = useState(defaultCheck)

    const handleChange = (e) => {
        const currentFilter = [...check]
        const updateFilter = currentFilter.map((categorie) => {
            if (categorie.nom === e.target.value) {
                return { ...categorie, checked: e.target.checked }
            }
            return categorie
        })
        setCheck([...updateFilter])
        //Envoi de l'état vers le composant parent (Eshop)
        onCheckChange([...updateFilter])

    }

    return (
        <div className="mb-3">
                {/* {JSON.stringify(check)} */}
            <h4>{children}</h4>
            <div className="checkboxContainer">
                {dataFilterArray.map((catégorie) => {
                    return <div key={catégorie.nom} className='form-check'>
                        <input type="checkbox" value={catégorie.nom} checked={check.checked} onChange={handleChange} name={catégorie.nom} id={catégorie.nom} className="form-check-input" />
                        <label htmlFor={catégorie.nom} className="form-check-label">{catégorie.label}</label>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Checkboxfilter