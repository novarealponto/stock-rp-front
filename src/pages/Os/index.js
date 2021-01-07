import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddOs from './AddOs'
import UpdateOS from './UpdateOS'
import Manager from './Manager'

const Os = () => (
  <Switch>
    <Route exact path="/logged/os/add" component={AddOs} />
    <Route exact path="/logged/os/manager" component={Manager} />
    <Route exact path="/logged/os/update" component={UpdateOS} />
  </Switch>
)

export default Os
