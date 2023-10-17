import React from 'react'
import '../styles/ProductItem.css'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import { db } from '../firebase-config'
import { updateDoc,doc } from 'firebase/firestore'

function ProductItem({ product, addToCart }) {
    const { user } = UserAuth()
    const navigate = useNavigate()

    const handleAddToCart = () => {
        if (user) {
            addToCart(product)
        } else {
            alert('Connectez vous ou créez un compte pour pouvoir passer commande')
        }
    }

    const handleProductClick = async () => {
        const washingtonRef = doc(db, 'currentProductPage', "currentProduct");
        await updateDoc(washingtonRef, product);
        navigate('/eshop/productDetail')
    }

    const { nom, imgUrl, prix } = product;
    return (
        <>
            <div className="product m-1 text-center">
                <div className="wrapper itemContainer" onClick={handleProductClick}>
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