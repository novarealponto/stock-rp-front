import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyEntryManager from './Manager'

const SupplyEntryRoutes = () => (
  <Switch>
    <Route
      component={SupplyEntryManager}
      exact
      path="/logged/supply/entry/manager"
    />
  </Switch>
)

export default SupplyEntryRoutes
