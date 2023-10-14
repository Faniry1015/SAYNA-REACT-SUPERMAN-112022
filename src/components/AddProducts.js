import React from 'react'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase-config';


const batmanProducts = [
    {
        id: "1",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_1.png?alt=media&token=9dea7be5-dd2b-4d84-b92e-0272b4b6c690",
        categorie: "goodies",
        univers: "batman",
        nom: "Gourde",
        description: "lorem ipsum blabla bla msdf sdnazephisle bapen vnuazpeh baureh d ff aetpsdkmlqsdht jsadhipdskz gpandg",
        prix: 50
    },
    {
        id: "2",
        categorie: "goodies",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_3.png?alt=media&token=5945b9b9-b6ae-47cf-aee2-b431fa13df87",
        prix: 28,
        nom: "Mug",
        description: "Ceci est un mug, rien de particulier. Je ne sais pas où se trouve cette personne, mais bon je n'écris rien.",
        univers: "batman"
    },
    {
        id: "3",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_5.png?alt=media&token=970db59f-3b8f-4fbe-a72d-52e10596b554",
        univers: "batman",
        description: "Ceci n'a rien à voir avec le t-shirt car cette personne est nulle à chier. Rien à voir avec ça, je ne trouve rien à écrire.",
        categorie: "vetement",
        prix: 10,
        nom: "T-shirt"
    },
    {
        id: "4",
        nom: "Horloge",
        categorie: "goodies",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_6.png?alt=media&token=8f23cfa2-7180-4412-9cbd-166bd410e501",
        prix: 150,
        univers: "batman",
        description: "C'est juste un jouer. Vous imaginez bien qu'on ne vend pas d'armes en ligne. Surtout à Madagascar où on peut t'emprisonner pour n'importe quoi."
    },
    {
        id: "5",
        nom: "Sweat",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_7.png?alt=media&token=8e974d54-e9a6-434f-b2ff-ad4ec0b4e1c5",
        categorie: "vetement",
        univers: "batman",
        description: "Quelle est la différence entre un sweat et un pull ? Les différences entre le sweat et le pull - Pull-Noel.com La différence la plus évidente entre ces deux vêtements se trouve au niveau de leur matière. En effet, le pull est généralement confectionné en laine, cachemire ou coton, tandis que le sweat est fabriqué dans un tissu plus épais et molletonné.",
        prix: 110
    },
    {
        id: "6",
        description: "Quel est le rôle d'un poster ? La réalisation d'un poster constitue un moyen utile et efficace pour présenter un travail récent, mais peut être un défi pour de jeunes médecins. Un poster efficace est attractif visuellement, structuré et concis et permet de délivrer un message clair en un temps court.",
        prix: 5,
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_13.jpg?alt=media&token=114f790c-f437-494f-9f0e-7ff59cc584e0",
        categorie: "goodies",
        univers: "batmanSuperman",
        nom: "Poster Batman vs Superman"
    },
    {
        id: "7",
        description: "Un e-poster est une version électronique du poster traditionnel. Durant le congrès, les e-posters seront diffusés sur des écrans LCD mis en position « portrait » dans un espace dédié.",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_2.png?alt=media&token=72f212b7-cb5a-4e21-a566-c58344d9f2cd",
        categorie: "goodies",
        prix: 5,
        univers: "batman",
        nom: "Poster Batman"
    },
    {
        id: "8",
        prix: 26,
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_11.jpg?alt=media&token=92130355-f1e6-41c4-90c4-b1404f4025bf",
        categorie: "goodies",
        description: "Mug en céramique Batman V Superman Batman Armour · Livré dans une boîte de présentation · Tasse en céramique d'environ 312 ml · Passe au lave-vaisselle et au micro-onde.",
        univers: "batmanSuperman",
        nom: "Mug Batman vs Superman"
    },
    {
        id: "9",
        description: "Bruce Wayne, inspiré par l'altruisme de Superman, sollicite l'aide de sa nouvelle alliée, Diana Prince, pour affronter un ennemi plus redoutable que jamais. Ensemble, Batman et Wonder Woman ne tardent pas à recruter de nouveaux éléments afin de bâtir une équipe capable de sauver la planète, de plus en plus menacée.",
        nom: "T-shirt Justice League",
        prix: 110,
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/batman-sayna-react-app.appspot.com/o/article_12.jpg?alt=media&token=5ca0537d-f1c5-48bf-806d-c04031410ad2",
        categorie: "vetement",
        univers: "justiceLeague"
    }
];

export function AddProducts(productsArray) {
    productsArray.forEach(async (item) => {
        await setDoc(doc(db, 'produits', item.id), {
            nom: item.nom,
            categorie: item.categorie,
            description: item.description,
            prix: item.prix,
            imgUrl: item.imgUrl,
            univers: item.univers,
          });
    }); 
}

export default AddProducts