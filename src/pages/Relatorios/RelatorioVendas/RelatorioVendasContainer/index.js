import React, { Component } from "react";
import "./index.css";
import { Button, Input, DatePicker } from "antd";
import { GetRelatVendas } from "../../../../services/produto";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

class RelatorioVendasContainer extends Component {
  state = {
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    valueDate: { start: "2019/01/01" },
    produto: "",
    avancado: false,
    rows: [],
    index: -1,
  };

  onChange = async (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });

    await this.getRelatVendas(value);
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado,
    });
  };

  componentDidMount = async () => {
    await this.getRelatVendas();
  };

  getRelatVendas = async (name) => {
    const query = {
      filters: {
        product: {
          specific: {
            name,
          },
        },

        freeMarketParts: {
          specific: {
            createdAt: this.state.valueDate,
          },
        },
        osParts: {
          specific: {
            deletedAt: this.state.valueDate,
          },
        },
        technicianReserveParts: {
          specific: {
            createdAt: this.state.valueDate,
          },
        },
        kitOut: {
          specific: {
            updatedAt: this.state.valueDate,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetRelatVendas(query);

    if (status === 200)
      this.setState({
        rows: data.rows,
        page: data.page,
        count: data.count,
        show: data.show,
      });
  };

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    });

    // await this.getAllOs();
    await this.getRelatVendas();
  };

  changePages = async (pages) => {
    await this.setState({
      page: pages,
    });
    await this.getRelatVendas();
  };

  Pages = () => (
    <div className="footer-Gentrada-button">
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

  render() {
    return (
      <div className="div-card-RPerda">
        <div className="linhaTexto-RPerda">
          <h1 className="h1-RPerda">Relatório de vendas</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-produto-relVendas">
                <div className="div-text-Os">Produto:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="produto"
                  value={this.state.produto}
                  placeholder="Digite o nome do produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-data-relVendas">
                <div className="div-text-Os">Data:</div>
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
        ) : (
          <div className="div-avancado-Rtecnico">
            <Button type="primary" className="button" onClick={this.avancado}>
              Avançado
            </Button>
          </div>
        )}

        <div className="div-cabecalho-Gentrada">
          <div className="cel-produto-cabecalho-Gentrada">Produto</div>
          <div className="cel-quant-cabecalho-Gentrada">Qnt.</div>
          <div className="cel-usuario-cabecalho-Gentrada">Usuário</div>
          <div className="cel-data-cabecalho-Gentrada">Data atualização</div>
          <div className="cel-edit-cabecalho-Gentrada" />
        </div>

        {this.state.rows.map((row, index) => (
          <>
            <div className="div-100-Gentrada">
              <div className="div-lines-Gentrada">
                <div className="cel-produto-cabecalho-Gentrada">
                  <label className="div-table-label-cel-Gentrada">
                    {row.name}
                  </label>
                </div>
                <div className="cel-quant-cabecalho-Gentrada">
                  <label className="div-table-label-cel-Gentrada">
                    {row.quantidadeSaidaTotal}
                  </label>
                </div>
                <div className="cel-usuario-cabecalho-Gentrada">
                  <label className="div-table-label-cel-Gentrada">-</label>
                </div>
                <div className="cel-data-cabecalho-Gentrada">
                  <label className="div-table-label-cel-Gentrada">
                    {row.updatedAt ? moment(row.updatedAt).format("LLL") : null}
                  </label>
                </div>
                <div className="cel-edit-cabecalho-Gentrada">
                  <PlusOutlined
                    onClick={() =>
                      this.setState({
                        index: this.state.index === index ? -1 : index,
                      })
                    }
                  />
                </div>
              </div>
              <div className=" div-separate1-Gentrada" />
            </div>

            {this.state.index === index && (
              <div className="div-main-mais">
                <div className="div-mais-ROs">
                  <div className="div-normal-mais-RVendas">
                    <div className="div-relatVendas-mais-status">Status</div>
                    <div className="div-relatVendas-mais-total">Total</div>
                    <div className="div-relatVendas-mais-updated">
                      Ultima saída
                    </div>
                  </div>
                </div>
                {[
                  {
                    status: "E-Commerce",
                    total: row.saidaEComerce,
                    saída: row.createdAtEComerce,
                  },
                  {
                    status: "OS",
                    total: row.saidaOs,
                    saída: row.createdAtOs,
                  },
                  {
                    status: "Interno",
                    total: row.saidaInterno,
                    saída: row.createdAtInterno,
                  },
                  {
                    status: "Kit",
                    total: row.saidaKit,
                    saída: row.createdAtKit,
                  },
                ].map((item) => (
                  <div className="div-normal-mais-ROs">
                    <div className="div-relatVendas-mais-status-RV">
                      {item.status}
                    </div>
                    <div className="div-relatVendas-mais-total-RV">
                      {item.total}
                    </div>
                    <div className="div-relatVendas-mais-updated-RV">
                      {item.saída ? moment(item.saída).format("LLL") : "-"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}

        <this.Pages />
      </div>
    );
  }
}

export default RelatorioVendasContainer;
