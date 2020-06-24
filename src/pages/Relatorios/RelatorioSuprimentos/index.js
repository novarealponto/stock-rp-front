import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RelatorioSuprimentos from "./RelatorioSuprimentosContainer";

class RelatorioSuprimentosRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/RelatorioSuprimentos/dash"
          component={RelatorioSuprimentos}
        />
      </Switch>
    );
  }
}

export default RelatorioSuprimentosRoute;
