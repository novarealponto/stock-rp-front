import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddProduct from './AddProduct'

const Product = () => (
  <Switch>
    <Route exact path='/logged/product/add' component={AddProduct} />
    <Route exact path='/logged/product/manager' component={() => 'A page que estiver em manager dentro dessa pasta'} />
  </Switch>
)


export default Product
