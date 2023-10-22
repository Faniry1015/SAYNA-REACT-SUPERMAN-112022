import React from 'react'
import { Tabs, Tab } from './MonCompteTabs.js'
import MonCompteInfoPers from './MonCompteInfoPers.js'
import MonCompteHistoriqueAchat from './MonCompteHistoriqueAchat.js'

function MonCompteApp() {
  return (
    <Tabs>
      <MonCompteInfoPers title="Mes informations" />
      <MonCompteHistoriqueAchat title="Historique des achats" />
      <Tab title="Mes avis">
        Avis
      </Tab>
      <Tab title="Favoris">
        Favoris
      </Tab>
    </Tabs>
  )
}

export default MonCompteApp