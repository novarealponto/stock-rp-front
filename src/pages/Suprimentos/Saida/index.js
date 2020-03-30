import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import SaidaSupPage from "./SaidaContainer";

class SaidaSupRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/logged/saidaSup/add" component={SaidaSupPage} />
      </Switch>
    );
  }
}

export default SaidaSupRoute;
