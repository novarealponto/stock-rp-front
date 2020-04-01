import React, { Component } from "react";
import "./index.css";
import { Select, Button, Input, Spin } from "antd";

import {
  GetSupProduct,
  GetManufacturer
} from "../../../../services/Suprimentos/product";
import { GetProvider } from "../../../../services/Suprimentos/fornecedor";

const { Option } = Select;

class GerenciarCadastrosSupPage extends Component {
  state = {
    avancado: true,
    select: "produtos",
    loading: false,
    search: false,
    page: 1,
    count: 1,
    show: 1,
    total: 10,
    products: [],
    fabricantes: [],
    fornecedores: []
  };

  componentDidMount = async () => {
    await this.getSupProduct();
    await this.getManufacturer();
    await this.getProvider();
  };

  getSupProduct = async () => {
    const { status, data } = await GetSupProduct();

    if (status === 200) this.setState({ products: data.rows });
  };

  getManufacturer = async () => {
    const { status, data } = await GetManufacturer();

    if (status === 200) this.setState({ fabricantes: data.rows });
  };

  getProvider = async () => {
    const { status, data } = await GetProvider();

    if (status === 200) this.setState({ fornecedores: data.rows });
  };

  onChangeSelect = async value => {
    await this.setState({
      select: value,
      loading: true,
      page: 1,
      count: 1,
      show: 1,
      total: 10
    });

    switch (value) {
      case "produtos":
      case "fabricante":
        // await this.getEprestimo();
        break;
      case "fornecedor":
        // await this.getAllEquips();
        break;
      default:
    }

    this.setState({
      loading: false
    });
  };

  changePages = async pages => {
    await this.setState({
      page: pages
    });

    switch (this.state.select) {
      case "produtos":
      case "fabricante":
        // await this.getEprestimo();
        break;
      case "fornecedor":
        // await this.getAllEquips();
        break;
      default:
    }
  };

