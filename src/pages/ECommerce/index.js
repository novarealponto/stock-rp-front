import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddECommerceContainer from './Add'

const ECommerce = () => (
  <Switch>
    <Route
      component={AddECommerceContainer}
      exact
      path="/logged/E-Commerce/add"
    />
  </Switch>
)

export default ECommerce
