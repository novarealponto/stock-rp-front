import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import GerenciarCadastrosSupPage from "./GerCadastrosContainer";

class GerenciarCadastrosSupRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/GerenciarCadastrosSup/dash"
          component={GerenciarCadastrosSupPage}
        />
      </Switch>
    );
  }
}

export default GerenciarCadastrosSupRoute;
