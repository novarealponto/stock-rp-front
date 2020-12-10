import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddTechnician from './AddTechnician'
import Manage from './Manage'

const Technician = () => (
  <Switch>
    <Route exact path="/logged/technician/add" component={AddTechnician} />
    <Route exact path="/logged/technician/manager" component={Manage} />
  </Switch>
)

export default Technician
