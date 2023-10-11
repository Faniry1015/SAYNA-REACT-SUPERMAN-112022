import React from 'react'
import ProductItem from './ProductItem'
import '../styles/Products.css'

function Products({ products, addToCart }) {
    return (
        <>
            <div className="productsContainer">
                {products.map(product => {
                    return <div key={product.id} className={`gridChild${product.id}`}>
                        <ProductItem product={product} addToCart={addToCart} />
                    </div>
                })}
            </div>
        </>
    )
}

export default Products