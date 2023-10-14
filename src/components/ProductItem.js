import React from 'react'
import '../styles/ProductItem.css'
import { UserAuth } from '../context/AuthContext'

function ProductItem({ product, addToCart }) {
    const { user } = UserAuth()

    const handleAddToCart = () => {
        if (user) {
            addToCart(product)
        } else {
            alert('Connectez vous ou créez un compte pour pouvoir passer commande')
        }
    }

    const { nom, imgUrl, description, categorie, prix } = product;
    return (
        <>
            <div className="product m-1 text-center">
                <div className="wrapper">
                    <div className="product-img">
                        <img src={imgUrl} alt={nom} />
                    </div>
                    <div className='priceNameContainer'>
                        <div className="title text-uppercase fs-6">{nom}</div>
                        <div className="product-price">
                            <span className='deletedPrice'><del>{prix + (prix / 10)}€</del> </span><span className='fw-bold m-1'> {prix} €</span>
                        </div>

                    </div>
                </div>
                <div className='addBtnContainer'>
                    <button className='add-to-cart mt-3 w-100 ' onClick={handleAddToCart}>Ajouter au panier</button>
                </div>
            </div>
        </>
    )
}

export default ProductItem