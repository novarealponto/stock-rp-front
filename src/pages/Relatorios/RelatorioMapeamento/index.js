import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RelatorioMapContainer from "./RelatorioMapContainer";

class RelatorioMapRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/relatorioMap/dash"
          component={RelatorioMapContainer}
        />
      </Switch>
    );
  }
}

export default RelatorioMapRoute;
