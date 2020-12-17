import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddProvider from './AddProvider'

const Provider = () => (
  <Switch>
    <Route exact path="/logged/provider/add" component={AddProvider} />
  </Switch>
)

export default Provider
