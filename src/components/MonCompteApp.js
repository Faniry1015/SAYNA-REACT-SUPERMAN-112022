import React from 'react'
import { Tabs, Tab } from './MonCompteTabs.js'
import MonCompteInfoPers from './MonCompteInfoPers.js'
import MonCompteFavoris from './MonCompteFavoris.js'

function MonCompteApp() {
  return (
    <Tabs>
      <MonCompteInfoPers title="Mes informations" />
      <Tab title="Mes avis">
        Avis
      </Tab>
      <MonCompteFavoris title="Mes favoris">
        Favoris
      </MonCompteFavoris>
    </Tabs>
  )
}

export default MonCompteApp