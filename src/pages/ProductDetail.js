import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/ProductDetail.css'


function ProductDetail() {

    const [productData, setProductData] = useState({})


    const getCurrentProduct = async () => {
        try {
            const docRef = doc(db, "currentProductPage", "currentProduct");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProductData(docSnap.data())

            } else {
                // docSnap.data() will be undefined in this case
                console.log("Erreur de chargement des informations sur le produit!");
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCurrentProduct()
    }, [])

    const { nom, description, imgUrl, prix } = productData

    return (
        <>
            <section className="ProductDetailContainer">
                <div className='row'>
                    <div className="col-md-4 productImgContainer">
                        <img src={imgUrl} alt="Produit" className="productDetail__productImg" />
                    </div>
                    <div className="col-md-1">thumbnails</div>
                    <div className="col-md-7">
                        <div className='stars'>
                            <i className="fa-regular fa-star" />
                            <i className="fa-regular fa-star" />
                            <i className="fa-regular fa-star" />
                            <i className="fa-regular fa-star" />
                            <i className="fa-regular fa-star" />
                        </div>
                        <div className="productName my-5">
                            <h2>{nom}</h2>
                        </div>
                        <hr />
                        <div className="priceAndStock d-flex justify-content-between my-5">
                            <h3>{prix}€</h3>
                            <div className="stockSelect">
                                <div className='d-inline-block mx-3'>en stock</div>
                                <select name="size" id="size" className="">
                                    <option value="m">Taille M</option>
                                    <option value="s">Taille S</option>
                                </select>
                            </div>
                        </div>
                        <div className="btnContainer my-5">
                            <button>Ajouter au panier</button><button>heart</button>
                        </div>

                        <hr />
                        <div className="productDescription">
                            {description}
                        </div>
                    </div>

                </div>
            </section>
        </>

    )
}

export default ProductDetail