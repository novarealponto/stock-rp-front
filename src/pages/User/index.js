import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AddUser from './AddUser'
import EditUser from './EditUser'
import Manager from './Manager'

const User = () => (
  <Switch>
    <Route exact path='/logged/user/add' component={AddUser} />
    <Route path='/logged/user/edit' component={EditUser} />
    <Route exact path='/logged/user/manager' component={Manager} />
    <Redirect to='/logged/user/manager' />
  </Switch>
)

export default User
