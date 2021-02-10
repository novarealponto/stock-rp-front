import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AddTechnician from './AddTechnician'
import EditTechnician from './EditTechnician'
import Manager from './Manager'

const Technician = () => (
  <Switch>
    <Route exact path="/logged/technician/add" component={AddTechnician} />
    <Route path="/logged/technician/edit/:id" component={EditTechnician} />
    <Route exact path="/logged/technician/manager" component={Manager} />
    <Redirect to="/logged/technician/manager"  />
  </Switch>
)

export default Technician
