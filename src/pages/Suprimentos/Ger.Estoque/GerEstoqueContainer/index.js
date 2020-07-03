import React, { Component } from "react";
import "./index.css";
import { Select, Button, Input, Spin, InputNumber, DatePicker } from "antd";
import { split } from "ramda";
import { QuestionCircleOutlined, PrinterOutlined } from "@ant-design/icons";
import moment from "moment";

import { GetSupProduct } from "../../../../services/Suprimentos/product";
import { GetEntrance } from "../../../../services/Suprimentos/entrada";
import { GetOut } from "../../../../services/Suprimentos/saida";
import { CreatePDFSuprimento } from "../../../../services/Suprimentos/pdf";

const { Option } = Select;

class GerenciarEstoqueSupPage extends Component {
  state = {
    avancado: true,
    select: "estoque",
    search: "",
    quant: 1,
    loading: false,
    page: 1,
    count: 1,
    show: 1,
    total: 10,
    index: -1,
    products: [],
    entradas: [],
    saidas: [],
    produtoSearch: {
      nome: "",
    },
    entradaSearch: {
      data: "",
      produto: "",
      resp: "",
    },
    saidaSearch: {
      data: "",
      produto: "",
      solicitante: "",
      resp: "",
    },
    valueDate: { start: "2019/01/01" },
  };

  componentDidMount = async () => {
    await this.getSupProduct();
  };

