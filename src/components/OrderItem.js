import React, { useState } from 'react'
import '../styles/OrderItem.css'


function OrderItem({ orderProductItem }) {
    const [itemsState] = useState(orderProductItem)
    const { nom, imgUrl, prixTotalArticles, quantité, categorie } = itemsState
    return (
        <>
            <div className="w-100 orderProductItemContainer my-2">
                <div className="productItemOrder d-flex align-items-center">
                    <img className='orderitemImg' src={imgUrl} alt={nom} />
                    <div className="m-4">
                        <h6>{categorie}</h6>
                        <h5>{nom} {quantité >1 && <span className="fs-5">x {quantité}</span> }</h5> 
                        <h4>{prixTotalArticles.toFixed(2)}€</h4>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OrderItem