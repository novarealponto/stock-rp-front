import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CadastroProdutosSupPage from "./CadProdutosContainer";

class CadastroProdutosSupRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/cadastroProdutosSup/add"
          component={CadastroProdutosSupPage}
        />
      </Switch>
    );
  }
}

export default CadastroProdutosSupRoute;
