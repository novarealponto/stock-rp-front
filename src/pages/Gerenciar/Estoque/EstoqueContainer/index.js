import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import * as R from "ramda";
import {
  Spin,
  Button,
  Input,
  Select,
  Modal,
  InputNumber,
  message,
  Tabs
} from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { stock, UpdatteProductBase } from "../../../../services/estoque";

import { getAllEquipsService, deteleEquip } from "../../../../services/equip";
import { getSerial } from "../../../../services/serialNumber";

const { Option } = Select,
  { TextArea } = Input,
  { TabPane } = Tabs;

class Estoque extends Component {
  state = {
    numeroSerie: "",
    produto: "",
    numeroSerieModal: [],
    tipo: "",
    fabricante: "",
    serialNumberDelete: "",
    serialNumberDeleteId: "",
    quantModal: 1,
    estoqueBase: "TODOS",
    avancado: false,
    loading: false,
    modalStatus: false,
    modaldelete: false,
    estoque: {
      rows: []
    },
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    serialNumbers: [],
    serialNumber: "",
    line: {}
  };

  changePages = pages => {
    this.setState(
      {
        page: pages
      },
      () => {
        this.getStock();
      }
    );
  };

  onChangeQuant = value => {
    this.setState({
      quantModal: value
    });
  };

  showModalStatus = line => {
    this.setState({
      modalStatus: true,
      line
    });
  };

  onChangeNumeroModal = async e => {
    await this.setState({
      numeroSerieModal: e.target.value
    });

    const teste = this.state.numeroSerieModal.split(/\n/);

    if (
      /\n/.test(
        this.state.numeroSerieModal[this.state.numeroSerieModal.length - 1]
      )
    ) {
      let count = 0;

      // eslint-disable-next-line array-callback-return
      teste.map(valor => {
        if (valor === teste[teste.length - 2]) count++;
      });

      const resp = await getSerial(teste[teste.length - 2]);

      if (resp.data) count++;

      if (count > 1) {
        message.error("Número de série já registrado");

        teste.splice(teste.length - 2, 1);

        const testeArray = teste.toString();

        this.setState({
          numeroSerieModal: testeArray.replace(/,/gi, "\n")
        });
      }
    }
  };

  onChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value,
      page: 1
    });

    this.getStock();
  };

  onChangeSelect = async value => {
    await this.setState({
      estoqueBase: value
    });

    this.getStock();
  };

  getStock = async () => {
    this.setState({
      loading: true
    });

    const estoqueBase =
      this.state.estoqueBase === "TODOS" ? "" : this.state.estoqueBase;

    const query = {
      filters: {
        mark: {
          specific: {
            mark: this.state.fabricante
          }
        },
        product: {
          specific: {
            name: this.state.produto,
            modulo: this.props.auth.modulo
          }
        },
        stockBase: {
          specific: {
            stockBase: estoqueBase
          }
        },
        equipType: {
          specific: {
            type: this.state.tipo
          }
        }
      },
      page: this.state.page,
      total: this.state.total
    };

    await stock(query).then(resposta =>
      this.setState({
        estoque: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show
      })
    );

    this.setState({
      loading: false
    });
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    });
  };

  componentDidMount = async () => {
    await this.getStock();
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

  handleOk = async status => {
    const { line, quantModal: amount, numeroSerieModal } = this.state;

    const serialNumbers =
      numeroSerieModal.length > 0
        ? numeroSerieModal.split(/\n/).filter(item => (item ? item : null))
        : null;

    const value = {
      ...line,
      amount,
      serialNumbers,
      status
    };

    if (status === "analysis") {
      if (!serialNumbers) return;

      if (serialNumbers.length === amount) {
        const { status } = await UpdatteProductBase(value);
        if (status === 200) {
          await this.getStock();
          this.setState({
            modalStatus: false,
            amount: 1,
            numeroSerieModal: [],
            line: {}
          });
        }
      } else {
        message.error(
          "Quantidade adicinada não condiz com a quantidade de numero de série"
        );
      }
    } else if (status === "preAnalysis") {
      const { status } = await UpdatteProductBase({
        ...value,
        serialNumbers: []
      });
      if (status === 200) {
        await this.getStock();
        this.setState({
          modalStatus: false,
          amount: 1,
          numeroSerieModal: [],
          line: {}
        });
      }
    }
  };

  DeleteEquip = async () => {
    const { serialNumberDeleteId, serialNumbers, line } = this.state;

    const index = R.findIndex(R.propEq("id", serialNumberDeleteId))(
      serialNumbers
    );

    serialNumbers.splice(index, 1);

    const { status } = await deteleEquip({
      id: this.state.serialNumberDeleteId,
      productBaseId: line.id
    });

    if (status === 200) {
      this.setState({ serialNumbers, modaldelete: false });
    }

    await this.getStock();
  };

  ModalDelete = () => (
    <Modal
      width={650}
      title="Deletar Equipamento"
      visible={this.state.modaldelete}
      okText="Confirmar"
      cancelText="Cancelar"
      onOk={this.DeleteEquip}
      onCancel={() =>
        this.setState({
          modaldelete: false,
          serialNumberDelete: "",
          serialNumberDeleteId: ""
        })
      }
    >
      <p>
        deleja realmente deletar o equipamento cujo número de série é:{" "}
        {this.state.serialNumberDelete}
      </p>
    </Modal>
  );

  ModalStatus = () => (
    <Modal width={650} visible={this.state.modalStatus} footer={null}>
      <Tabs
        defaultActiveKey="1"
        type="card"
        className="modal-tabs"
        // style={{ width: "calc(100% + 20px)", position: "relative", left: "0" }}
      >
        <TabPane tab="Enviar para análise" key={1}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="div-lines-estoque">
              <div className="div-serial-entrada">
                <div className="div-block-label-modal">
                  <label>{`Produto: ${this.state.line.name}`}</label>
                  <label>{`Fabricante: ${this.state.line.manufacturer}`}</label>
                </div>
              </div>
              <div className="div-quantModal-estoque">
                <div className="div-text-entrada">Quant:</div>
                <InputNumber
                  min={1}
                  max={parseInt(this.state.line.preAnalysis, 10)}
                  defaultValue={this.state.quantModal}
                  style={{ width: "100%" }}
                  value={this.state.quantModal}
                  onChange={this.onChangeQuant}
                />
              </div>
            </div>
            <div className="div-block-footer">
              <Button onClick={() => this.setState({ modalStatus: false })}>
                Cancelar
              </Button>
              <Button
                type="primary"
                onClick={() => this.handleOk("preAnalysis")}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Entrada Estoque" key={2}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ flexDirection: "column" }}>
              <div
                className="div-block-label-modal"
                style={{ flexDirection: "row" }}
              >
                <label
                  style={{ width: "60%" }}
                >{`Produto: ${this.state.line.name}`}</label>
                <label
                  style={{ width: "40%" }}
                >{`Fabricante: ${this.state.line.manufacturer}`}</label>
              </div>

              <div className="div-lines-estoque">
                <div className="div-serial-entrada">
                  <div className="div-textSerial-entrada">Número de série:</div>
                  <TextArea
                    className="input-100"
                    placeholder="Digite o número de série"
                    autosize={{ minRows: 2, maxRows: 4 }}
                    rows={4}
                    onChange={this.onChangeNumeroModal}
                    name="numeroSerieModal"
                    value={this.state.numeroSerieModal}
                  />
                </div>
                <div className="div-quantModal-estoque">
                  <div className="div-text-entrada">Quant:</div>
                  <InputNumber
                    min={1}
                    max={parseInt(this.state.line.analysis, 10)}
                    defaultValue={this.state.quantModal}
                    style={{ width: "100%" }}
                    value={this.state.quantModal}
                    onChange={this.onChangeQuant}
                  />
                </div>
              </div>
              <div className="div-block-footer">
                <Button onClick={() => this.setState({ modalStatus: false })}>
                  Cancelar
                </Button>
                <Button
                  type="primary"
                  onClick={() => this.handleOk("analysis")}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );

  ModalSerialNumbers = () => (
    <Modal
      width={300}
      title="Números de série"
      visible={this.state.visible}
      onOk={() => this.setState({ visible: false })}
      onCancel={() => this.setState({ visible: false })}
    >
      <div>
        <Input
          style={{ width: "100%" }}
          placeholder="número de série"
          value={this.state.serialNumber}
          onChange={async e => {
            await this.setState({ serialNumber: e.target.value });
            this.getAllEquips();
          }}
        />
        <div className="div-modal-estoque">
          {this.state.serialNumbers.map(item => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <p
                  style={
                    item.reserved || item.inClient ? { color: "red" } : null
                  }
                >
                  {item.serialNumber}
                </p>
                {this.props.auth.typeAccount === "MOD" &&
                  !item.reserved &&
                  !item.inClient && (
                    <DeleteOutlined
                      className="icon-delete"
                      onClick={() =>
                        this.setState({
                          modaldelete: true,
                          serialNumberDelete: item.serialNumber,
                          serialNumberDeleteId: item.id
                        })
                      }
                    />
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );

  getAllEquips = () => {
    const query = {
      filters: {
        equip: {
          specific: {
            serialNumber: this.state.serialNumber
          }
        },
        stockBase: {
          specific: {
            stockBase: this.state.line.stockBase
          }
        },
        product: {
          specific: {
            id: this.state.line.productId
          }
        }
      },
      total: null
    };
    getAllEquipsService(query)
      .then(resp => {
        this.setState({ serialNumbers: resp.data.rows });
      })
      .catch(error => console.log(error));
  };

  showModal = async line => {
    await this.setState({ line });
    this.setState({ visible: true });

    this.getAllEquips();
  };

  render() {
    return (
      <div className="div-card-estoque">
        <div className="linhaTexto-estoque">
          <h1 className="h1-estoque">Gerenciar estoque</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-produto-Rtecnico">
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

              <div className="div-fabricante-estoque">
                <div className="div-text-Rtecnico">Fabricante:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="fabricante"
                  value={this.state.fabricante}
                  placeholder="Digite o fabricante"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-fabricante-estoque">
                <div className="div-text-Rtecnico">Tipo:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="tipo"
                  value={this.state.tipo}
                  placeholder="Digite o tipo"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-estoque-Rtecnico">
                <div className="div-text-Rtecnico">Estoque:</div>
                <Select
                  value={this.state.estoqueBase}
                  style={{ width: "100%" }}
                  onChange={this.onChangeSelect}
                >
                  <Option value="TODOS">TODOS</Option>
                  <Option value="ESTOQUE">ESTOQUE</Option>
                  <Option value="EMPRESTIMO">EMPRESTIMO</Option>
                </Select>
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
        <div className="div-cabecalho-estoque">
          <div className="cel-produto-cabecalho-estoque">Produto</div>
          <div className="cel-fabricante20-cabecalho-estoque">Fabricante</div>
          <div className="cel-quant-cabecalho-estoque">Disp.</div>
          <div className="cel-quant-cabecalho-estoque">Min.</div>
          <div className="cel-estoque-cabecalho-estoque">Estoque</div>
          <div className="cel-AA-cabecalho-estoque">Aguard. Análise</div>
          <div className="cel-status-cabecalho-estoque">Análise</div>
        </div>

        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : (
          <div className="div-separate-estoque">
            {this.state.estoque.rows.length !== 0 ? (
              this.state.estoque.rows.map(line => (
                <div className="div-100-estoque">
                  <div className="div-lines-estoque">
                    <div className="cel-produto-cabecalho-estoque">
                      <label
                        onClick={
                          line.serial ? () => this.showModal(line) : null
                        }
                        className="div-table-label-cel-estoque"
                        style={
                          parseInt(line.minimumStock, 10) >
                          parseInt(line.available, 10)
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.name}
                      </label>
                    </div>
                    <div className="cel-fabricante20-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          parseInt(line.minimumStock, 10) >
                          parseInt(line.available, 10)
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.manufacturer}
                      </label>
                    </div>
                    <div className="cel-quant-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          parseInt(line.minimumStock, 10) >
                          parseInt(line.available, 10)
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.available}
                      </label>
                    </div>
                    <div className="cel-quant-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          parseInt(line.minimumStock, 10) >
                          parseInt(line.available, 10)
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.minimumStock}
                      </label>
                    </div>
                    <div className="cel-estoque-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          parseInt(line.minimumStock, 10) >
                          parseInt(line.available, 10)
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.stockBase}
                      </label>
                    </div>
                    <div className="cel-AA-cabecalho-estoque">
                      <label
                        className={
                          line.analysis !== "0" || line.preAnalysis !== "0"
                            ? "div-table-label-analise-cel-estoque"
                            : "div-table-label-cel-estoque"
                        }
                        style={
                          parseInt(line.minimumStock, 10) >
                          parseInt(line.available, 10)
                            ? { color: "red" }
                            : null
                        }
                        onClick={
                          line.analysis !== "0" || line.preAnalysis !== "0"
                            ? () => this.showModalStatus(line)
                            : () => this.showModalStatus(line)
                        }
                      >
                        {line.preAnalysis}
                      </label>
                    </div>
                    <div className="cel-status-cabecalho-estoque">
                      <label
                        className={
                          line.analysis !== "0" || line.preAnalysis !== "0"
                            ? "div-table-label-analise-cel-estoque"
                            : "div-table-label-cel-estoque"
                        }
                        style={
                          parseInt(line.minimumStock, 10) >
                          parseInt(line.available, 10)
                            ? { color: "red" }
                            : null
                        }
                        onClick={
                          line.analysis !== "0" || line.preAnalysis !== "0"
                            ? () => this.showModalStatus(line)
                            : () => this.showModalStatus(line)
                        }
                      >
                        {line.analysis}
                      </label>
                    </div>

                    {/* <div className="cel-botao-cabecalho-estoque">
                      {line.analysis !== "0" ? (
                        <Icon
                          type="info-circle"
                          theme="outlined"
                          onClick={() => this.showModalStatus(line)}
                        />
                      ) : (
                        "-"
                      )}
                    </div> */}
                  </div>
                  <div className=" div-separate1-estoque" />
                </div>
              ))
            ) : (
              <div className="div-naotemnada">Não há nada no estoque</div>
            )}
            <this.Pages />
          </div>
        )}
        <this.ModalSerialNumbers />
        <this.ModalStatus />
        <this.ModalDelete />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Estoque);
