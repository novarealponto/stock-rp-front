import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyManufacurerManager from './Manager'

const SupplyManufacurerRoutes = () => (
  <Switch>
    <Route
      component={SupplyManufacurerManager}
      exact
      path="/logged/supply/manufacurer/manager"
    />
  </Switch>
)

export default SupplyManufacurerRoutes
