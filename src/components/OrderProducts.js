import React from 'react'
import OrderItem from './OrderItem'

function OrderProducts({ cartProducts, deleteItem, qttChange }) {
    return cartProducts.map((cartProductItem) => (
        <OrderItem key={cartProducts.indexOf(cartProductItem)} cartProductItem={cartProductItem} deleteItem={deleteItem} qttChange={qttChange}/>
    ))
}

export default OrderProducts