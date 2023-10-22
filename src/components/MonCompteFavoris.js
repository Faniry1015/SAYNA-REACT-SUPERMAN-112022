import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext';

function MonCompteFavoris({ title, children, selected }) {
    const { user } = UserAuth()
    const [orderHistoryData, setOrderHistoryData] = useState([])

    const userOrderHistory = async () => {
        if (user && user.email) {
            const q = query(collection(db, "commandes"), where("clientInfo.email", "==", user.email));

            try {
                const querySnapshot = await getDocs(q);
                const orderHistoryArray = []
                querySnapshot.forEach((doc) => {
                    //   console.log(doc.id, " => ", doc.data());
                    const orderData = doc.data()
                    console.log(orderData)
                    filterOrderHistory(orderData)
                    orderHistoryArray.push(orderData)
                });
                setOrderHistoryData(orderHistoryArray)
            } catch (error) {
                console.error("Erreur lors de la récupération de l'historique de commandes :", error);
            }
        }
    }

    const filterOrderHistory = (data) => {
        data.map((order) => {
            const { date, articlesAndAmountToPay } = order
            const { allAmountDetails, articlesInfo } = articlesAndAmountToPay

            let filteredArticlesInfo = []
            articlesInfo.forEach(article => {
                const articlesInfoToKeep = ['nom', 'quantité', 'prix', 'prixTotalArticles']

                filteredArticlesInfo = Object.keys(article).reduce((articleInfo, key) => {
                    if (articlesInfoToKeep.includes(key)) {
                        articleInfo[key] = article[key];
                    }
                    return articleInfo;
                }, {});
            });

            return {
                date,
                filteredArticlesInfo,
                totalPayment: allAmountDetails.totalPayement
            }
        })

    }

    useEffect(() => {
        userOrderHistory()
    }, [user])

    return (<>
        {JSON.stringify(orderHistoryData)}
        <div hidden={!selected}>
            <h3>{title}</h3>
            <p>{children}</p>
        </div>

    </>

    )
}

export default MonCompteFavoris