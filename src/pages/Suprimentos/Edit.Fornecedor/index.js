import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import EdiatrFornecedorSupPage from "./EditFornecedorContainer";

class EditarFornecedorSupRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/fornecedorSup/atualizar"
          component={EdiatrFornecedorSupPage}
        />
      </Switch>
    );
  }
}

export default EditarFornecedorSupRoute;
