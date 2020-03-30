import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import EntradaSupPage from "./EntradaContainer";

class EntradaSupRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/logged/entradaSup/add" component={EntradaSupPage} />
      </Switch>
    );
  }
}

export default EntradaSupRoute;
