import React, { Component } from 'react';
import './index.css';
import { Button, Spin, Input, Modal } from 'antd';
import { getProdutos, CreatePDF } from '../../../../services/produto';
import { PrinterOutlined } from '@ant-design/icons';

class RelatorioMapContainer extends Component {
  state = {
    avancado: false,
    loading: false,
    produto: '',
    marca: '',
    corredor: '',
    coluna: '',
    prateleira: '',
    gaveta: '',
    page: 1,
    count: 1,
    show: 1,
    total: 10,
    modalImprimir: false,
    products: []
  };

  componentDidMount = async () => {
    await this.getAllProdutos();
  };

  getAllProdutos = async () => {
    const query = {
      filters: {
        product: {
          specific: {
            name: this.state.produto,
            corredor: this.state.corredor,
            coluna: this.state.coluna,
            prateleira: this.state.prateleira,
            gaveta: this.state.gaveta
          }
        },
        mark: {
          specific: {
            mark: this.state.marca
          }
        },
        equipType: {
          specific: {
            type: ''
          }
        }
      },
      page: this.state.page,
      total: 10
    };

    await getProdutos(query).then(resposta =>
      this.setState({
        products: resposta.data.rows,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show
      })
    );
  };

  openModal = () => {
    this.setState({
      modalImprimir: true
    });
  };

  onChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });

    await this.getAllProdutos();
  };

  onCancel = () => {
    this.setState({
      modalImprimir: false
    });
  };

  changePages = async pages => {
    await this.setState({
      page: pages
    });
    await this.getAllProdutos();
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
      {this.state.page + 2 < this.state.count / this.state.total && this.state.page < 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 3)}
        >
          {this.state.page + 3}
        </Button>
      ) : null}
      {this.state.page + 3 < this.state.count / this.state.total && this.state.page < 2 ? (
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

  createPDF = async () => {
    const query = {
      filters: {
        product: {
          specific: {
            name: this.state.produto,
            corredor: this.state.corredor,
            coluna: this.state.coluna,
            prateleira: this.state.prateleira,
            gaveta: this.state.gaveta
          }
        },
        mark: {
          specific: {
            mark: this.state.marca
          }
        },
        equipType: {
          specific: {
            type: ''
          }
        }
      },
      // total: 400,
      total: undefined
    };

    const { status, data } = await getProdutos(query);
    if (status === 200) {
      await CreatePDF(data.rows);
    }
  };

  modalImprimir = () => (
    <Modal
      title="Confirmar impressão"
      visible={this.state.modalImprimir}
      onOk={this.createPDF}
      onCancel={this.onCancel}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <h3>Deseja imprimir?</h3>
    </Modal>
  );

  render() {
    return (
      <div className="div-card-RPerda">
        <div className="linhaTexto-RPerda">
          <h1 className="h1-RPerda">Relatório de mapeamento</h1>
        </div>
        <this.modalImprimir />
        {this.state.avancado ? (
          <div className="div-avancado-RMap">
            <div className="div-linha-avancado-RMap">
              <PrinterOutlined
                id="imprimir"
                style={{ fontSize: '32px' }}
                onClick={this.openModal}
              />
              <Button
                type="primary"
                className="button"
                onClick={() => this.setState({ avancado: !this.state.avancado })}
              >
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-sku-RMap">
                <div className="div-text-Os">SKU:</div>
                <Input
                  disabled
                  className="input-100"
                  style={{ width: '100%' }}
                  name="sku"
                  value={this.state.sku}
                  placeholder="123456"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-produto-RMap">
                <div className="div-text-Os">Produto:</div>
                <Input
                  className="input-100"
                  style={{ width: '100%' }}
                  name="produto"
                  value={this.state.produto}
                  placeholder="Digite o produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-marca-RMap">
                <div className="div-text-Os">Marca:</div>
                <Input
                  className="input-100"
                  style={{ width: '100%' }}
                  name="marca"
                  value={this.state.marca}
                  placeholder="Digite a marca"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-map-RMap">
                <div className="div-text-Os">Corredor:</div>
                <Input
                  className="input-100"
                  style={{ width: '100%' }}
                  name="corredor"
                  value={this.state.corredor}
                  placeholder="Digite o corredor"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
              <div className="div-map-RMap">
                <div className="div-text-Os">Coluna:</div>
                <Input
                  className="input-100"
                  style={{ width: '100%' }}
                  name="coluna"
                  value={this.state.coluna}
                  placeholder="Digite a coluna"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="div-linha1-avancado-RMap">
            <PrinterOutlined id="imprimir" style={{ fontSize: '32px' }} onClick={this.openModal} />
            <Button
              type="primary"
              className="button"
              onClick={() => this.setState({ avancado: !this.state.avancado })}
            >
              Avançado
            </Button>
          </div>
        )}
        <div className="div-cabecalho-RPerda">
          <div className="cel-map-cabecalho-RMap">SKU</div>
          <div className="cel-produto-cabecalho-RMap">Produto</div>
          <div className="cel-marca-cabecalho-RMap">Marca</div>
          <div className="cel-map-cabecalho-RMap">Corredor</div>
          <div className="cel-map-cabecalho-RMap">Coluna</div>
          <div className="cel-map-cabecalho-RMap">Prateleira</div>
          <div className="cel-map-cabecalho-RMap">Gaveta</div>
        </div>
        <div className=" div-separate-Gentrada" />
        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : null}
        {this.state.products.map(product => (
          <div className="div-main-cabecalho-RMap">
            <div className="div-cabecalhoLinha-RMap">
              <div className="cel-map-cabecalho-RMap">{product.sku}</div>
              <div className="cel-produto-cabecalho-RMap">{product.name}</div>
              <div className="cel-marca-cabecalho-RMap">{product.mark}</div>
              <div className="cel-map-cabecalho-RMap">{product.corredor}</div>
              <div className="cel-map-cabecalho-RMap">{product.coluna}</div>
              <div className="cel-map-cabecalho-RMap">{product.prateleira}</div>
              <div className="cel-map-cabecalho-RMap">{product.gaveta}</div>
            </div>
            <div className="div-separate-RMap" />
          </div>
        ))}
        <div className="footer-ROs">
          <this.Pages />
        </div>
      </div>
    );
  }
}

export default RelatorioMapContainer;
