import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReportOS from './Os'

const ReportsRoutes = () => (
  <Switch>
    <Route component={ReportOS} exact path="/logged/reports/os" />
  </Switch>
)

export default ReportsRoutes
