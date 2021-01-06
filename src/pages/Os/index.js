import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddOs from './AddOs'

const Os = () => (
  <Switch>
    <Route exact path="/logged/os/add" component={AddOs} />
  </Switch>
)

export default Os
