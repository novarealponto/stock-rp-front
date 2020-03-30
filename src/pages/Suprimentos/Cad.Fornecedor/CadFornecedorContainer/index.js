import React, { Component } from "react";
import "./index.css";
import { Input, Button } from "antd";

class CadFornecedorPage extends Component {
  state = {
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
    nome: "",
    tel: "",
    email: ""
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
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Cadastro fornecedor (SUPRIMENTOS)</h1>
        </div>

        <div className="div-linha-cadProd">
          <div className="div-produto-cadProd">
            <div className="div-textRazao-cadForn">Razão social/ Nome:</div>
            <Input
              className="input-100"
              placeholder="Digite a razão social/nome"
              name="produto"
              value={this.state.produto}
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

        <div className="div-endereco-cadForn">
          <div className="div-linhaEndereco-cadForn">
            <div className="div-nomeContato-cadForn">
              <div className="div-textProduto-cadProd">Nome:</div>
              <Input
                className="input-100"
                placeholder="Digite o nome"
                name="nome"
                value={this.state.nome}
                onChange={this.onChange}
              />
            </div>

            <div className="div-telContato-cadForn">
              <div className="div-textProduto-cadProd">Tel:</div>
              <Input
                className="input-100"
                placeholder="Digite o tel"
                name="tel"
                value={this.state.tel}
                onChange={this.onChange}
              />
            </div>

            <div className="div-emailContato-cadForn">
              <div className="div-textProduto-cadProd">Email:</div>
              <Input
                className="input-100"
                placeholder="Digite o email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
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

export default CadFornecedorPage;
