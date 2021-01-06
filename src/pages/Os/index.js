import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddOs from './AddOs'
import Manager from './Manager'

const Os = () => (
  <Switch>
    <Route exact path="/logged/os/add" component={AddOs} />
    <Route exact path="/logged/os/manager" component={Manager} />
  </Switch>
)

export default Os
