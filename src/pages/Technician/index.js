import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddTechnician from './AddTechnician'
import EditTechnician from './EditTechnician'
import Manage from './Manage'

const Technician = () => (
  <Switch>
    <Route exact path="/logged/technician/add" component={AddTechnician} />
    <Route exact path="/logged/technician/edit" component={EditTechnician} />
    <Route exact path="/logged/technician/manager" component={Manage} />
  </Switch>
)

export default Technician
