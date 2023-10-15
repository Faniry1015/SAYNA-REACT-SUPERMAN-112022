import React from 'react'
import {Tabs, Tab} from './MonCompteTabs.js'
import MonCompteInfoPers from './MonCompteInfoPers.js'

function MonCompteApp() {
  return (
    <Tabs>
        <MonCompteInfoPers title="Mes informations personnels">
Info pers
        </MonCompteInfoPers>
        <Tab title="Mes avis">
Avis
        </Tab>
        <Tab title="Mes favoris">
Favoris
        </Tab>
    </Tabs>
  )
}

export default MonCompteApp