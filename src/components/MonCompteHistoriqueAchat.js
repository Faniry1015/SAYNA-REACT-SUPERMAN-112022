import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext';
import '../styles/MonCompteHistoriqueAchat.css'

function MonCompteHistoriqueAchat({ title, selected }) {
    const { user } = UserAuth()
    const [orderHistoryData, setOrderHistoryData] = useState([])
    const [detailsVisibility, setDetailsVisibility] = useState(false)

    const userOrderHistory = async () => {
        if (user && user.email) {
            const q = query(collection(db, "commandes"), where("clientInfo.email", "==", user.email));

            try {
                const querySnapshot = await getDocs(q);
                const orderHistoryArray = []
                querySnapshot.forEach((doc) => {
                    //   console.log(doc.id, " => ", doc.data());
                    orderHistoryArray.push(doc.data())
                });

                setOrderHistoryData(filterOrderHistory(orderHistoryArray))
            } catch (error) {
                console.error("Erreur lors de la récupération de l'historique de commandes :", error);
            }
        }
    }

    const filterOrderHistory = (data) => {
        const datafiltered = data.map((order) => {
            const { date, articlesAndAmountToPay } = order
            const { allAmountDetails, articlesInfo } = articlesAndAmountToPay

            let filteredArticlesInfo = []
            articlesInfo.forEach(article => {
                const articlesInfoToKeep = ['nom', 'quantité', 'prix', 'prixTotalArticles']

                const usefullArticleInfo = Object.keys(article).reduce((articleInfo, key) => {
                    if (articlesInfoToKeep.includes(key)) {
                        articleInfo[key] = article[key];
                    }
                    return articleInfo;
                }, {});
                filteredArticlesInfo.push(usefullArticleInfo)
            });

            return {
                date,
                filteredArticlesInfo,
                totalPayment: allAmountDetails.totalPayement
            }
        })
        return datafiltered

    }

    const orderDate = (dataDate) => {
        const dateAvecHeure = new Date(dataDate.date.seconds * 1000)
        return dateAvecHeure.toLocaleDateString()

    }

    const handleDetailsVisibility = () => {
        setDetailsVisibility(!detailsVisibility)
    }

    useEffect(() => {
        userOrderHistory()
    }, [user])

    return (<>
        {/* {JSON.stringify(orderHistoryData)} */}
        <div hidden={!selected} className='orderHistoryMainContainer'>
            <h3>{title}</h3>
            <ul className='m-4'>
                {orderHistoryData.map(order => {
                    return <li key={orderHistoryData.indexOf(order) + 1} className='mb-4'>
                        <h5 className='d-inline orderHistoryLabel'>Achat n° {orderHistoryData.indexOf(order) + 1} :</h5> le {orderDate(order)} pour un montant de <strong>{order.totalPayment}€</strong> TTC
                        <ul hidden={detailsVisibility} >
                            {order.filteredArticlesInfo.map(article => (
                                <li key={article.nom}>
                                    <h5 className='mb-0 mt-2'>{article.nom}</h5>
                                    <ul>
                                        <li>Quantité: {article.quantité}</li>
                                        <li>Total (HT et hors réduction): {article.prixTotalArticles}€</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                })}
            </ul>
            <div className="showDetailsBtnContainer">
                <button onClick={handleDetailsVisibility}>Détaillé les achats</button>
            </div>
        </div>

    </>

    )
}

export default MonCompteHistoriqueAchat