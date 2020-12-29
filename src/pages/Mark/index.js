import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Manager from './Manager'

const User = () => (
  <Switch>
    <Route exact path="/logged/mark/manager" component={Manager} />
  </Switch>
)

export default User
