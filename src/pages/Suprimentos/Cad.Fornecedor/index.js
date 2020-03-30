import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CadastroFornecedorSupPage from "./CadFornecedorContainer";

class CadastroFornecedorSupRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/cadastroFornecedorSup/add"
          component={CadastroFornecedorSupPage}
        />
      </Switch>
    );
  }
}

export default CadastroFornecedorSupRoute;
