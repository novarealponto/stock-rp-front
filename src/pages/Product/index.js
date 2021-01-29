import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddProduct from './AddProduct'
import Manager from './Manager'
import EditProduct from './EditProduct'

const Product = () => (
  <Switch>
    <Route exact path='/logged/product/add' component={AddProduct} />
    <Route exact path='/logged/product/manager' component={Manager} />
    <Route exact path='/logged/product/edit' component={EditProduct} />
  </Switch>
)


export default Product
