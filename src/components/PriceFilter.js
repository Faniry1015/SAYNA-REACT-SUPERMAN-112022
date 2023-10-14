import React, { useState } from 'react';
import '../styles/PriceFilter.css'

function PriceFilter({ onMaxPriceChange }) {
    const [maxPrice, setMaxPrice] = useState(200);

    const handleMaxPriceChange = (e) => {
        const newMaxPrice = parseInt(e.target.value);
        setMaxPrice(newMaxPrice);
        // Appel de la fonction de rappel avec la nouvelle valeur du prix maximum
        onMaxPriceChange(newMaxPrice);
    };

    return (
        <div className="price-bar mt-2 mb-3">
            <h4>Prix</h4>
            <input
                type="range"
                min="0"
                max="200"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                step="1"
                className="range-input"
            />
            <div className="price-range">
                <div className="max-price">Max: {maxPrice} €</div>
            </div>
        </div>
    );
}

export default PriceFilter;