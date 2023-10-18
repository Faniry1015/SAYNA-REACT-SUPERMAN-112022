import React from 'react'
import OrderItem from './OrderItem'

function OrderProducts({ orderProducts, deleteItem, qttChange }) {
    return orderProducts.map((orderProductItem) => (
        <OrderItem key={orderProducts.indexOf(orderProductItem)} orderProductItem={orderProductItem} deleteItem={deleteItem} qttChange={qttChange}/>
    ))
}

export default OrderProducts