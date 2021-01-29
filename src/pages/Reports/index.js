import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReportMissout from './Missout'
import ReportOS from './Os'
import ReportSolds from './Solds'

const ReportsRoutes = () => (
  <Switch>
    <Route component={ReportMissout} exact path="/logged/reports/missout" />
    <Route component={ReportOS} exact path="/logged/reports/os" />
    <Route component={ReportSolds} exact path="/logged/reports/solds" />
  </Switch>
)

export default ReportsRoutes
