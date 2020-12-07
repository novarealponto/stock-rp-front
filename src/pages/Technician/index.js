import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddTechnician from './AddTechnician'

const Product = () => (
  <Switch>
    <Route exact path='/logged/technician/add' component={AddTechnician} />
  </Switch>
)


export default Product
