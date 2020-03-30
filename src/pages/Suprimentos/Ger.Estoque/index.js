import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import GerenciarEstoqueSupPage from "./GerEstoqueContainer";

class GerenciarEstoqueSupRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/gerenciarEstoqueSup/dash"
          component={GerenciarEstoqueSupPage}
        />
      </Switch>
    );
  }
}

export default GerenciarEstoqueSupRoute;
