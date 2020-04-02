import React, { Component } from "react";
import "./index.css";
import { Select, Button, Input, Spin, InputNumber } from "antd";

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
    total: 10
  };

  changePages = async pages => {
    await this.setState({
      page: pages
    });

    switch (this.state.select) {
      case "estoque":
      case "entrada":
        // await this.getEprestimo();
        break;
      case "saida":
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

  onChangeQuant = value => {
    this.setState({
      quant: value
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
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-quant-cabecalho-gerEst-search">
                <InputNumber
                  placeholder="Quant"
                  value={this.state.quant}
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChangeQuant}
                />
              </div>
              <div className="cel-data-cabecalho-gerEst-search">
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
      case "entrada":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-data-cabecalho-gerEst-search">
                <Input
                  placeholder="20/11/2020"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-produtoEnt-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-quant-cabecalho-gerEst-search">
                <InputNumber
                  placeholder="Quant"
                  value={this.state.quant}
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChangeQuant}
                />
              </div>
              <div className="cel-user-cabecalho-gerEst-search">
                <Input
                  placeholder="Usuário"
                  name="serialNumberSearch"
                  style={{ width: "100%" }}
                  // value={serialNumberSearch}
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
                <Input
                  placeholder="20/11/2020"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-produtoSai-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-solicitante-cabecalho-gerEst-search">
                <Input
                  placeholder="Solicitante"
                  name="nomeProdutoSearch"
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-user-cabecalho-gerEst-search">
                <Input
                  placeholder="Usuário"
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
      case "estoque":
      case "entrada":
        // await this.getEprestimo();
        break;
      case "saida":
        // await this.getAllEquips();
        break;
      default:
    }

    this.setState({
      loading: false
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
          <Button
            type="primary"
            className="button"
            onClick={async () => {
              await this.setState({
                search: !this.state.search,
                avancado: !this.state.avancado
              });

              switch (this.state.select) {
                case "estoque":
                case "entrada":
                  // await this.getEprestimo();
                  break;
                case "saida":
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

        {this.state.select === "estoque" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
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
            {/* {this.state.products.map(product => (
              <div className="div-cabecalho-estoque">
                <div className="cel-cod-cabecalho-gerCad">{product.id}</div>
                <div className="cel-produto-cabecalho-gerCad">
                  {product.name}
                </div>
                <div className="cel-fabricante-cabecalho-gerCad">
                  {product.manufacturer.name}
                </div>
                <div className="cel-data-cabecalho-gerCad">
                  {product.createdAt}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados">
                  <EditOutlined
                    onClick={() =>
                      this.setState({
                        visibleProduto: true,
                        product
                      })
                    }
                  />
                </div>
              </div>
            ))} */}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "entrada" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
              <div className="cel-data-cabecalho-gerEst">Data</div>
              <div className="cel-produto-cabecalho-gerEst">Produto</div>
              <div className="cel-quantEnt-cabecalho-gerEst">Quant</div>
              <div className="cel-data-cabecalho-gerEst">Usuário</div>

              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            {/* {this.state.products.map(product => (
              <div className="div-cabecalho-estoque">
                <div className="cel-cod-cabecalho-gerCad">{product.id}</div>
                <div className="cel-produto-cabecalho-gerCad">
                  {product.name}
                </div>
                <div className="cel-fabricante-cabecalho-gerCad">
                  {product.manufacturer.name}
                </div>
                <div className="cel-data-cabecalho-gerCad">
                  {product.createdAt}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados">
                  <EditOutlined
                    onClick={() =>
                      this.setState({
                        visibleProduto: true,
                        product
                      })
                    }
                  />
                </div>
              </div>
            ))} */}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "saida" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
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
            {/* {this.state.products.map(product => (
              <div className="div-cabecalho-estoque">
                <div className="cel-cod-cabecalho-gerCad">{product.id}</div>
                <div className="cel-produto-cabecalho-gerCad">
                  {product.name}
                </div>
                <div className="cel-fabricante-cabecalho-gerCad">
                  {product.manufacturer.name}
                </div>
                <div className="cel-data-cabecalho-gerCad">
                  {product.createdAt}
                </div>
                <div className="cel-acao-cabecalho-gerCad-reservados">
                  <EditOutlined
                    onClick={() =>
                      this.setState({
                        visibleProduto: true,
                        product
                      })
                    }
                  />
                </div>
              </div>
            ))} */}
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
