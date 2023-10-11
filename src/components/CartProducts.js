import React from 'react'
import CartItem from './CartItem'

function CartProducts({ cartProducts, deleteItem, qttChange }) {
    return cartProducts.map((cartProductItem) => (
        <CartItem key={cartProducts.indexOf(cartProductItem)} cartProductItem={cartProductItem} deleteItem={deleteItem} qttChange={qttChange}/>
    ))
}

export default CartProducts