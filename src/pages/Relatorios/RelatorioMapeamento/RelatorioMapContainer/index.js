import React, { Component } from "react";
import "./index.css";
import { Button, Spin, Input, Icon, Modal } from "antd";

class RelatorioMapContainer extends Component {
  state = {
    avancado: false,
    loading: false,
    sku: "",
    produto: "",
    marca: "",
    corredor: "",
    coluna: "",
    modalImprimir: false
  };

  openModal = () => {
    this.setState({
      modalImprimir: true
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOk = () => {
    this.setState({
      modalImprimir: false
    });
  };

  modalImprimir = () => (
    <Modal
      title="Confirmar impressão"
      visible={this.state.modalImprimir}
      onOk={this.onOk}
      onCancel={this.onOk}
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
              <Icon
                id="imprimir"
                style={{ fontSize: "32px" }}
                onClick={this.openModal}
                type="printer"
              />
              <Button
                type="primary"
                className="button"
                onClick={() =>
                  this.setState({ avancado: !this.state.avancado })
                }
              >
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-sku-RMap">
                <div className="div-text-Os">SKU:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
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
            <Icon
              id="imprimir"
              style={{ fontSize: "32px" }}
              type="printer"
              onClick={this.openModal}
            />
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

        <div className=" div-separate-ROs" />
        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : null
        // this.test()
        }
      </div>
    );
  }
}

export default RelatorioMapContainer;
