import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddTechnician from './AddTechnician'

const Technician = () => (
  <Switch>
    <Route exact path='/logged/technician/add' component={AddTechnician} />
  </Switch>
)


export default Technician
