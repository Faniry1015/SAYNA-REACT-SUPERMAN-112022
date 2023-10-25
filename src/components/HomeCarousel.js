import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import posterSupermanOfSteel from '../assets/images/img12.png'
import posterSuperman1978 from '../assets/images/img13.png'
import BatmanVSSuperman from '../assets/images/img14.png'
import '../styles/HomeCarousel.css'
import leftBtn from '../assets/icones/Polygon-1.png'
import rightBtn from '../assets/icones/Polygon.png'

function HomeCarousel() {
    const customArrowPrev = (onClickHandler, hasPrev, label) => (
        <button onClick={onClickHandler} disabled={!hasPrev} aria-label={label} className="custom-prev control-arrow control-prev">
            <img src={leftBtn} alt="Flèche gauche" />
        </button>
    );

    const customArrowNext = (onClickHandler, hasNext, label) => (
        <button onClick={onClickHandler} disabled={!hasNext} aria-label={label} className="custom-next control-arrow control-next">
            <img src={rightBtn} alt="Flèche droite" />
        </button>
    );
    return (
        <div className='mb-5'>
            <Carousel autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                renderArrowPrev={customArrowPrev}
                renderArrowNext={customArrowNext}
            >
                <div className='sec5__carrousContain__mainSup d-flex justify-content-center'>
                    <div className="sec5__carrousContain__main">
                        <div className="sec5__carrousContain__main__imgContainer">
                            <img src={posterSupermanOfSteel} alt="Superman Man of Steel" />
                        </div>
                        <div className="sec5__carrousContain__main__mediaDescription">

                            <div className="sec5__carrousContain__main__mediaDescription__component">ACTION, ADVENTURE</div>
                            <h3 className="sec5__carrousContain__main__mediaDescription__component">Superman Man of Steel</h3>
                            <div className="sec5__carrousContain__main__mediaDescription__component">IMDB :<span>7.1</span></div>
                            <p className="sec5__carrousContain__main__mediaDescription__component">
                                Le jeune Bruce Wayne assiste impuissant au meurtre de ses parents. Profondément traumatisé, il grandit obnubilé par un désir de vengeance. La Ligue des ombres, une secte de guerriers ninja dirigée par Ra's al Ghul, se chargera de son entraînement. De retour chez lui à Gotham, avec l'aide de son majordome Alfred Pennyworth, Bruce Wayne se lance alors dans la lutte contre le crime sous le nom de Batman.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='sec5__carrousContain__mainSup d-flex justify-content-center'>
                    <div className="sec5__carrousContain__main">
                        <div className="sec5__carrousContain__main__imgContainer">
                            <img src={BatmanVSSuperman} alt="Superman Man of Steel" />
                        </div>
                        <div className="sec5__carrousContain__main__mediaDescription">

                            <div className="sec5__carrousContain__main__mediaDescription__component">ACTION, ADVENTURE</div>
                            <h3 className="sec5__carrousContain__main__mediaDescription__component">Superman Man of Steel</h3>
                            <div className="sec5__carrousContain__main__mediaDescription__component">IMDB :<span>7.1</span></div>
                            <p className="sec5__carrousContain__main__mediaDescription__component">
                                Le jeune Bruce Wayne assiste impuissant au meurtre de ses parents. Profondément traumatisé, il grandit obnubilé par un désir de vengeance. La Ligue des ombres, une secte de guerriers ninja dirigée par Ra's al Ghul, se chargera de son entraînement. De retour chez lui à Gotham, avec l'aide de son majordome Alfred Pennyworth, Bruce Wayne se lance alors dans la lutte contre le crime sous le nom de Batman.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='sec5__carrousContain__mainSup d-flex justify-content-center'>
                    <div className="sec5__carrousContain__main">
                        <div className="sec5__carrousContain__main__imgContainer">
                            <img src={posterSuperman1978} alt="Superman Man of Steel" />
                        </div>
                        <div className="sec5__carrousContain__main__mediaDescription">

                            <div className="sec5__carrousContain__main__mediaDescription__component">ACTION, ADVENTURE</div>
                            <h3 className="sec5__carrousContain__main__mediaDescription__component">Superman (1978)</h3>
                            <div className="sec5__carrousContain__main__mediaDescription__component">IMDB :<span>7.4</span></div>
                            <p className="sec5__carrousContain__main__mediaDescription__component">
                            Un orphelin extra-terrestre est envoyé de sa planète mourante sur Terre, où il grandit et devient le premier et le plus grand super-héros de sa planète d'adoption.
                            </p>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

export default HomeCarousel;