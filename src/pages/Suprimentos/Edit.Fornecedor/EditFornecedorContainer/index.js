import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./index.css";
import { Input, Button, message } from "antd";
import * as R from "ramda";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

import { clearValueProvider } from "../Redux/action";
import { UpdateProvider } from "../../../../services/Suprimentos/fornecedor";
import { getAddressByZipCode } from "../../../../services/fornecedores";
import { masks } from "./validators";

class EditFornecedorPage extends Component {
  state = {
    redirect: false,
    loading: false,
    id: this.props.providerUpdateValue.id,
    razaoSocial: this.props.providerUpdateValue.razaoSocial,
    cnpOuCpf: this.props.providerUpdateValue.cnpj,
    rua: this.props.providerUpdateValue.street,
    bairro: this.props.providerUpdateValue.neighborhood,
    cidade: this.props.providerUpdateValue.city,
    cep: this.props.providerUpdateValue.zipCode,
    numero: this.props.providerUpdateValue.number,
    uf: this.props.providerUpdateValue.state,
    complemento: this.props.providerUpdateValue.complement,
    contacts: [{ name: "", telphone: "", email: "" }]
  };

  clearState = () => {
    this.setState({
      loading: false,
      razaoSocial: "",
      cnpOuCpf: "",
      rua: "",
      bairro: "",
      cidade: "",
      cep: "",
      numero: "",
      uf: "",
      complemento: "",
      contacts: [{ name: "", telphone: "", email: "" }]
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    const { nome, valor } = masks(name, value);
    this.setState({
      [nome]: valor
    });
  };

  onChangeContact = e => {
    const { name, id, value } = e.target;
    const { nome, valor } = masks(name, value);

    const { contacts } = this.state;

    contacts[id] = { ...contacts[id], [nome]: valor };

    this.setState({ contacts });
  };

  onChangeSelect = (e, value) => {
    this.setState({
      [e.target.name]: value
    });
  };

  getAddress = async e => {
    const cep = e.target.value;

    const address = await getAddressByZipCode(cep);

    if (!R.has("erro", address.data)) {
      this.setState({
        rua: address.data.logradouro,
        cidade: address.data.localidade,
        bairro: address.data.bairro,
        uf: address.data.uf
      });
    }
  };

  saveTargetUpdateProvider = async () => {
    this.setState({ loading: true });
    const {
      id,
      razaoSocial,
      cnpOuCpf: cnpj,
      rua: street,
      bairro: neighborhood,
      cidade: city,
      cep: zipCode,
      numero: number,
      uf: state,
      complemento: complement,
      contacts
    } = this.state;

    const value = {
      id,
      razaoSocial,
      cnpj,
      street,
      neighborhood,
      city,
      zipCode,
      number,
      state,
      complement,
      contacts
    };

    const { status } = await UpdateProvider(value);

    if (status === 200) {
      message.success("Fabricante cadastrado com sucessso");
      this.clearState();
      this.setState({ redirect: true });
      this.props.clearValueProvider();
    } else {
      message.error("Erro ao cadastrar novo fabricante");
      this.setState({ loading: false });
    }
  };

  redirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/logged/GerenciarCadastrosSup/dash",
            state: { from: this.props.location }
          }}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <div className="div-card-Gentrada">
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Atualizar fornecedor (SUPRIMENTOS)</h1>
        </div>

        <div className="div-linha-cadProd">
          <div className="div-produto-cadProd">
            <div className="div-textRazao-cadForn">Razão social/ Nome:</div>
            <Input
              className="input-100"
              placeholder="Digite a razão social/nome"
              name="razaoSocial"
              value={this.state.razaoSocial}
              onChange={this.onChange}
            />
          </div>

          <div className="div-medida-cadProd">
            <div className="div-textCnp-cadForn">Cnpj/ Cpf:</div>
            <Input
              className="input-100"
              placeholder="Digite o cnpj/ cpf"
              name="cnpOuCpf"
              value={this.state.cnpOuCpf}
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className="div-endereco-cadForn">
          <div className="div-linhaEndereco-cadForn">
            <div className="div-cepEndereco-cadForn">
              <div className="div-textProduto-cadProd">Cep:</div>
              <Input
                className="input-100"
                placeholder="Digite o cep"
                name="cep"
                value={this.state.cep}
                onChange={this.onChange}
                onBlur={this.getAddress}
              />
            </div>

