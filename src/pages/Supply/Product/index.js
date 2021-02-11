import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyProductManager from './Manager'

const SupplyProductRoutes = () => (
  <Switch>
    <Route
      component={SupplyProductManager}
      exact
      path="/logged/supply/product/manager"
    />
  </Switch>
)

export default SupplyProductRoutes
