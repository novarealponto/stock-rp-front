import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyOutputManager from './Manager'

const SupplyOutputRoutes = () => (
  <Switch>
    <Route
      component={SupplyOutputManager}
      exact
      path="/logged/supply/output/manager"
    />
  </Switch>
)

export default SupplyOutputRoutes
