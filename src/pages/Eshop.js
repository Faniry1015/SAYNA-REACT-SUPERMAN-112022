import { React, useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import HeroShop from "../components/HeroShop";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import Products from "../components/Products";
import { UserAuth } from "../context/AuthContext";
import '../styles/Eshop.css'
import PriceFilter from "../components/PriceFilter";
import Checkboxfilter from "../components/Checkboxfilter";
import toBottomArrow from '../assets/icones/flèche_down_header.png'
import FadeIn from "../components/FadeIn";

function Eshop() {
   const { user } = UserAuth()
   const categorieArray = [
      {
         nom: 'goodies',
         label: 'Goodies',
      },
      {
         nom: 'vetement',
         label: 'Vêtement',
      },
      {
         nom: 'multimedia',
         label: 'Multimédia',
      },
      {
         nom: 'equipement',
         label: 'Equipement',
      },
      {
         nom: 'poster',
         label: 'Poster',
      },
   ]

   const universArray = [
      {
         nom: 'batman',
         label: 'Batman',
      },
      {
         nom: 'Superman',
         label: 'Superman',
      },
      {
         nom: 'batmanSuperman',
         label: 'Batman vs Superman',
      },
      {
         nom: 'justiceLeague',
         label: 'Justice League',
      },
      {
         nom: 'poster',
         label: 'Poster',
      },
   ]

   const [products, setProducts] = useState([])
   const [visibleProducts, setVisibleProducts] = useState([])
   const [search, setSearch] = useState('')

   const [maxPrice, setMaxPrice] = useState(null)

   const [filteredData, setFilteredData] = useState({ prixMax: maxPrice, categories: [], univers: [] })

   const getProducts = async () => {
      const productsArray = []
      try {
         const querySnapshot = await getDocs(collection(db, "produits"));
         querySnapshot.forEach((doc) => {
            productsArray.push({ id: doc.id, ...doc.data() })
         });
         setProducts(productsArray)
         setVisibleProducts(productsArray)
      } catch (e) {
         console.log(e)
         alert('Erreur de chargement des articles, vérifiez votre connexion internet et actualisez la page')
      }
   }

   useEffect( () => {
      (async () => {
         await getProducts()
      })()
   }, [])


   //Ajouter un produit au panier
   let product_cart = {};

   const addToCart = async (product) => {
      product_cart = product
      product_cart['quantité'] = 1
      product_cart['prixTotalArticles'] = product_cart.quantité * product_cart.prix

      try {
         //Pour éviter qu'un produit puisse être ajouter plusieurs fois dans le panier via eshop
         await setDoc(doc(db, `Cart-${user.uid}`, product.nom), product_cart);
      } catch (e) {
         console.log(e.message)
      }
   }

   //Gestion de la recherche
   function handleSearch(e) {
      const searchCaracter = e.target.value.trim().toLowerCase()
      if (searchCaracter !== "") {
         setSearch(e.target.value)
         setVisibleProducts(products.filter(product => {
            return product.nom.toLowerCase().includes(searchCaracter) || product.categorie.toLowerCase().includes(searchCaracter) || product.description.toLowerCase().includes(searchCaracter)
         }))
      } else {
         setSearch('')
         setVisibleProducts(products)
      }
   }

   const handlefilterChange = (filter) => {
      if (!isNaN(filter)) {
         handleMaxPriceChange(filter);
      } else if (filter[0].nom === 'goodies') {
         handleCategorieChange(filter);
      } else if (filter[0].nom === 'batman') {
         handleUniversChange(filter)
      } else {
         throw Error("Erreur de filtre");
      }
   };

   const handleMaxPriceChange = (newMaxPrice) => {
      setMaxPrice(newMaxPrice);
      updateVisibleProducts({ prixMax: newMaxPrice, categories: filteredData.categories, univers: filteredData.univers });
   };

   const handleCategorieChange = (checkStatusArray) => {
      const selectedCategories = checkStatusArray.filter(category => category.checked).map(category => category.nom);
      const updatedFilter = { prixMax: filteredData.prixMax, categories: selectedCategories, univers: filteredData.univers };
      updateVisibleProducts(updatedFilter);
   };

   const handleUniversChange = (checkStatusArray) => {
      const selectedUnivers = checkStatusArray.filter(univers => univers.checked).map(univers => univers.nom);
      const updatedFilter = { prixMax: filteredData.prixMax, categories: filteredData.categories, univers: selectedUnivers };
      updateVisibleProducts(updatedFilter);
   };

   const updateVisibleProducts = (filter) => {
      const filteredProducts = products.filter(product => {
         const isPriceFiltered = filter.prixMax !== null ? product.prix <= filter.prixMax : true;
         const isCategoryFiltered = filter.categories.length === 0 || filter.categories.includes(product.categorie);
         const isUniversFiltered = filter.univers.length === 0 || filter.univers.includes(product.univers);
         return isPriceFiltered && isCategoryFiltered && isUniversFiltered;
      });

      // Mettre à jour les produits visibles avec les produits filtrés
      setVisibleProducts(filteredProducts);

      // Mettre à jour les données filtrées
      setFilteredData(filter);
   };

   return (
      <>
         <FadeIn>
            <HeroShop />
         </FadeIn>
         <FadeIn>
            <div className="toBottomArrow">
               <img src={toBottomArrow} alt="Bottom Arrow" />
            </div>
         </FadeIn>

            <div className="cartContainer pt-5">
               <div className="cartContainer2 float-end mb-5">
                  <Link to='/eshop/cart'>
                     <i className="fa-solid fa-4x fa-fade fa-cart-shopping"></i>
                  </Link>
               </div>
            </div>

         <FadeIn>
            <section className="productsMainContainer mt-5">
               <div className="row">
                  <div className="col-md-3 filtersContainer">
                     <div className="mb-5">
                        <h3>Rechercher</h3>
                        <input type="text" className="form-control" placeholder="Rechercher..." id="search" name="search" value={search} onChange={handleSearch} />
                     </div>
                     <h3>Filtres</h3>
                     <PriceFilter onMaxPriceChange={handlefilterChange} />
                     <Checkboxfilter dataFilterArray={categorieArray} onCheckChange={handlefilterChange}>Catégorie</Checkboxfilter>
                     <Checkboxfilter id='univers' dataFilterArray={universArray} onCheckChange={handlefilterChange}>Univers</Checkboxfilter>
                  </div>
                  <div className="col-md-9">
                     <section id="products">
                        {
                           products.length >= 1 && (
                              <div className="product-box">
                                 <Products products={visibleProducts} category={''} addToCart={addToCart} />
                              </div>
                           )
                        }
                        {
                           products.length < 1 && (
                              <div className="productLoader">
                                 <h6><i className="fa-solid fa-spinner fa-spin-pulse fa-10x" style={{ color: "#B11313cc", }}></i></h6>
                              </div>
                           )
                        }
                     </section>
                  </div>
               </div>
            </section>
         </FadeIn>



      </>
   );
}

export default Eshop;
