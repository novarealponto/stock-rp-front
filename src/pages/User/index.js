import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddUser from './AddUser'
import EditUser from './EditUser'
import Manager from './Manager'

const User = () => (
  <Switch>
    <Route exact path='/logged/user/add' component={AddUser} />
    <Route exact path='/logged/user/edit' component={EditUser} />
    <Route exact path='/logged/user/manager' component={Manager} />
  </Switch>
)

export default User
