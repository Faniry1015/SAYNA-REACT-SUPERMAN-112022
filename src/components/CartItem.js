import React, { useState, useRef } from 'react'
import { UserAuth } from '../context/AuthContext'
import '../styles/CartItem.css'


function CartItem({ cartProductItem, deleteItem, qttChange }) {
    const { user } = UserAuth()
    const [itemsState, setItemsState] = useState(cartProductItem)

    const deletedItem = useRef(null)

    const handleCartProduct = (e) => {
        if (user) {
            switch (e.target.id) {
                case 'delete': deleteItem(cartProductItem)
                    deletedItem.current.classList.remove('d-flex')
                    deletedItem.current.style.display = 'none'
                    break
                case 'increase': qttChange(cartProductItem, 'increase')
                    break
                case 'decrease': qttChange(cartProductItem, 'decrease')
                    break
                default: console.log('Erreur de gestion du panier')
                    break
            }

            setItemsState({ ...cartProductItem })
        }
    }

    const { nom, imgUrl, id, prixTotalArticles, quantité } = itemsState
    return (
        <>
            <div className="d-flex justify-content-between align-items-center border-product" ref={deletedItem}>
                <div className="product d-flex align-items-center">
                    <img className='cartitemImg' src={imgUrl} alt={nom} />
                    <div className="m-4">
                        <h5>{nom}</h5>
                        <span>Numéro du produit {id}</span>
                    </div>
                </div>
                <div className='price'>
                    <p>{prixTotalArticles.toFixed(2)}€</p>
                </div>
                <div className="qte text-center">
                    <div id='decrease' className='changeQtt' onClick={handleCartProduct}>
                        -
                    </div>
                    <div className="fs-5">{quantité}</div>
                    <div id='increase' className='changeQtt' onClick={handleCartProduct}>
                        +
                    </div>
                </div>
                <div className='deleteItem'>
                    <i name='delete' className="fa-solid fa-3x fa-xmark" id='delete' onClick={handleCartProduct}></i>
                </div>
            </div>
        </>
    )
}

export default CartItem