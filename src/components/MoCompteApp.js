import React from 'react'
import {Tabs, Tab} from './MonCompteTabs.js'

function MonCompteApp() {
  return (
    <Tabs>
        <Tab title="Mes informations personnels">
Info pers
        </Tab>
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