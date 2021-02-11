import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import Manager from './Manager'

const Product = () => (
  <Switch>
    <Route exact path='/logged/product/add' component={AddProduct} />
    <Route path='/logged/product/edit/:id' component={EditProduct} />
    <Route exact path='/logged/product/manager' component={Manager} />
    <Redirect to='/logged/product/manager' />
  </Switch>
)


export default Product
