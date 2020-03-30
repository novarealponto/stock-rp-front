import React, { Component } from "react";
import "./index.css";
import { Input, Select, Button, InputNumber } from "antd";

const { Option } = Select;

class EntradaSupPage extends Component {
  state = {
    produto: "NÃO SELECIONADO",
    fornecedor: "NÃO SELECIONADO",
    quant: 1,
    valor: "",
    desconto: "",
    valorTotal: ""
  };

  contaValorTotal = () => {
    this.setState({
      valorTotal: this.state.valor * this.state.quant - this.state.desconto
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeSelect = (e, value) => {
    this.setState({
      [e.target.name]: value
    });
  };

  onChangeQuant = value => {
    this.setState({
      quant: value
    });
  };

  render() {
    return (
      <div className="div-card-Gentrada">
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Entrada (SUPRIMENTOS)</h1>
        </div>

        <div className="div-linha-cadProd">
          <div className="div-produto-entradaSup">
            <div className="div-textProduto-cadProd">Produto:</div>
            <Select
              value={this.state.produto}
              style={{ width: "100%" }}
              name="produto"
              onChange={this.onChangeSelect}
            >
              <Option value="Produto">Produto</Option>
            </Select>
          </div>

          <div className="div-fornecedor-entradaSup">
            <div className="div-textProduto-cadProd">Fornecedor:</div>
            <Select
              value={this.state.fornecedor}
              style={{ width: "100%" }}
              name="fornecedor"
              onChange={this.onChangeSelect}
            >
              <Option value="fornecedor">fornecedor</Option>
            </Select>
          </div>

          <div className="div-quant-entradaSup">
            <div className="div-textProduto-cadProd">Quant:</div>
            <InputNumber
              min={1}
              defaultValue={this.state.quant}
              style={{ width: "100%" }}
              value={this.state.quant}
              onChange={this.onChangeQuant}
            />
          </div>
        </div>

        <div className="div-linha-cadProd">
          <div className="div-valor-entradaSup">
            <div className="div-textProduto-cadProd">Valor:</div>
            <Input
              value={this.state.valor}
              name="valor"
              placeholder="R$ 0,00"
              className="input-100"
              onChange={this.onChange}
            />
          </div>

          <div className="div-desconto-entradaSup">
            <div className="div-textProduto-cadProd">Desconto:</div>
            <Input
              value={this.state.desconto}
              name="desconto"
              placeholder="R$ 0,00"
              className="input-100"
              onChange={this.onChange}
              onBlur={this.contaValorTotal}
            />
          </div>

          <div className="div-valorTotal-entradaSup">
            <div className="div-textProduto-cadProd">Total:</div>
            <Input
              readOnly
              value={this.state.valorTotal}
              name="valorTotal"
              placeholder="R$ 0,00"
              className="input-100"
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className="linha-button-fornecedor">
          <Button
            type="primary"
            className="button"
            loading={this.state.loading}
          >
            Salvar
          </Button>
        </div>
      </div>
    );
  }
}

export default EntradaSupPage;
