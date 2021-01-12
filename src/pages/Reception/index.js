import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddReception from './AddReception'

const Reception = () => (
  <Switch>
    <Route exact path="/logged/reception/add" component={AddReception} />
  </Switch>
)

export default Reception
