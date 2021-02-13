import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyStockManager from './Manager'

const SupplyStockRoutes = () => (
  <Switch>
    <Route
      component={SupplyStockManager}
      exact
      path="/logged/supply/stock/manager"
    />
  </Switch>
)

export default SupplyStockRoutes
