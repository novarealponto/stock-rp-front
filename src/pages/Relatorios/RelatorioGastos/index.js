import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RelatorioGastosContainer from "./RelatorioGastosContainer";

class RelatorioGastosRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/relatorioGastos/dash"
          component={RelatorioGastosContainer}
        />
      </Switch>
    );
  }
}

export default RelatorioGastosRoute;