  getSupProduct = async () => {
    const query = {
      filters: {
        supProduct: {
          specific: {
            name: this.state.produtoSearch.nome,
            // code: this.state.produtoSearch.codigo
            updatedAt: this.state.valueDate,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetSupProduct(query);

    if (status === 200)
      this.setState({ products: data.rows, count: data.count, index: -1 });
  };

  getEntrance = async () => {
    const query = {
      filters: {
        supEntrance: {
          specific: {
            responsibleUser: this.state.entradaSearch.resp,
            createdAt: this.state.valueDate,
          },
        },
        supProduct: {
          specific: {
            name: this.state.entradaSearch.produto,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetEntrance(query);

    if (status === 200)
      this.setState({ entradas: data.rows, count: data.count, index: -1 });
  };

  getOut = async () => {
    const query = {
      filters: {
        supOut: {
          specific: {
            solicitante: this.state.saidaSearch.solicitante,
            responsibleUser: this.state.saidaSearch.resp,
            createdAt: this.state.valueDate,
          },
        },
        supProduct: {
          specific: {
            name: this.state.saidaSearch.produto,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetOut(query);

    if (status === 200)
      this.setState({ saidas: data.rows, count: data.count, index: -1 });
  };

  changePages = async (pages) => {
    await this.setState({
      page: pages,
    });

    switch (this.state.select) {
      case "estoque":
        await this.getSupProduct();
        break;
      case "entrada":
        await this.getEntrance();
        break;
      case "saida":
        await this.getOut();
        break;
      default:
        break;
    }
  };

  onChange = async (e) => {
    const { name, value } = e.target;

    const nameArry = split(" ", name);

    await this.setState({
      [nameArry[0]]: { ...this.state[nameArry[0]], [nameArry[1]]: value },
    });

    switch (this.state.select) {
      case "estoque":
        await this.getSupProduct();
        break;
      case "entrada":
        await this.getEntrance();
        break;
      case "saida":
        await this.getOut();
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
      case "estoque":
        await this.getSupProduct();
        break;
      case "entrada":
        await this.getEntrance();
        break;
      case "saida":
        await this.getOut();
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

  onChangeQuant = (value) => {
    this.setState({
      quant: value,
    });
  };

  Search = () => {
    switch (this.state.select) {
      case "estoque":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-produto-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  style={{ width: "100%" }}
                  name="produtoSearch nome"
                  value={this.state.produtoSearch.nome}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-quant-cabecalho-gerEst-search">
                {/* <InputNumber
                  placeholder="Quant"
                  value={this.state.quant}
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChangeQuant}
                /> */}
              </div>
              <div className="cel-data-cabecalho-gerEst-search">
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
      case "entrada":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-data-cabecalho-gerEst-search">
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
              <div className="cel-produtoEnt-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  style={{ width: "100%" }}
                  name="entradaSearch produto"
                  value={this.state.entradaSearch.produto}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-quant-cabecalho-gerEst-search">
                {/* <InputNumber
                  placeholder="Quant"
                  value={this.state.quant}
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChangeQuant}
                /> */}
              </div>
              <div className="cel-user-cabecalho-gerEst-search">
                <Input
                  placeholder="Usuário"
                  style={{ width: "100%" }}
                  name="entradaSearch resp"
                  value={this.state.entradaSearch.resp}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        );
      case "saida":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-data-cabecalho-gerEst-search">
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
              <div className="cel-produtoSai-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  style={{ width: "100%" }}
                  name="saidaSearch produto"
                  value={this.state.saidaSearch.produto}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-solicitante-cabecalho-gerEst-search">
                <Input
                  placeholder="Solicitante"
                  style={{ width: "100%" }}
                  name="saidaSearch solicitante"
                  value={this.state.saidaSearch.solicitante}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-user-cabecalho-gerEst-search">
                <Input
                  placeholder="Usuário"
                  style={{ width: "100%" }}
                  name="saidaSearch resp"
                  value={this.state.saidaSearch.resp}
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
      case "estoque":
        await this.getSupProduct();
        break;
      case "entrada":
        await this.getEntrance();
        break;
      case "saida":
        await this.getOut();
        break;
      default:
        break;
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <div className="div-card-Gentrada">
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Gerenciar estoque (SUPRIMENTOS)</h1>
        </div>
        <div className="div-select-emprestimo">
          <Select
            value={this.state.select}
            style={{ width: "20%" }}
            onChange={this.onChangeSelect}
          >
            <Option value="estoque">ESTOQUE</Option>
            <Option value="entrada">ENTRADA</Option>
            <Option value="saida">SAÍDA</Option>
          </Select>

          <div className="div-block-printer">
            {(this.state.select === "estoque" ||
              this.state.select === "entrada") && (
              <PrinterOutlined
                className="icon-printer"
                onClick={async () =>
                  await CreatePDFSuprimento(this.state.select, [])
                }
              />
            )}
            <Button
              type="primary"
              className="button"
              onClick={async () => {
                await this.setState({
                  search: !this.state.search,
                  avancado: !this.state.avancado,
                });

                switch (this.state.select) {
                  case "estoque":
                    await this.getSupProduct();
                    break;
                  case "entrada":
                    await this.getEntrance();
                    break;
                  case "saida":
                    await this.getOut();
                    break;
                  default:
                    break;
                }
              }}
            >
              {this.state.avancado ? "Avançado" : "Ocultar"}
            </Button>
          </div>
        </div>

        {this.state.search && <this.Search />}

        {this.state.select === "estoque" && (
          <div className="div-main-emprestimo">
            <div
              className="div-cabecalho-estoque"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <div className="cel-produto-cabecalho-gerEst">Produto</div>
              <div className="cel-quant-cabecalho-gerEst">Quant. total</div>
              <div className="cel-data-cabecalho-gerEst">Data atualização</div>

              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            <div className="div-block-table-gerEst">
              {this.state.products.map((product, idx) => (
                <div
                  className="div-block-row-table-gerEst"
                  style={{
                    color:
                      product.minimumQuantity > product.amount ? "red" : null,
                  }}
                >
                  {console.log(product)}
                  <div className="div-cabecalhoLinha-gerEst">
                    <div className="cel-produto-cabecalho-gerEst">
                      {product.name}
                    </div>
                    <div className="cel-quant-cabecalho-gerEst">
                      {`${product.amount} ${product.unit}`}
                    </div>
                    <div className="cel-data-cabecalho-gerEst">
                      {moment(product.updatedAt).format("L")}
                    </div>

                    <div className="cel-acao-cabecalho-gerCad-reservados">
                      <QuestionCircleOutlined
                        onClick={() =>
                          this.setState({
                            index: this.state.index === idx ? -1 : idx,
                          })
                        }
                      />
                    </div>
                  </div>
                  {this.state.index === idx && (
                    <div className="div-mais-gerEst">
                      <div className="div-linhaMais-gerEst">
                        <div className="div-razao-mais-gerEst">
                          Razão social
                        </div>
                        <div className="div-quant-mais-gerEst">Quant.</div>
                        <div className="div-data-mais-gerEst">Data</div>
                      </div>
                      <div className="div-linhaMaisInfoMap-gerEst">
                        {product.supEntrances.map((supEntrance) => (
                          <div className="div-linhaMap-gerEst">
                            <div className="div-razao-mais-gerEst">
                              {supEntrance.supProvider.razaoSocial}
                            </div>
                            <div className="div-quant-mais-gerEst">
                              {supEntrance.amount}
                            </div>
                            <div className="div-data-mais-gerEst">
                              {moment(supEntrance.createdAt).format("L")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div
                    className="div-separate-Gentrada"
                    style={{ width: "100%" }}
                  />
                </div>
              ))}
            </div>
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "entrada" && (
          <div className="div-main-emprestimo">
            <div
              className="div-cabecalho-estoque"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <div className="cel-data-cabecalho-gerEst">Data</div>
              <div className="cel-produto-cabecalho-gerEst">Produto</div>
              <div className="cel-quantEnt-cabecalho-gerEst">Quant</div>
              <div className="cel-data-cabecalho-gerEst">Usuário</div>

              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className="div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            <div className="div-block-table-gerEst">
              {this.state.entradas.map((entrada, idx) => (
                <div className="div-block-row-table-gerEst">
                  <div className="div-cabecalhoLinha-gerEst">
                    <div className="cel-data-cabecalho-gerEst">
                      {moment(entrada.createdAt).format("L")}
                    </div>
                    <div className="cel-produto-cabecalho-gerEst">
                      {entrada.supProduct.name}
                    </div>
                    <div className="cel-quantEnt-cabecalho-gerEst">
                      {entrada.amount}
                    </div>
                    <div className="cel-data-cabecalho-gerEst">
                      {entrada.responsibleUser}
                    </div>

                    <div className="cel-acao-cabecalho-gerCad-reservados">
                      <QuestionCircleOutlined
                        onClick={() =>
                          this.setState({
                            index: this.state.index === idx ? -1 : idx,
                          })
                        }
                      />
                    </div>
                  </div>
                  {this.state.index === idx && (
                    <div className="div-mais-gerEst">
                      <div className="div-linhaMais-gerEst">
                        <div className="div-razao-mais-gerEst">
                          Razão social
                        </div>
                        <div className="div-preco-mais-gerEst">Preço unid.</div>
                        <div className="div-total-mais-gerEst">Total</div>
                      </div>
                      <div className="div-linhaMaisInfo-gerEst">
                        <div className="div-razao-mais-gerEst">
                          {entrada.supProvider.razaoSocial}
                        </div>
                        <div className="div-preco-mais-gerEst">
                          {entrada.priceUnit}
                        </div>
                        <div className="div-total-mais-gerEst">
                          {entrada.total}
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="div-separate-Gentrada"
                    style={{ width: "100%" }}
                  />
                </div>
              ))}
            </div>
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "saida" && (
          <div className="div-main-emprestimo">
            <div
              className="div-cabecalho-estoque"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <div className="cel-data-cabecalho-gerEst">Data</div>
              <div className="cel-produtoSai-cabecalho-gerEst">Produto</div>
              <div className="cel-solicitante-cabecalho-gerEst">
                Solicitante
              </div>
              <div className="cel-solicitante-cabecalho-gerEst">
                Usuário liber.
              </div>

              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            <div className="div-block-table-gerEst">
              {this.state.saidas.map((saida, idx) => (
                <div className="div-block-row-table-gerEst">
                  <div className="div-cabecalhoLinha-gerEst">
                    <div className="cel-data-cabecalho-gerEst">
                      {moment(saida.createdAt).format("L")}
                    </div>
                    <div className="cel-produtoSai-cabecalho-gerEst">
                      {saida.supProduct.name}
                    </div>
                    <div className="cel-solicitante-cabecalho-gerEst">
                      {saida.solicitante}
                    </div>
                    <div className="cel-solicitante-cabecalho-gerEst">
                      {saida.responsibleUser}
                    </div>

                    <div className="cel-acao-cabecalho-gerCad-reservados">
                      <QuestionCircleOutlined
                        onClick={() =>
                          this.setState({
                            index: this.state.index === idx ? -1 : idx,
                          })
                        }
                      />
                    </div>
                  </div>
                  {this.state.index === idx && (
                    <div className="div-mais-gerEst">
                      <div className="div-linhaMais-gerEst">
                        <div className="div-email-mais-gerEst">
                          Email Solicitante
                        </div>
                        <div className="div-email-mais-gerEst">
                          Email responsável
                        </div>
                        <div className="div-quant-mais-gerEst">
                          Quant. saída
                        </div>
                      </div>
                      <div className="div-linhaMaisInfo-gerEst">
                        <div className="div-email-mais-gerEst">
                          {saida.emailSolic}
                        </div>
                        <div className="div-email-mais-gerEst">
                          {saida.emailResp}
                        </div>
                        <div className="div-quant-mais-gerEst">
                          {saida.amount}
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="div-separate-Gentrada"
                    style={{ width: "100%" }}
                  />
                </div>
              ))}
            </div>
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GerenciarEstoqueSupPage;