  Pages = () => (
    <div className="footer-Gentrada100-button">
      {Math.ceil(this.state.count / this.state.total) >= 5 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 4)}
        >
          {this.state.page - 4}
        </Button>
      ) : null}
      {Math.ceil(this.state.count / this.state.total) >= 4 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 2 &&
      this.state.page > 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 3)}
        >
          {this.state.page - 3}
        </Button>
      ) : null}
      {this.state.page >= 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 2)}
        >
          {this.state.page - 2}
        </Button>
      ) : null}
      {this.state.page >= 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 1)}
        >
          {this.state.page - 1}
        </Button>
      ) : null}
      <div className="div-teste">{this.state.page}</div>
      {this.state.page < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 1)}
        >
          {this.state.page + 1}
        </Button>
      ) : null}
      {this.state.page + 1 < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 2)}
        >
          {this.state.page + 2}
        </Button>
      ) : null}
      {this.state.page + 2 < this.state.count / this.state.total &&
      this.state.page < 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 3)}
        >
          {this.state.page + 3}
        </Button>
      ) : null}
      {this.state.page + 3 < this.state.count / this.state.total &&
      this.state.page < 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 4)}
        >
          {this.state.page + 4}
        </Button>
      ) : null}
    </div>
  );

  Search = () => {
    switch (this.state.select) {
      case "produtos":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-cod-cabecalho-gerCad-search">
                <Input
                  placeholder="111"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-fabricante-cabecalho-gerCad-search">
                <Input
                  placeholder="Nome do produto"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-fabricante-cabecalho-gerCad-search">
                <Input
                  placeholder="Digite o fabricante"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-data-cabecalho-gerCad-search">
                <Input
                  placeholder="20/11/2020"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        );
      case "fabricante":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-fornecedor-cabecalho-gerCad-search">
                <Input
                  placeholder="Digite o fabricante"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-numSerie-cabecalho-estoque-search">
                <Input
                  placeholder="20/11/2020"
                  name="serialNumberSearch"
                  style={{ width: "100%" }}
                  // value={serialNumberSearch}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        );
      case "fornecedor":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-razao-cabecalho-gerCad-search">
                <Input
                  placeholder="Digite a razão social/ nome"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-cnpj-cabecalho-gerCad-search">
                <Input
                  placeholder="Digite o cnpj/ cpf"
                  name="fabricanteSearch"
                  style={{ width: "100%" }}
                  // value={fabricanteSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-tel-cabecalho-gerCad-search">
                <Input
                  placeholder="(11) 92310-3432"
                  name="fabricanteSearch"
                  style={{ width: "100%" }}
                  // value={fabricanteSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-dataFF-cabecalho-gerCad-search">
                <Input
                  placeholder="20/11/2020"
                  name="serialNumberSearch"
                  style={{ width: "100%" }}
                  // value={serialNumberSearch}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="div-card-Gentrada">
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Gerenciar cadastros (SUPRIMENTOS)</h1>
        </div>
        <div className="div-select-emprestimo">
          <Select
            value={this.state.select}
            style={{ width: "20%" }}
            onChange={this.onChangeSelect}
          >
            <Option value="produtos">PRODUTOS</Option>
            <Option value="fabricante">FABRICANTE</Option>
            <Option value="fornecedor">FORNECEDOR</Option>
          </Select>
          <Button
            type="primary"
            className="button"
            onClick={async () => {
              await this.setState({
                search: !this.state.search,
                avancado: !this.state.avancado
              });

              switch (this.state.select) {
                case "produtos":
                case "fabricante":
                  // await this.getEprestimo();
                  break;
                case "fornecedor":
                  // await this.getAllEquips();
                  break;
                default:
              }
            }}
          >
            {this.state.avancado ? "Avançado" : "Ocultar"}
          </Button>
        </div>

        {this.state.search && <this.Search />}

        {this.state.select === "produtos" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
              <div className="cel-cod-cabecalho-gerCad">Cod.</div>
              <div className="cel-produto-cabecalho-gerCad">Produto</div>
              <div className="cel-fabricante-cabecalho-gerCad">Fabricante</div>
              <div className="cel-data-cabecalho-gerCad">Data incl.</div>
              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            {this.state.products.map(product => (
              <div className="div-cabecalho-estoque">
                <div className="cel-cod-cabecalho-gerCad">{product.id}</div>
                <div className="cel-produto-cabecalho-gerCad">
                  {product.name}
                </div>
                <div className="cel-fabricante-cabecalho-gerCad">
                  {product.manufacturerId}
                </div>
                <div className="cel-data-cabecalho-gerCad">
                  {product.createdAt}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados" />
              </div>
            ))}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "fabricante" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
              <div className="cel-fabricanteF-cabecalho-gerCad">Fabricante</div>
              <div className="cel-dataF-cabecalho-gerCad">Data inclusão</div>
              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            {this.state.fabricantes.map(fabricante => (
              <div className="div-cabecalho-estoque">
                <div className="cel-fabricanteF-cabecalho-gerCad">
                  {fabricante.id}
                </div>
                <div className="cel-dataF-cabecalho-gerCad">
                  {fabricante.createdAt}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados" />
              </div>
            ))}

            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "fornecedor" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
              <div className="cel-razaoNome-cabecalho-gerCad">
                Razão social/ Nome
              </div>
              <div className="cel-fabricante-cabecalho-gerCad">Cnpj/ Cpf</div>
              <div className="cel-data-cabecalho-gerCad">Telefone</div>
              <div className="cel-data-cabecalho-gerCad">Data Incl.</div>
              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            {this.state.fornecedores.map(fornecedore => (
              <div className="div-cabecalho-estoque">
                <div className="cel-produto-cabecalho-gerCad">
                  {fornecedore.razaoSocial}
                </div>
                <div className="cel-fabricante-cabecalho-gerCad">
                  {fornecedore.cnpj}
                </div>
                <div className="cel-data-cabecalho-gerCad">?????</div>
                <div className="cel-data-cabecalho-gerCad">
                  {fornecedore.createdAt}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados" />
              </div>
            ))}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GerenciarCadastrosSupPage;
