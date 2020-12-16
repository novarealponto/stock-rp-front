import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddTypeAcoount from './AddTypeAcoount'
import Manager from './Manager'

const User = () => (
  <Switch>
    <Route exact path='/logged/typeAccount/add' component={AddTypeAcoount} />
    <Route exact path='/logged/typeAccount/manager' component={Manager} />
  </Switch>
)

export default User
