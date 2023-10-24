import React from 'react';
import '../styles/Home.css'
import { ContactForm } from '../components/ContactForm';
import dcLogo from '../assets/logos/logoDC.png'
import superman2 from '../assets/images/img2.png'
import superman3 from '../assets/images/img3.png'
import superman4 from '../assets/images/img4.png'
import nemesis1 from '../assets/images/img5.png'
import nemesis2 from '../assets/images/img6.png'
import nemesis3 from '../assets/images/img7.png'
import allié1 from '../assets/images/img8.png'
import allié2 from '../assets/images/img9.png'
import allié3 from '../assets/images/img10.png'
import boManOfSteel from '../assets/videos/bo-man-of-steel.mp4'
import boManOfSteelPoster from '../assets/images/img15.png'
import FadeIn from '../components/FadeIn';
import HomeCarousel from '../components/HomeCarousel';

function Home() {
    return (
        <main>
            {/* Section 1 Il est Batman */}
            <FadeIn>
                <section className="reveal">
                    <div className="sect1">
                        <div className="sect1__logoDc">
                            <img src={dcLogo} alt="Logo DC Comics" />
                        </div>
                        <div className="sect1__contentDiv">
                            <h1>Superman</h1>
                            <h2>l'homme d'acier</h2>
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* Section 2: Batman au cinéma */}
            <FadeIn>
                <section id="sec2" className="hero">
                    <div className="sec2">
                        <h2 className="reveal">Superman au cinéma</h2>
                        <div className="reveal">
                            <p>
                                Dans la version actuelle de son histoire, Superman est né sur la planète Krypton sous le nom de « Kal-El ». Encore bébé, il fut placé dans un
                                vaisseau spatial par son père, le scientifique Jor-El, et sa mère, Lara, car la planète était sous la menace d'une destruction totale.Le vaisseau quitta
                                Krypton juste avant l'explosion fatidique... Au terme d'un très long voyage, il atterrit sur la planète Terre. Kal-El est trouvé par un couple de
                                fermiers de Smallville, (Kansas). Jonathan et Martha Kent, qui n'ont pas d'enfant, décident alors de l'adopter et de garder le secret sur son origine.

                                Kal-El est rebaptisé « Clark Joseph Kent » et grandit entouré de ses amis Lana Lang (son premier amour) et Pete Ross jusqu'à ce que ses pouvoirs
                                se révèlent à lui au moment de son adolescence.Jeune adulte, Clark décide de s'installer à Metropolis pour devenir journaliste. Il y est engagé par
                                Perry White, le rédacteur en chef du Daily Planet. Pour sauver les personnes qui lui sont chers ainsi que les habitants de la Terre, Clark revêt son
                                costume et devient Superman, l’homme d’acier aux yeux du monde.
                            </p>
                            <div className="illPic">
                                <figure>
                                    <div >
                                        <img src={superman2} alt="Superman1" />
                                    </div>
                                </figure>
                                <figure>
                                    <div >
                                        <img src={superman3} alt="Superman2" />
                                    </div>
                                </figure>
                                <figure>
                                    <div >
                                        <img src={superman4} alt="Superman3" />
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* Section 3: Ennemies */}
            <FadeIn>
                <section className="reveal ennemies" id="sec3">
                    <div className="sec3">
                        <h2 id="sec3Title">Némésis</h2>
                        <p>
                            Superman mène une lutte sans fin contre de nombreux adversaires, son adversaire le plus connu étant le milliardaire Lex Luthor,
                            fils de Lionel Luthor, qui déteste tout ce qu'incarne Superman et finira notamment par devenir président des États-Unis, ce qui
                            participera à faire de lui le pire ennemi de Clark. Doomsday, une abomination génétique qui souhaite tout détruire sur son
                            passage, sera celui qui réussira à tuer Superman. Zod est un kryptonien qui fut condamné à l'emprisonnement dans la Zone
                            Fantôme pour s'être insurgé contre les autorités. Il est libéré et vient sur Terre pour la conquérir mais est arrêté par Superman.
                            Étant kryptonien, Zod possède les mêmes pouvoirs que Superman, et constitue donc l'un de ses plus dangereux adversaires.
                        </p>
                        <div className="illPic">
                            <figure>
                                <div >
                                    <img src={nemesis1} alt="nemesis1" />
                                </div>
                            </figure>
                            <figure>
                                <div >
                                    <img src={nemesis2} alt="nemesis2" />
                                </div>
                            </figure>
                            <figure>
                                <div >
                                    <img src={nemesis3} alt="nemesis3" />
                                </div>
                            </figure>
                        </div>
                    </div>
                </section>
            </FadeIn>

            <FadeIn>
                <section>
                    <div className="sec4">
                        <h2 className="reveal">ALLIÉS</h2>
                        <div className="reveal">
                            <p>
                                Jor-El était le père biologique de Kal-El, ainsi que le savant le plus célèbre de Krypton et un membre influent du Conseil des
                                Sciences. Lorsque Krypton s’effondre il place une version impuissante de lui même dans le vaisseau emportant Kal-El vers la
                                Terre afin de lui apporter les réponses à ses questions quand il grandira. Sur Terre Clark est pris en charge par Jonathan et
                                Martha Kent qui l’élèvent comme leur propre fils. Lorsque John sera mort, Clark pourra compter sur le soutien indéféctible de sa
                                mère. Une fois engagé au Daily Planet, il rencontrera Loïs Lane qui deviendra sa partenaire et son seul “véritable amour”
                            </p>
                            <div className="illPic">
                                <figure>
                                    <div >
                                        <img src={allié1} alt="Allié 1" />
                                    </div>
                                </figure>
                                <figure>
                                    <div >
                                        <img src={allié2} alt="Allié 2" />
                                    </div>
                                </figure>
                                <figure>
                                    <div >
                                        <img src={allié3} alt="Allié 3" />
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeIn>
            {/* Section 4: Alliés */}


            {/* Section 5: Multimédia */}
            <FadeIn>
                <section className="reveal">
                    <div className="sec5">
                        <h2>Batman vs Superman</h2>
                        <HomeCarousel />
                        <div id="BatmanTrailerVid" className="sec5__videoDiv">
                            <video className="sec5__videoDiv__video" src={boManOfSteel} type="video/mkv" poster={boManOfSteelPoster} controls></video>
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* Section 7: Formulaire */}
            <FadeIn>
                <ContactForm />
            </FadeIn>

            {/* Section 8: Citations */}
            <FadeIn>
                <section className="reveal">
                    <div className="sec8">
                        <figure className="sec8__figure">
                            <blockquote>
                                <p>Que représente le S ?</p>
                                <p>Ce n’est pas un S. Sur ma planète cela signifie espoir</p>
                            </blockquote>
                            <figcaption>
                                <cite>Man Of Steel, Lois Lane et Clark Kent.</cite> <br />
                            </figcaption>
                        </figure>
                    </div>
                </section>
            </FadeIn>
        </main>
    );
}

export default Home;

