import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import Manager from './Manager'

const Product = () => (
  <Switch>
    <Route exact path='/logged/product/add' component={AddProduct} />
    <Route exact path='/logged/product/edit' component={EditProduct} />
    <Route exact path='/logged/product/manager' component={Manager} />
  </Switch>
)


export default Product
