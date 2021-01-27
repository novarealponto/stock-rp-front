import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddEntry from './AddEntry'
import Manager from './Manager'

const Entry = () => (
  <Switch>
    <Route exact path="/logged/entry/add" component={AddEntry} />
    <Route exact path="/logged/entry/manager" component={Manager} />
  </Switch>
)

export default Entry
