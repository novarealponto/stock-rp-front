import React, { Component } from "react";
import "./index.css";
import { Button, Input, InputNumber, Slider, DatePicker, Select } from "antd";
import { GetRelatVendas } from "../../../../services/produto";
import { PlusOutlined, PrinterOutlined } from "@ant-design/icons";
import moment from "moment";

import { GetSupProduct } from "../../../../services/Suprimentos/product";
import { CreatePDFSuprimento } from "../../../../services/Suprimentos/pdf";

const { Option } = Select;
class RelatorioSuprimentosContainer extends Component {
  state = {
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    valueDate: { start: "2019/01/01" },
    code: "",
    produto: "",
    fabricante: "",
    avancado: false,
    rows: [],
    index: -1,
    select: "estoque",
    min: undefined,
    max: undefined,
  };

  onChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({
      [name]: value,
    });

    await this.getSupProduct(value);
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado,
    });
  };

  componentDidMount = async () => {
    await this.getSupProduct();
  };

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    });

    // await this.getAllOs();
    await this.getSupProduct();
  };

  changePages = async (pages) => {
    await this.setState({
      page: pages,
    });
    await this.getSupProduct();
  };

  getSupProduct = async () => {
    const query = {
      filters: {
        supProduct: {
          specific: {
            code: this.state.code,
            name: this.state.produto,
            updatedAt: this.state.valueDate,
            amount: {
              start: this.state.min ? this.state.min : 0,
              end: this.state.max,
            },
          },
        },
        manufacturer: {
          specific: {
            name: this.state.fabricante,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
      compra: this.state.select === "compra",
    };
    const { status, data } = await GetSupProduct(query);

    if (status === 200)
      this.setState({ rows: data.rows, count: data.count, index: -1 });
  };

  createPDFSuprimento = async () => {
    const { select } = this.state;

    const query = {
      filters: {},
      page: 1,
      total: null,
      compra: select === "compra",
    };
    const { status, data } = await GetSupProduct(query);
    if (status === 200) await CreatePDFSuprimento(select, data.rows);
  };

  render() {
    return (
      <div className="div-card-RPerda">
        <div className="linhaTexto-RPerda">
          <h1 className="h1-RPerda">Relatório de Suprimentos</h1>
        </div>

        <div className="div-linha">
          <Select
            value={this.state.select}
            style={{ width: "20%" }}
            onChange={async (select) => {
              await this.setState({ select });
              await this.getSupProduct();
            }}
          >
            <Option value="estoque">ESTOQUE</Option>
            <Option value="compra">COMPRA</Option>
          </Select>

          <div>
            <PrinterOutlined
              className="icon-printer"
              onClick={this.createPDFSuprimento}
            />
            <Button
              onClick={() => this.setState({ avancado: !this.state.avancado })}
            >
              {this.state.avancado ? "ocultar" : "Avançado"}
            </Button>
          </div>
        </div>

        {this.state.avancado && (
          <>
            <div className="div-linha-avancado">
              <div className="div-cel-search-code">
                <label>Código: </label>
                <Input
                  onChange={this.onChange}
                  name="code"
                  value={this.state.code}
                  placeholder="Código"
                />
              </div>
              <div className="div-cel-search-product">
                <label>Produto: </label>
                <Input
                  onChange={this.onChange}
                  name="produto"
                  value={this.state.produto}
                  placeholder="Produto"
                />
              </div>
              <div className="div-cel-search-fabricante">
                <label>Fabricante: </label>
                <Input
                  onChange={this.onChange}
                  name="fabricante"
                  value={this.state.fabricante}
                  placeholder="Fabricante"
                />
              </div>
            </div>
            <div className="div-linha-avancado">
              <div className="div-cel-search-qtd">
                <label>Qtd. Total:</label>
                <InputNumber
                  value={this.state.min}
                  placeholder="min"
                  onChange={async (min) => {
                    await this.setState({ min });
                    await this.getSupProduct();
                  }}
                />
                <Slider
                  style={{ width: "50%" }}
                  range
                  value={[this.state.min, this.state.max]}
                  onChange={(e) => this.setState({ min: e[0], max: e[1] })}
                  max={this.state.max ? this.state.max + 100 : 100}
                  min={0}
                  onAfterChange={async () => {
                    await this.getSupProduct();
                  }}
                />
                <InputNumber
                  value={this.state.max}
                  onChange={async (max) => {
                    await this.setState({ max });
                    await this.getSupProduct();
                  }}
                  placeholder="max"
                />
              </div>
              <div className="div-cel-search-fabricante">
                <label>Data: </label>
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  style={{ width: "100%" }}
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
            </div>
          </>
        )}

        <div
          className="div-linha"
          style={{ backgroundColor: "#f5f5f5", marginTop: "20px" }}
        >
          <div className="div-cabecalho-cod">
            <strong>Código</strong>
          </div>
          <div className="div-cabecalho-prod">
            <strong>Produto</strong>
          </div>
          <div className="div-cabecalho-fabr">
            <strong>Fabricante</strong>
          </div>
          <div className="div-cabecalho-qtd">
            <strong>Qtd. total</strong>
          </div>
          <div className="div-cabecalho-data">
            <strong>Data Ultima Atualiz.</strong>
          </div>
        </div>

        {this.state.rows.map((row) => (
          <div
            className="div-linha"
            style={
              row.minimumQuantity >= row.amount
                ? { backgroundColor: "rgba(255, 0, 0, 0.4)" }
                : null
            }
          >
            <div className="div-cabecalho-cod">
              <label>{row.code}</label>
            </div>
            <div className="div-cabecalho-prod">
              <label>{row.name}</label>
            </div>
            <div className="div-cabecalho-fabr">
              <label>{row.manufacturer.name}</label>
            </div>
            <div className="div-cabecalho-qtd">
              <label>{row.amount}</label>
            </div>
            <div className="div-cabecalho-data">
              <label>{moment(row.updatedAt).format("ll")}</label>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default RelatorioSuprimentosContainer;
