import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./index.css";
import { Select, Button, Input, Spin, Modal, message, DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { split } from "ramda";
import moment from "moment";

import { redirectValueProvider } from "../../Edit.Fornecedor/Redux/action";
import {
  UpdateSupProduct,
  GetSupProduct,
  UpdateManufacturer,
  GetManufacturer,
} from "../../../../services/Suprimentos/product";
import { GetProvider } from "../../../../services/Suprimentos/fornecedor";

const { Option } = Select;

class GerenciarCadastrosSupPage extends Component {
  state = {
    redirect: false,
    visibleFabricante: false,
    visibleProduto: false,
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
    fornecedores: [],
    manufacturerList: [],
    manufacturer: {
      id: "",
      name: "",
    },
    product: {
      id: "",
      name: "",
      unit: "",
      manufacturerId: "",
      manufacturer: {
        name: "",
      },
    },
    produtoSearch: {
      codigo: "",
      nome: "",
      fabricante: "",
      data: "",
    },
    fabricanteSearch: {
      nome: "",
    },
    fornecedorSearch: {
      razaosocial: "",
      cnpj: "",
      telefone: "",
    },
    valueDate: { start: "2019/01/01" },
  };

  clearState = () => {
    this.setState({
      visibleFabricante: false,
      visibleProduto: false,
      avancado: true,
      loading: false,
      search: false,
      page: 1,
      count: 1,
      show: 1,
      total: 10,
      manufacturer: {
        id: "",
        name: "",
      },
      product: {
        id: "",
        name: "",
        unit: "",
        manufacturerId: "",
        manufacturer: {
          name: "",
        },
      },
      valueDate: { start: "2019/01/01" },
    });
  };

  componentDidMount = async () => {
    await this.getSupProduct();
    await this.getManufacturer();
    await this.getProvider();
  };

  getSupProduct = async () => {
    const query = {
      filters: {
        supProduct: {
          specific: {
            name: this.state.produtoSearch.nome,
            code: this.state.produtoSearch.codigo,
            createdAt: this.state.valueDate,
          },
        },
        manufacturer: {
          specific: {
            name: this.state.produtoSearch.fabricante,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetSupProduct(query);

    if (status === 200) this.setState({ products: data.rows });
  };

  updateSupProduct = async () => {
    const { id, name, unit, manufacturerId } = this.state.product;
    const value = { id, name, unit, manufacturerId };
    const { status } = await UpdateSupProduct(value);

    if (status === 200) {
      message.success("Produto atualizado com sucesso");
      await this.getSupProduct();
      this.clearState();
    } else {
      message.error("Erro ao atualizar produto");
    }
  };

  getManufacturer = async (name) => {
    const query = {
      filters: {
        manufacturer: {
          specific: {
            name: name || this.state.fabricanteSearch.nome,
            createdAt: this.state.valueDate,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetManufacturer(query);

    if (status === 200) {
      this.setState({
        fabricantes: this.state.product.id ? this.state.fabricantes : data.rows,
        manufacturerList: data.rows,
      });
    }
  };

  updateManufacturer = async () => {
    const { name, id } = this.state.manufacturer;
    const { status } = await UpdateManufacturer({ id, name });

    if (status === 200) {
      message.success("Fabricante atualizado com sucesso");
      await this.getManufacturer();
      this.clearState();
    } else {
      message.error("Erro ao atualizar fabricante");
    }
  };

  getProvider = async () => {
    const query = {
      filters: {
        supProvider: {
          specific: {
            razaoSocial: this.state.fornecedorSearch.razaosocial,
            cnpj: this.state.fornecedorSearch.cnpj,
            // telphone: this.state.fornecedorSearch.telefone
            createdAt: this.state.valueDate,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetProvider(query);

    if (status === 200) this.setState({ fornecedores: data.rows });
  };

  onChange = async (e) => {
    const { name, value } = e.target;

    const nameArry = split(" ", name);

    await this.setState({
      [nameArry[0]]: { ...this.state[nameArry[0]], [nameArry[1]]: value },
    });

    switch (this.state.select) {
      case "produtos":
        await this.getSupProduct();
        break;
      case "fabricante":
        await this.getManufacturer();
        break;
      case "fornecedor":
        await this.getProvider();
        break;
      default:
        break;
    }
  };

  onChangeSelect = async (value) => {
    await this.setState({
      select: value,
      loading: true,
      page: 1,
      count: 1,
      show: 1,
      total: 10,
    });

    switch (this.state.select) {
      case "produtos":
        await this.getSupProduct();
        break;
      case "fabricante":
        await this.getManufacturer();
        break;
      case "fornecedor":
        await this.getProvider();
        break;
      default:
        break;
    }

    this.setState({
      loading: false,
    });
  };

  changePages = async (pages) => {
    await this.setState({
      page: pages,
    });

    switch (this.state.select) {
      case "produtos":
        await this.getSupProduct();
        break;
      case "fabricante":
        await this.getManufacturer();
        break;
      case "fornecedor":
        await this.getProvider();
        break;
      default:
        break;
    }
  };

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    });

    switch (this.state.select) {
      case "produtos":
        await this.getSupProduct();
        break;
      case "fabricante":
        await this.getManufacturer();
        break;
      case "fornecedor":
        await this.getProvider();
        break;
      default:
        break;
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
                  name="produtoSearch codigo"
                  style={{ width: "100%" }}
                  value={this.state.produtoSearch.codigo}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-fabricante-cabecalho-gerCad-search">
                <Input
                  placeholder="Nome do produto"
                  name="produtoSearch nome"
                  style={{ width: "100%" }}
                  value={this.state.produtoSearch.nome}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-fabricante-cabecalho-gerCad-search">
                <Input
                  placeholder="Digite o fabricante"
                  name="produtoSearch fabricante"
                  style={{ width: "100%" }}
                  value={this.state.produtoSearch.fabricante}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-data-cabecalho-gerCad-search">
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
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
                  name="fabricanteSearch nome"
                  style={{ width: "100%" }}
                  value={this.state.fabricanteSearch.nome}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-numSerie-cabecalho-estoque-search">
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
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
                  name="fornecedorSearch razaosocial"
                  style={{ width: "100%" }}
                  value={this.state.fornecedorSearch.razaosocial}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-cnpj-cabecalho-gerCad-search">
                <Input
                  placeholder="Digite o cnpj/ cpf"
                  name="fornecedorSearch cnpj"
                  style={{ width: "100%" }}
                  value={this.state.fornecedorSearch.cnpj}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-tel-cabecalho-gerCad-search">
                <Input
                  placeholder="(11) 92310-3432"
                  name="fornecedorSearch telefone"
                  style={{ width: "100%" }}
                  value={this.state.fornecedorSearch.telefone}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-dataFF-cabecalho-gerCad-search">
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  handleCancel = () => {
    this.setState({
      visibleFabricante: false,
      visibleProduto: false,
    });
  };

  ModalProduto = () => (
    <Modal
      title="Atualizar Produto"
      visible={this.state.visibleProduto}
      onOk={this.updateSupProduct}
      onCancel={this.handleCancel}
    >
      <Input
        value={this.state.product.name}
        name="product name"
        onChange={this.onChange}
      />
      <Select
        value={this.state.product.unit}
        style={{ width: "100%" }}
        onChange={(value) =>
          this.setState({ product: { ...this.state.product, unit: value } })
        }
      >
        <Option value="UNID">UNID</Option>
        <Option value="PÇ">PÇ</Option>
        <Option value="CX">CX</Option>
        <Option value="LT">LT</Option>
      </Select>
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onSearch={(name) => this.getManufacturer(name)}
        value={this.state.product.manufacturer.name}
        style={{ width: "100%" }}
        onChange={(value, props) =>
          this.setState({
            product: {
              ...this.state.product,
              manufacturerId: props.key,
              manufacturer: { ...this.state.product.manufacturer, name: value },
            },
          })
        }
      >
        {this.state.manufacturerList.map((manufacturer) => (
          <Option key={manufacturer.id} value={manufacturer.name}>
            {manufacturer.name}
          </Option>
        ))}
      </Select>
    </Modal>
  );

  ModalFabriante = () => (
    <Modal
      title="Atualizar Fabricante"
      visible={this.state.visibleFabricante}
      onOk={this.updateManufacturer}
      onCancel={this.handleCancel}
    >
      <Input
        value={this.state.manufacturer.name}
        name="manufacturer name"
        onChange={this.onChange}
      />
    </Modal>
  );

  redirect = () => {
    if (this.state.redirect) {
      this.props.redirectValueProvider(this.state.fornecedor);
      return (
        <Redirect
          push
          to={{
            pathname: "/logged/fornecedorSup/atializar",
            state: { from: this.props.location },
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
                avancado: !this.state.avancado,
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
            {this.state.products.map((product) => (
              <div className="div-cabecalho-estoque">
                <div className="cel-cod-cabecalho-gerCad">{product.id}</div>
                <div className="cel-produto-cabecalho-gerCad">
                  {product.name}
                </div>
                <div className="cel-fabricante-cabecalho-gerCad">
                  {product.manufacturer.name}
                </div>
                <div className="cel-data-cabecalho-gerCad">
                  {moment(product.createdAt).format("L")}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados">
                  <EditOutlined
                    onClick={() =>
                      this.setState({
                        visibleProduto: true,
                        product,
                      })
                    }
                  />
                </div>
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
            {this.state.fabricantes.map((fabricante) => (
              <div className="div-cabecalho-estoque">
                <div className="cel-fabricanteF-cabecalho-gerCad">
                  {fabricante.name}
                </div>
                <div className="cel-dataF-cabecalho-gerCad">
                  {moment(fabricante.createdAt).format("L")}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados">
                  <EditOutlined
                    onClick={() =>
                      this.setState({
                        visibleFabricante: true,
                        manufacturer: fabricante,
                      })
                    }
                  />
                </div>
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
            {this.state.fornecedores.map((fornecedor) => (
              <div className="div-cabecalho-estoque">
                <div className="cel-produto-cabecalho-gerCad">
                  {fornecedor.razaoSocial}
                </div>
                <div className="cel-fabricante-cabecalho-gerCad">
                  {fornecedor.cnpj}
                </div>
                <div className="cel-data-cabecalho-gerCad">?????</div>
                <div className="cel-data-cabecalho-gerCad">
                  {moment(fornecedor.createdAt).format("L")}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados">
                  <EditOutlined
                    onClick={() =>
                      this.setState({
                        fornecedor,
                        redirect: true,
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        <this.ModalFabriante />
        <this.ModalProduto />
        <this.redirect />
      </div>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ redirectValueProvider }, dispach);
}

function mapStateToProps(state) {
  return null;
}

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(GerenciarCadastrosSupPage);
