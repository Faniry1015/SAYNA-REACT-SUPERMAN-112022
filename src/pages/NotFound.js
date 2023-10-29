import React from 'react'
import image404 from '../assets/images/404Error.jpg'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section>
      <div className="d-flex justify-content-center align-items-center mb-4 ">
        <Link to="/"><button className='btnContain__btn'>Aller à la page d'accueil</button></Link>
        <Link to="/eshop"><button className='btnContain__btn'>Voir nos produits</button></Link>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="">
          <img src={image404} alt="" className="img-fluid " />
        </div>
      </div>
    </section>
  )
}

export default NotFound