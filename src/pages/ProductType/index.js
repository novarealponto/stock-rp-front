import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Manager from './Manager'

const Product = () => (
  <Switch>
    <Route exact path="/logged/productType/manager" component={Manager} />
  </Switch>
)

export default Product
