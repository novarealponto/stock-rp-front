import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddProvider from './AddProvider'
import Manager from './Manager'
import UpdateProvider from './UpdateProvider'

const Provider = () => (
  <Switch>
    <Route exact path="/logged/provider/add" component={AddProvider} />
    <Route exact path="/logged/provider/manager" component={Manager} />
    <Route exact path="/logged/provider/update" component={UpdateProvider} />
  </Switch>
)

export default Provider
