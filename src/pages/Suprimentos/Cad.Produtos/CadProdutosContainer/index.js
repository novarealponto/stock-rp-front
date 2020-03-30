import React, { Component } from "react";
import "./index.css";
import { Input, Select, Modal, Button } from "antd";

const { Option } = Select;

class CadProdutosPage extends Component {
  state = {
    loading: false,
    produto: "",
    uniMedida: "NÃO SELECIONADO",
    fabricante: "NÃO SELECIONADO",
    fornecedor: "NÃO SELECIONADO",
    newFabricante: "",
    modalFabricante: false
  };

  ModalFabricante = () => (
    <Modal
      title="Novo fabricante"
      visible={this.state.modalFabricante}
      onOk={this.handleOk}
      onCancel={this.handleOk}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <div className="div-linha1-cadProd">
        <div className="div-newFabricante-cadProd">
          <div className="div-textProduto-cadProd">Fabricante:</div>
          <Input
            className="input-100"
            placeholder="Digite o fabricante"
            name="newFabricante"
            value={this.state.newFabricante}
            onChange={this.onChange}
          />
        </div>
      </div>
    </Modal>
  );

  handleOk = () => {
    this.setState({
      modalFabricante: false
    });
  };

  openModal = () => {
    this.setState({
      modalFabricante: true
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

  render() {
    return (
      <div className="div-card-Gentrada">
        {<this.ModalFabricante />}
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Cadastro produtos (SUPRIMENTOS)</h1>
        </div>

        <div className="div-linha-cadProd">
          <div className="div-produto-cadProd">
            <div className="div-textProduto-cadProd">Produto:</div>
            <Input
              className="input-100"
              placeholder="Digite o produto"
              name="produto"
              value={this.state.produto}
              onChange={this.onChange}
            />
          </div>

          <div className="div-medida-cadProd">
            <div className="div-textMedida-cadProd">Unidade de medida:</div>
            <Select
              value={this.state.uniMedida}
              style={{ width: "100%" }}
              name="uniMedida"
              onChange={this.onChangeSelect}
            >
              <Option value="UNID">UNID</Option>
              <Option value="PÇ">PÇ</Option>
              <Option value="CX">CX</Option>
              <Option value="LT">LT</Option>
            </Select>
          </div>
        </div>

        <div className="div-linha-cadProd">
          <div className="div-fabricante-cadProd">
            <div className="div-textProduto-cadProd">Fabricante:</div>
            <Select
              value={this.state.fabricante}
              style={{ width: "100%" }}
              name="fabricante"
              onChange={this.onChangeSelect}
            >
              <Option value="TESTE">TESTE</Option>
            </Select>
            <div className="button-mais-cadProd" onClick={this.openModal}>
              +
            </div>
          </div>

          <div className="div-fornecedor-cadProd">
            <div className="div-textProduto-cadProd">Fornecedor:</div>
            <Select
              value={this.state.fornecedor}
              style={{ width: "100%" }}
              name="fornecedor"
              onChange={this.onChangeSelect}
            >
              <Option value="TESTE">TESTE</Option>
            </Select>
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

export default CadProdutosPage;
