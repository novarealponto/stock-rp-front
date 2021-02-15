import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyEntryRoutes from './Entry'
import SupplyManufacurerRoutes from './Manufacurer'
import SupplyOutputRoutes from './Output'
import SupplyProductRoutes from './Product'
import SupplyStockRoutes from './Stock'

const SupplyRoutes = () => (
  <Switch>
    <Route component={SupplyEntryRoutes} path="/logged/supply/entry" />
    <Route
      component={SupplyManufacurerRoutes}
      path="/logged/supply/manufacurer"
    />
    <Route component={SupplyOutputRoutes} path="/logged/supply/output" />
    <Route component={SupplyProductRoutes} path="/logged/supply/product" />
    <Route component={SupplyStockRoutes} path="/logged/supply/stock" />
  </Switch>
)

export default SupplyRoutes
