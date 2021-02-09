import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyManufacurerRoutes from './Manufacurer'
import SupplyProductRoutes from './Product'

const SupplyRoutes = () => (
  <Switch>
    <Route path='/logged/supply/manufacurer' component={SupplyManufacurerRoutes}/>
    <Route path='/logged/supply/product' component={SupplyProductRoutes}/>
  </Switch>
)

export default SupplyRoutes
