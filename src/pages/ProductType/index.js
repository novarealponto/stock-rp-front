import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddProductType from './AddProductType'
import Manager from './Manager'

const Product = () => (
  <Switch>
    <Route exact path="/logged/productType/add" component={AddProductType} />
    <Route exact path="/logged/productType/manager" component={Manager} />
  </Switch>
)

export default Product
