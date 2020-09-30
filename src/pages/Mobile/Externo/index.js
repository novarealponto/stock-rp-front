import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ExternoContainer from "./ExternoContainer";

class ExternoContainerRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/logged/externo/add" component={ExternoContainer} />
      </Switch>
    );
  }
}

export default ExternoContainerRoute;
