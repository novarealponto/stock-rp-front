import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddOS from './AddOS'
import UpdateOS from './UpdateOS'
import Manager from './Manager'

const Os = () => (
  <Switch>
    <Route exact path="/logged/os/add" component={AddOS} />
    <Route exact path="/logged/os/manager" component={Manager} />
    <Route exact path="/logged/os/update" component={UpdateOS} />
  </Switch>
)

export default Os
