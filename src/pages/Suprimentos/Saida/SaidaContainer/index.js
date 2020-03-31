import React, { Component } from "react";
import "./index.css";
import { Select, Input, InputNumber, Button, message } from "antd";
import { GetSupProduct } from "../../../../services/Suprimentos/product";
import { NovaSaida } from "../../../../services/Suprimentos/saida";

const { Option } = Select;

class SaidaSupPage extends Component {
  state = {
    produto: undefined,
    quant: 1,
    solicitante: "",
    solicitanteEmail: "",
    responsaEmail: "",
    loading: false,
    products: [],
    supProductId: ""
  };

  clearState = () => {
    this.setState({
      produto: undefined,
      quant: 1,
      solicitante: "",
      solicitanteEmail: "",
      responsaEmail: "",
      supProductId: ""
    });
  };

  componentDidMount = async () => {
    await this.getSupProduct();
  };

  getSupProduct = async () => {
    const { status, data } = await GetSupProduct();

    if (status === 200) this.setState({ products: data.rows });
  };

  onChangeQuant = value => {
    this.setState({
      quant: value
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  saveTargetNewOut = async () => {
    const {
      quant: amount,
      solicitante,
      responsaEmail: emailResp,
      solicitanteEmail: emailSolic,
      supProductId
    } = this.state;

    const value = { amount, solicitante, emailResp, emailSolic, supProductId };

    const { status } = await NovaSaida(value);

    if (status === 200) {
      message.success("Entrada efetuada com sucesso");
      this.clearState();
    } else {
      message.error("Erro ao efetuar entrada");
    }
  };

  render() {
    return (
      <div className="div-card-Gentrada">
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Saída (SUPRIMENTOS)</h1>
        </div>

        <div className="div-linha-cadProd">
          <div className="div-produto-saidaSup">
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
          <div className="div-quant-saidaSup">
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
          <div className="div-solicitante-saidaSup">
            <div className="div-textProduto-cadProd">Solicitante:</div>
            <Input
              className="input-100"
              placeholder="Digite o nome do solicitante"
              name="solicitante"
              value={this.state.solicitante}
              onChange={this.onChange}
            />
          </div>
          <div className="div-solicitante-saidaSup">
            <div className="div-textEmailSoli-cadProd">Email solicitante:</div>
            <Input
              className="input-100"
              placeholder="Digite o email do solicitante"
              name="solicitanteEmail"
              value={this.state.solicitanteEmail}
              onChange={this.onChange}
            />
          </div>
          <div className="div-emailSoli-saidaSup">
            <div className="div-textEmailSoli-cadProd">Email responsável:</div>
            <Input
              className="input-100"
              placeholder="Digite o email do responsável"
              name="responsaEmail"
              value={this.state.responsaEmail}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="linha-button-fornecedor">
          <Button
            type="primary"
            className="button"
            loading={this.state.loading}
            onClick={this.saveTargetNewOut}
          >
            Salvar
          </Button>
        </div>
      </div>
    );
  }
}

export default SaidaSupPage;
