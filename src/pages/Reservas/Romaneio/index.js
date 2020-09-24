import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RomanieoContainer from "./RomanieoContainer";

class RomanieoRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/romaneio/dash"
          component={RomanieoContainer}
        />
      </Switch>
    );
  }
}

export default RomanieoRoute;
