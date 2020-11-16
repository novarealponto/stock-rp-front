import React, { Component } from 'react';
import './index.css';
import { PrinterOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Slider, DatePicker } from 'antd';

class RelatorioComprasContainer extends Component {
  state = {
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    valueDate: { start: '2019/01/01' },
    code: '',
    produto: '',
    fabricante: '',
    avancado: false,
    rows: [],
    index: -1,
    min: undefined,
    max: undefined
  };

  onChange = async e => {
    const { name, value } = e.target;
    await this.setState({
      [name]: value
    });

    // await this.getSupProduct(value);
  };

  render() {
    return (
      <div className="div-card-emprestimo-report">
        <div className="title-emprestimo-report">
          <h1 className="h1-Gentrada">Relatório compras</h1>
        </div>

        <div className="div-linha-RCompras">
          <div>
            <PrinterOutlined
              className="icon-printer"
              // onClick={this.createPDFSuprimento}
            />
            <Button onClick={() => this.setState({ avancado: !this.state.avancado })}>
              {this.state.avancado ? 'Ocultar' : 'Avançado'}
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
                  onChange={async min => {
                    await this.setState({ min });
                    await this.getSupProduct();
                  }}
                />
                <Slider
                  style={{ width: '50%' }}
                  range
                  value={[this.state.min, this.state.max]}
                  onChange={e => this.setState({ min: e[0], max: e[1] })}
                  max={this.state.max ? this.state.max + 100 : 100}
                  min={0}
                  onAfterChange={async () => {
                    await this.getSupProduct();
                  }}
                />
                <InputNumber
                  value={this.state.max}
                  onChange={async max => {
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
                  style={{ width: '100%' }}
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
            </div>
          </>
        )}

        <div className="div-relatorio-compras">
          <div className="div-cabecalho-cod">Código</div>
          <div className="div-cabecalho-prod">Produto</div>
          <div className="div-cabecalho-fabr">Fabricante</div>
          <div className="div-cabecalho-qtd">Qtd. total</div>
          <div className="div-cabecalho-data">Data Ultima Atualiz.</div>
        </div>
        <div className="div-separate-RVendas" />
      </div>
    );
  }
}

export default RelatorioComprasContainer;
