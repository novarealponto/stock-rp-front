import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddUser from './AddUser'

const User = () => (
  <Switch>
    <Route exact path='/logged/user/add' component={AddUser} />
  </Switch>
)

export default User
