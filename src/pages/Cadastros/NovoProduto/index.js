import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddProductContainer from '../NovoProduto/ProdutoContainer'

const AddProduct = () => (
  <Switch>
    <Route
      exact
      path='/logged/novoProduto/add'
      component={AddProductContainer}
    />
  </Switch>
)


export default AddProduct
