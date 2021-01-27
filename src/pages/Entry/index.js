import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddEntry from './AddEntry'

const Entry = () => (
  <Switch>
    <Route exact path="/logged/entry/add" component={AddEntry} />
  </Switch>
)

export default Entry
