import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RelatorioVendas from "./RelatorioVendasContainer";

class RelatorioVendasRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/RelatorioVendas/dash"
          component={RelatorioVendas}
        />
      </Switch>
    );
  }
}

export default RelatorioVendasRoute;
