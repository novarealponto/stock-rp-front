import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddProvider from './AddProvider'
import Manager from './Manager'

const Provider = () => (
  <Switch>
    <Route exact path="/logged/provider/add" component={AddProvider} />
    <Route exact path="/logged/provider/manager" component={Manager} />
  </Switch>
)

export default Provider
