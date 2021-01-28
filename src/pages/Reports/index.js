import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReportOS from './Os'
import ReportMissout from './Missout'

const ReportsRoutes = () => (
  <Switch>
    <Route component={ReportOS} exact path="/logged/reports/os" />
    <Route component={ReportMissout} exact path="/logged/reports/missout" />
  </Switch>
)

export default ReportsRoutes
