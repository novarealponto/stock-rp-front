import React, { Component } from "react";
import "./index.css";
import { Input, Select, Modal, Button, message } from "antd";

import {
  NewSupProduct,
  NewManufacturer,
  GetManufacturer,
} from "../../../../services/Suprimentos/product";

const { Option } = Select;

class CadProdutosPage extends Component {
  state = {
    loading: false,
    produto: "",
    uniMedida: "NÃO SELECIONADO",
    fabricante: undefined,
    fornecedor: "NÃO SELECIONADO",
    newFabricante: "",
    modalFabricante: false,
    manufacturerList: [],
  };

  clearState = () => {
    this.setState({
      loading: false,
      produto: "",
      uniMedida: "NÃO SELECIONADO",
      fabricante: undefined,
      fornecedor: "NÃO SELECIONADO",
      newFabricante: "",
      modalFabricante: false,
    });
  };

  componentDidMount = async () => {
    await this.getManufacturer();
  };

  getManufacturer = async (name) => {
    const query = {
      filters: {
        manufacturer: {
          specific: {
            name,
          },
        },
      },
    };

    const { status, data } = await GetManufacturer(query);

    if (status === 200) this.setState({ manufacturerList: data.rows });
  };

  ModalFabricante = () => (
    <Modal
      title="Novo fabricante"
      visible={this.state.modalFabricante}
      onOk={this.NovoFabricante}
      onCancel={() => this.setState({ modalFabricante: false })}
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

  NovoFabricante = async () => {
    const { newFabricante: name } = this.state;

    const { status } = await NewManufacturer({ name });

    if (status === 200) {
      message.success("Fabricante cadastrado comn sucesso");
      await this.getManufacturer();
      this.setState({
        modalFabricante: false,
        newFabricante: "",
      });
    } else {
      message.error("Erro ao cadastrar novo fabricante");
    }
  };

  openModal = () => {
    this.setState({
      modalFabricante: true,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeSelect = (e, value) => {
    this.setState({
      [e.target.name]: value,
    });
  };

  saveTargetNewProduct = async () => {
    const {
      produto: name,
      uniMedida: unit,
      fabricante: manufacturerId,
    } = this.state;

    const value = { name, unit, manufacturerId };
    const { status } = await NewSupProduct(value);

    if (status === 200) {
      message.success("Produto cadastrado com sucesso");
      this.clearState();
    } else {
      message.error("Erro ao cadastrar novo produto");
    }
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
              onChange={(value) => this.setState({ uniMedida: value })}
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
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder="NÃO SELECIONADO"
              onSearch={(name) => this.getManufacturer(name)}
              value={this.state.fabricante}
              style={{ width: "100%" }}
              onChange={(value) => this.setState({ fabricante: value })}
            >
              {this.state.manufacturerList.map((manufacturer) => (
                <Option value={manufacturer.id}>{manufacturer.name}</Option>
              ))}
            </Select>
            <div className="button-mais-cadProd" onClick={this.openModal}>
              +
            </div>
          </div>
        </div>
        <div className="linha-button-fornecedor">
          <Button
            type="primary"
            className="button"
            loading={this.state.loading}
            onClick={this.saveTargetNewProduct}
          >
            Salvar
          </Button>
        </div>
      </div>
    );
  }
}

export default CadProdutosPage;
