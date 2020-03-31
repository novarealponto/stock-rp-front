import React, { Component } from "react";
import "./index.css";
import { Input, Select, Button, InputNumber, message } from "antd";

import { GetSupProduct } from "../../../../services/Suprimentos/product";
import { GetProvider } from "../../../../services/Suprimentos/fornecedor";
import { NovaEntrada } from "../../../../services/Suprimentos/entrada";

const { Option } = Select;

class EntradaSupPage extends Component {
  state = {
    produto: undefined,
    fornecedor: undefined,
    quant: 1,
    valor: "",
    desconto: "",
    valorTotal: "",
    products: [],
    providers: [],
    supProviderId: "",
    supProductId: ""
  };

  clearState = () => {
    this.setState({
      produto: undefined,
      fornecedor: undefined,
      quant: 1,
      valor: "",
      desconto: "",
      valorTotal: "",
      products: [],
      providers: [],
      supProviderId: "",
      supProductId: ""
    });
  };

  componentDidMount = async () => {
    await this.getSupProduct();
    await this.getProvider();
  };

  getSupProduct = async () => {
    const { status, data } = await GetSupProduct();

    if (status === 200) this.setState({ products: data.rows });
  };

  getProvider = async () => {
    const { status, data } = await GetProvider();

    if (status === 200) this.setState({ providers: data.rows });
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

  saveTargetNewEntrance = async () => {
    await this.setState({ loading: true });
    const {
      quant: amount,
      valor: priceUnit,
      desconto: discount,
      supProviderId,
      supProductId
    } = this.state;

    const value = { amount, priceUnit, discount, supProviderId, supProductId };

    const { status } = await NovaEntrada(value);

    if (status === 200) {
      message.success("Entrada efetuada com sucesso");
      this.clearState();
    } else {
      message.error("Erro ao efetuar entrada");
    }
    this.setState({ loading: false });
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
              placeholder="NÃO SELECIONADO"
              value={this.state.produto}
              style={{ width: "100%" }}
              onChange={(value, props) =>
                this.setState({ supProductId: props.key, produto: value })
              }
            >
              {this.state.products.map(product => (
                <Option value={product.name} key={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="div-fornecedor-entradaSup">
            <div className="div-textProduto-cadProd">Fornecedor:</div>
            <Select
              placeholder="NÃO SELECIONADO"
              value={this.state.fornecedor}
              style={{ width: "100%" }}
              onChange={(value, props) =>
                this.setState({ supProviderId: props.key, fornecedor: value })
              }
            >
              {this.state.providers.map(provider => (
                <Option value={provider.razaoSocial} key={provider.id}>
                  {provider.razaoSocial}
                </Option>
              ))}
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
            <InputNumber
              // value={this.state.valor}
              min={0}
              placeholder="R$ 0,00"
              className="input-100"
              onChange={valor => this.setState({ valor })}
            />
          </div>

          <div className="div-desconto-entradaSup">
            <div className="div-textProduto-cadProd">Desconto:</div>
            <InputNumber
              // value={this.state.desconto}
              min={0}
              placeholder="R$ 0,00"
              className="input-100"
              onChange={desconto => this.setState({ desconto })}
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
            onClick={this.saveTargetNewEntrance}
          >
            Salvar
          </Button>
        </div>
      </div>
    );
  }
}

export default EntradaSupPage;
