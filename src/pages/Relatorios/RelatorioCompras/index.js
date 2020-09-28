import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RelatorioComprasContainer from "./RelatorioComprasContainer";

class RelatorioComprasRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/relatorioCompras/dash"
          component={RelatorioComprasContainer}
        />
      </Switch>
    );
  }
}

export default RelatorioComprasRoute;