            <div className="div-ruaEndereco-cadForn">
              <div className="div-textProduto-cadProd">Rua:</div>
              <Input
                className="input-100"
                placeholder="Digite a rua"
                name="rua"
                value={this.state.rua}
                onChange={this.onChange}
              />
            </div>

            <div className="div-numEndereco-cadForn">
              <div className="div-textProduto-cadProd">Nº:</div>
              <Input
                className="input-100"
                placeholder="3123"
                name="numero"
                value={this.state.numero}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="div-linhaEndereco-cadForn">
            <div className="div-bairroEndereco-cadForn">
              <div className="div-textProduto-cadProd">Bairro:</div>
              <Input
                className="input-100"
                placeholder="Digite o bairro"
                name="bairro"
                value={this.state.bairro}
                onChange={this.onChange}
              />
            </div>

            <div className="div-cidadeEndereco-cadForn">
              <div className="div-textProduto-cadProd">Cidade:</div>
              <Input
                className="input-100"
                placeholder="Digite a cidade"
                name="cidade"
                value={this.state.cidade}
                onChange={this.onChange}
              />
            </div>

            <div className="div-ufEndereco-cadForn">
              <div className="div-textProduto-cadProd">Estado:</div>
              <Input
                className="input-100"
                placeholder="SP"
                name="uf"
                value={this.state.uf}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="div-linhaEndereco-cadForn">
            <div className="div-compEndereco-cadForn">
              <div className="div-textProduto-cadProd">Compl:</div>
              <Input
                className="input-100"
                placeholder="Digite o complemento"
                name="complemento"
                value={this.state.complemento}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>

        {this.state.contacts.map((contact, index) => (
          <div className="div-endereco-cadForn">
            <div className="div-linhaEndereco-cadForn">
              <div className="div-nomeContato-cadForn">
                <div className="div-textProduto-cadProd">Nome:</div>
                <Input
                  className="input-100"
                  placeholder="Digite o nome"
                  value={contact.name}
                  name="name"
                  id={index}
                  onChange={this.onChangeContact}
                />
              </div>

              <div className="div-telContato-cadForn">
                <div className="div-textProduto-cadProd">Tel:</div>
                <Input
                  className="input-100"
                  placeholder="Digite o tel"
                  value={contact.telphone}
                  name="telphone"
                  id={index}
                  onChange={this.onChangeContact}
                />
              </div>

              <div className="div-emailContato-cadForn">
                <div className="div-textProduto-cadProd">Email:</div>
                <Input
                  className="input-100"
                  placeholder="Digite o email"
                  value={contact.email}
                  name="email"
                  id={index}
                  onChange={this.onChangeContact}
                />
              </div>
              {this.state.contacts.length > 1 && (
                <CloseOutlined
                  onClick={() => {
                    const contacts = this.state.contacts;

                    contacts.splice(index, 1);

                    this.setState({ contacts });
                  }}
                />
              )}
            </div>
          </div>
        ))}

        <div
          className="div-endereco-cadForn"
          style={{ alignItems: "flex-end", margin: "10px" }}
        >
          <PlusOutlined
            onClick={() =>
              this.setState({
                contacts: [
                  ...this.state.contacts,
                  { nome: "", tel: "", email: "" }
                ]
              })
            }
          />
        </div>

        <div className="linha-button-fornecedor">
          <Button
            type="primary"
            className="button"
            loading={this.state.loading}
            onClick={this.saveTargetUpdateProvider}
          >
            Atualizar
          </Button>
        </div>
        <this.redirect />
      </div>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ clearValueProvider }, dispach);
}

function mapStateToProps(state) {
  return {
    providerUpdateValue: state.providerUpdateValue
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(EditFornecedorPage);
