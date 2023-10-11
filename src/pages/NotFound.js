import React from 'react'

function NotFound() {
  return (
    <section>
        <div className="row">
            <div className="col-md-6 mt-5">
                <img src={''} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6 text-center mt-5">
                <h1>404 ERROR</h1>
                <h6>Cette page n'existe pas ou n'existe plus</h6>
                <button className='btnContain__btn'>Allez à notre page d'accueil</button>
                <button className='btnContain__btn'>Voir nos produits</button>
            </div>
        </div>
    </section>
  )
}

export default NotFound