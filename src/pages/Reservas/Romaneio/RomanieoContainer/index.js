import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import * as R from "ramda";
import moment from "moment";
import {
  Select,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Table,
  Empty,
  message,
  Modal,
  InputNumber,
  Tooltip
} from "antd";
import {
  PlusOutlined,
  RollbackOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  AlertOutlined
} from "@ant-design/icons";
import { getTecnico } from "../../../../services/tecnico";
import {
  getAllOsPartsByParams,
  getAllOsPartsByParamsForReturn,
  baixaReservaOs,
  getTodasOs,
  getAllOsParts,
  associarEquipParaOsPart
} from "../../../../services/reservaOs";
import { getAllEquipBySerialNumber } from "../../../../services/equip";
import {
  newReservaTecnico,
  getAllReservaTecnico,
  getAllReservaTecnicoReturn
} from "../../../../services/reservaTecnico";

const { Option } = Select;

const SearchForm = props => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="NewAccountForm"
      id="form-romaneio-search"
      layout="vertical"
      hideRequiredMark
      onFinish={value => props.handleSubmit(value)}
    >
      <Row gutter={20}>
        <Col span={7}>
          <Form.Item
            name="serviço"
            label="Serviço:"
            rules={[
              { required: true, message: "Por favor selecione um serviço" }
            ]}
            style={{ width: "100%" }}
          >
            <Select
              placeholder="Selecione um serviço"
              disabled={props.disabled}
            >
              <Option value="saida">Saída</Option>
              <Option value="retorno">Retorno</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="tecnico"
            label="Técnico: "
            rules={[
              { required: true, message: "Por favor selecione uma técnico" }
            ]}
            style={{ width: "100%" }}
          >
            <Select
              placeholder="Selecione um técnico"
              disabled={props.disabled}
            >
              {props.tecnicos.map(valor => (
                <Option value={valor.name}>{valor.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="data"
            label="Data: "
            rules={[{ required: true, message: "Por favor digite uma senha" }]}
            style={{ width: "100%" }}
          >
            <DatePicker
              inputReadOnly={true}
              disabledDate={current =>
                current &&
                form.getFieldValue("serviço") === "saida" &&
                current < moment().startOf("day")
              }
              placeholder="Selecione uma data"
              disabled={props.disabled}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
              // disabled={props.disabled}
            >
              Buscar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const columns = [
  {
    title: "Os",
    dataIndex: "os"
  },
  {
    title: "Qtd",
    dataIndex: "amount"
  },
  {
    title: "Produto",
    dataIndex: "produto"
  }
];

class RomanieoContainer extends Component {
  state = {
    serialNumber: undefined,
    serialNumberModal: null,
    oId: null,
    technicianReserveId: null,
    tecnicoArray: [],
    tecnico: undefined,
    serviço: undefined,
    rows: [],
    rowsSelecteds: [],
    osArrayReturn: [],
    osPartsArrayReturn: [],
    visible: false,
    visibleModalSemNumeroSerie: false,
    data: null
  };

  componentDidMount = async () => {
    await this.getAllTecnico();
  };

  getAllTecnico = async () => {
    await getTecnico().then(resposta =>
      this.setState({
        tecnicoArray: resposta.data
      })
    );
  };

  newReservaTecnico = async () => {
    const { tecnico: technician, rowsSelecteds: rows, data } = this.state;
    const { status } = await newReservaTecnico({ technician, rows, data });

    if (status === 200) {
      this.setState({
        tecnico: undefined,
        serviço: undefined,
        rows: [],
        rowsSelecteds: []
      });
    }
  };

  buscarOsParts = async value => {
    let serviço = this.state.serviço;
    let tecnico = this.state.tecnico;
    let data = this.state.data;

    if (value) {
      serviço = value.serviço;
      tecnico = value.tecnico;
      data = value.data;
    }

    const query = {
      filters: {
        technician: {
          specific: {
            name: tecnico
          }
        },
        os: {
          specific: {
            date: { start: data, end: data }
          }
        },
        technicianReserve: {
          specific: {
            data: { start: data, end: data }
          }
        }
      }
    };
    if (serviço === "saida") {
      const {
        status,
        data: { rows }
      } = await getAllOsPartsByParams(query);

      const response = await getAllReservaTecnico(query);

      if (status === 200 && response.status === 200) {
        if (rows.length === 0 && response.data.length === 0) {
          message.error("Não reserva para esta técnico nesta data");
        } else {
          this.setState({
            rows
            // rowsSelecteds: response.data
          });
          this.setState({ serviço, tecnico, data });
        }
      }
    }

    if (serviço === "retorno") {
      const response = await getAllReservaTecnicoReturn(query);
      const resp = await getAllOsParts({ ...query, or: true });

      if (resp.status === 200) {
        this.setState({ rowsSelecteds: resp.data.rows });
      }

      if (response.status === 200) {
        this.setState({ rows: response.data });
        this.setState({ serviço, tecnico, data });
      }
    }
  };

  buscaPorNumeroSerie = async e => {
    const { value: serialNumber } = e.target;
    if (e.which === 13 || e.keyCode === 13) {
      const { status, data } = await getAllEquipBySerialNumber({
        serialNumber
      });

      if (status === 200 && data) {
        let index = -1;

        const linhaUnica =
          data.productBase.product.category === "equipamento" &&
          data.productBase.product.serial;

        if (linhaUnica) {
          index = R.findIndex(R.propEq("serialNumber", serialNumber))(
            this.state.rows
          );
        } else {
          index = R.findIndex(
            R.propEq("produto", data.productBase.product.name)
          )(this.state.rows);
        }

        let reserved =
          data.reserved && data.productBase.product.category === "peca";

        R.map(item => {
          if (
            R.findIndex(R.propEq("serialNumber", serialNumber))(
              item.serialNumbers
            ) !== -1
          )
            reserved = true;
        }, this.state.rowsSelecteds);

        if (reserved) {
          message.error("Este equipamento está reservado");
          this.setState({ serialNumber: undefined });
          return;
        }

        if (index !== -1) {
          const row = this.state.rows[index];

          const idx = R.findIndex(R.propEq("id", row.id))(
            this.state.rowsSelecteds
          );
          if (idx === -1) {
            await this.setState(prevState => {
              return {
                rows: [
                  ...prevState.rows.filter(item => {
                    if (linhaUnica) {
                      return item.serialNumber !== serialNumber;
                    } else {
                      return item.id !== row.id;
                    }
                  }),
                  {
                    ...row,
                    amount: row.amount - 1
                  }
                ],
                rowsSelecteds: [
                  ...prevState.rowsSelecteds,
                  {
                    ...row,
                    amount: 1,
                    serialNumbers: [{ serialNumber }]
                  }
                ]
              };
            });
          } else {
            await this.setState(prevState => {
              if (linhaUnica) {
                return {
                  rows: [
                    ...prevState.rows.filter(
                      item => item.serialNumber !== serialNumber
                    ),
                    {
                      ...row,
                      amount: row.amount - 1
                    }
                  ],
                  rowsSelecteds: [
                    ...prevState.rowsSelecteds,
                    {
                      ...row,
                      amount: 1,
                      serialNumbers: [{ serialNumber }]
                    }
                  ]
                };
              }
              return {
                rows: [
                  ...prevState.rows.filter(item => item.id !== row.id),
                  {
                    ...row,
                    amount: row.amount - 1
                  }
                ],
                rowsSelecteds: [
                  ...prevState.rowsSelecteds.filter(
                    item => item.id !== prevState.rowsSelecteds[idx].id
                  ),
                  {
                    ...prevState.rowsSelecteds[idx],
                    amount: prevState.rowsSelecteds[idx].amount + 1,
                    serialNumbers: [
                      ...prevState.rowsSelecteds[idx].serialNumbers,
                      { serialNumber }
                    ]
                  }
                ]
              };
            });
          }

          await this.setState(prevState => {
            return {
              rows: [
                ...prevState.rows.filter(
                  item => !(item.id === row.id && item.amount === 0)
                )
              ]
            };
          });
          message.success(
            `${data.productBase.product.name} reservado(a) cujo número de série é ${serialNumber}`
          );
        } else {
          message.error(
            "Este técnico não possui nenhuma OS neste dia onde este equipamento foi reservado"
          );
        }
      } else {
        message.error("equipamento não foi encontrado");
      }
      this.setState({ serialNumber: undefined });
    } else {
      this.setState({ serialNumber });
    }
  };

  BaixaReservaOs = async (item, idx, key) => {
    const value = {
      osPartsId: item.osPartId,
      add: {
        [key]: item.valor
      },
      serialNumberArray: null
    };

    const { status } = await baixaReservaOs(value);

    if (status === 200) {
      this.setState(prevState => {
        const { osPartsArrayReturn } = prevState;

        osPartsArrayReturn.splice(idx, 1, {
          ...osPartsArrayReturn[idx],
          valor: 0,
          amount: osPartsArrayReturn[idx].amount - item.valor,
          [key]: osPartsArrayReturn[idx][key] + item.valor
        });

        return {
          osPartsArrayReturn
        };
      });
      this.buscarOsParts();
    }
  };

  ModalSemNumeroSerie = () => {
    return (
      <Modal
        title="Liberar"
        onCancel={() => this.setState({ visibleModalSemNumeroSerie: false })}
        visible={this.state.visibleModalSemNumeroSerie}
        width={700}
        // visible={true}
        footer={null}
      >
        {this.state.osPartsArrayReturn.map((item, idx) => (
          <div className="div-text-modal">
            <table style={{ width: "100%" }}>
              <tr>
                <th>OS</th>
                <th>Saída</th>
                <th>Retorno</th>
                <th>Perca</th>
                <th>Ação</th>
              </tr>
              <tr>
                <td>{item.os}</td>
                <td>{item.output}</td>
                <td>{item.return}</td>
                <td>{item.missOut}</td>
                <td>
                  <div
                    className="div-quant-modal-romaneio"
                    style={{ width: "100%" }}
                  >
                    <InputNumber
                      max={
                        item.amount - item.output - item.return - item.missOut
                      }
                      min={0}
                      value={item.valor}
                      onChange={valor =>
                        this.setState(prevState => {
                          const { osPartsArrayReturn } = prevState;

                          osPartsArrayReturn.splice(idx, 1, {
                            ...osPartsArrayReturn[idx],
                            valor
                          });

                          return {
                            osPartsArrayReturn
                          };
                        })
                      }
                    />
                    <div className="div-acoes-modal-romaneio">
                      <Tooltip placement="top" title="Retornar">
                        <Button
                          type="primary"
                          className="button"
                          onClick={() =>
                            this.BaixaReservaOs(item, idx, "return")
                          }
                        >
                          <ArrowLeftOutlined />
                        </Button>
                      </Tooltip>
                      <Tooltip placement="top" title="Liberar">
                        <Button
                          type="primary"
                          className="button-liberar-romaneio"
                          onClick={() =>
                            this.BaixaReservaOs(item, idx, "output")
                          }
                        >
                          <ArrowRightOutlined />
                        </Button>
                      </Tooltip>
                      <Tooltip placement="top" title="Perda">
                        <Button
                          type="primary"
                          className="button-remove-entrada"
                          onClick={() =>
                            this.BaixaReservaOs(item, idx, "missOut")
                          }
                        >
                          <AlertOutlined />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        ))}
      </Modal>
    );
  };

  Modal = () => {
    return (
      <Modal
        title="Liberar"
        visible={this.state.visible}
        onOk={async () => {
          if (!this.state.oId) return;

          const { status } = await associarEquipParaOsPart({
            serialNumber: this.state.serialNumberModal,
            technicianReserveId: this.state.technicianReserveId,
            oId: this.state.oId,
            tecnico: this.state.tecnico
          });

          if (status === 200) {
            this.buscarOsParts();
            this.setState({ visible: false, oId: null });
          }
        }}
        onCancel={() => this.setState({ visible: false })}
      >
        <div
          style={{
            width: "100%",
            dislpay: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Select
            style={{ width: "20%", marginRight: "5%" }}
            value={this.state.oId}
            onChange={oId => this.setState({ oId })}
            placeholder="os"
          >
            {this.state.osArrayReturn.map(item => (
              <Option value={item.oId}>{item.os}</Option>
            ))}
          </Select>
          <Select
            style={{ width: "75%" }}
            value={this.state.oId}
            onChange={oId => this.setState({ oId })}
            placeholder="razão social"
          >
            {this.state.osArrayReturn.map(item => (
              <Option value={item.oId}>{item.razaoSocial}</Option>
            ))}
          </Select>
        </div>
      </Modal>
    );
  };

  openModalOsByReturn = async text => {
    const query = {
      filters: {
        technician: {
          specific: {
            name: text.tecnico
          }
        },
        product: {
          specific: {
            name: text.produto
          }
        },
        os: {
          specific: {
            date: {
              start: this.state.data,
              end: this.state.data
            }
          }
        }
      }
    };

    const resp = await getAllOsPartsByParamsForReturn(query);

    if (resp.status === 200) {
      this.setState({
        osArrayReturn: resp.data.rows
      });
    }
    this.setState({
      visible: true,
      serialNumberModal: text.serialNumber,
      technicianReserveId: text.technicianReserveId
    });
  };

  render() {
    return (
      <div className="div-card-Rtecnico">
        <div className="linhaTexto-Rtecnico">
          <h1 className="h1-Rtecnico">Romaneio técnico</h1>
        </div>
        <this.Modal />
        <this.ModalSemNumeroSerie />

        <SearchForm
          tecnicos={this.state.tecnicoArray}
          handleSubmit={this.buscarOsParts}
          disabled={this.state.serviço === "saida"}
        />

        {this.state.serviço && (
          <div id="div-block-tables-saida-romaneio">
            <div className="ant-form-item">
              <div className="ant-form-item-label">
                <label>Numero de Série</label>
              </div>

              <Input
                placeholder="Insira o número de série a ser liberado"
                id="search-serial-romaneio"
                value={this.state.serialNumber}
                onKeyPress={this.buscaPorNumeroSerie}
                onChange={e => this.setState({ serialNumber: e.target.value })}
              />
            </div>

            {this.state.serviço === "saida" && (
              <>
                <Table
                  bordered
                  style={{ width: "100%" }}
                  columns={[
                    ...columns,
                    {
                      title: "Número de Série",
                      dataIndex: "serialNumber"
                    },
                    {
                      title: "Ação",
                      dataIndex: "",
                      key: "id",
                      render: text => {
                        if (text.serial) return null;
                        return (
                          <ArrowRightOutlined
                            onClick={() =>
                              this.setState(prevState => {
                                const rowAdd = R.find(R.propEq("id", text.id))(
                                  prevState.rowsSelecteds
                                );
                                // console.log(rowAdd);
                                // console.log(text);

                                return {
                                  rows: [
                                    ...prevState.rows.filter(
                                      item => item.id !== text.id
                                    )
                                  ],
                                  rowsSelecteds: rowAdd
                                    ? [
                                        ...prevState.rowsSelecteds.filter(
                                          item => item.id !== text.id
                                        ),
                                        {
                                          ...rowAdd,
                                          amount: rowAdd.amount + text.amount
                                        }
                                      ]
                                    : [
                                        ...prevState.rowsSelecteds,
                                        { ...text, serialNumbers: [] }
                                      ]
                                };
                              })
                            }
                          />
                        );
                      }
                    }
                  ]}
                  dataSource={this.state.rows.filter(item => item.amount > 0)}
                />

                <Table
                  style={{ width: "100%" }}
                  columns={[
                    ...columns,
                    {
                      title: "Número de Série",
                      dataIndex: "serialNumber"
                    }
                  ]}
                  dataSource={this.state.rowsSelecteds}
                />
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.newReservaTecnico}
                >
                  Enviar
                </Button>
              </>
            )}
            {this.state.serviço === "retorno" && (
              <>
                <Table
                  bordered
                  style={{ width: "100%" }}
                  columns={[
                    ...columns,
                    {
                      title: "Número de Série",
                      dataIndex: "serialNumber"
                    },
                    {
                      title: "Ação",
                      dataIndex: "",
                      key: "id",
                      render: text => {
                        console.log(text);
                        if (text.serial)
                          return (
                            <div className="div-acao-romaneio">
                              <ArrowRightOutlined
                                size="large"
                                onClick={async () => {
                                  if (text.os === "-") {
                                    await this.openModalOsByReturn(text);
                                  } else {
                                    const value = {
                                      osPartsId: text.osPartsId,
                                      add: {
                                        output: 1
                                      },
                                      serialNumberArray: [text.serialNumber]
                                    };

                                    const resposta = await baixaReservaOs(
                                      value
                                    );

                                    if (resposta.status === 200) {
                                      this.buscarOsParts();
                                    }
                                  }
                                }}
                              />
                              <RollbackOutlined
                                size="large"
                                onClick={async () => {
                                  if (text.os === "-") {
                                    await this.openModalOsByReturn(text);
                                  } else {
                                    const value = {
                                      osPartsId: text.osPartsId,
                                      add: {
                                        return: 1
                                      },
                                      serialNumberArray: [text.serialNumber]
                                    };

                                    const resposta = await baixaReservaOs(
                                      value
                                    );

                                    if (resposta.status === 200) {
                                      this.buscarOsParts();
                                    }
                                  }
                                }}
                              />
                              <PlusOutlined
                                size="large"
                                onClick={() => this.openModalOsByReturn(text)}
                              />
                            </div>
                          );
                        return (
                          <PlusOutlined
                            size="large"
                            onClick={async () => {
                              const query = {
                                filters: {
                                  technician: {
                                    specific: {
                                      name: this.state.tecnico
                                    }
                                  },
                                  os: {
                                    specific: {
                                      date: {
                                        start: this.state.data,
                                        end: this.state.data
                                      }
                                    }
                                  },
                                  product: {
                                    specific: {
                                      name: text.produto
                                    }
                                  }
                                }
                              };

                              const { status, data } = await getAllOsParts(
                                query
                              );

                              if (status === 200) {
                                console.log(data);
                                await this.setState({
                                  osPartsArrayReturn: data.rows.map(item => {
                                    return { ...item, valor: 0 };
                                  }),
                                  visibleModalSemNumeroSerie: true
                                });
                              }
                            }}
                          />
                        );
                      }
                    }
                  ]}
                  dataSource={this.state.rows.filter(item => item.amount > 0)}
                />

                <Table
                  style={{ width: "100%" }}
                  columns={[
                    ...columns,
                    {
                      title: "Saída",
                      dataIndex: "output"
                    },
                    {
                      title: "Retorno",
                      dataIndex: "return"
                    },
                    {
                      title: "Perda",
                      dataIndex: "missOut"
                    }
                  ]}
                  dataSource={this.state.rowsSelecteds}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(RomanieoContainer);
