import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddTypeAcoount from './AddTypeAcoount'

const User = () => (
  <Switch>
    <Route exact path='/logged/typeAccount/add' component={AddTypeAcoount} />
  </Switch>
)

export default User
