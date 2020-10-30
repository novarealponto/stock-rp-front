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
  Tooltip,
  Checkbox,
<<<<<<< HEAD
  Pagination
=======
  Pagination,
>>>>>>> 05e69ed... All Project
} from "antd";
import {
  PlusOutlined,
  RollbackOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
<<<<<<< HEAD
  AlertOutlined
=======
  AlertOutlined,
>>>>>>> 05e69ed... All Project
} from "@ant-design/icons";

import { Howl, Howler } from "howler";
import ha from "./sound.mp3";

import { getTecnico } from "../../../../services/tecnico";
import {
  getAllOsPartsByParams,
  getAllOsPartsByParamsForReturn,
  baixaReservaOs,
  retornarBaixaReservaOs,
  getTodasOs,
  getAllOsParts,
  associarEquipParaOsPart,
<<<<<<< HEAD
  checkout
=======
  checkout,
>>>>>>> 05e69ed... All Project
} from "../../../../services/reservaOs";
import { getAllEquipBySerialNumber } from "../../../../services/equip";
import {
  newReservaTecnico,
  getAllReservaTecnico,
<<<<<<< HEAD
  getAllReservaTecnicoReturn
=======
  getAllReservaTecnicoReturn,
>>>>>>> 05e69ed... All Project
} from "../../../../services/reservaTecnico";

const { Option } = Select;

<<<<<<< HEAD
const SearchForm = props => {
  const [form] = Form.useForm();
  console.log(form);
=======
const SearchForm = (props) => {
  const [form] = Form.useForm();

>>>>>>> 05e69ed... All Project
  return (
    <Form
      form={form}
      name="NewAccountForm"
      id="form-romaneio-search"
      layout="vertical"
      hideRequiredMark
<<<<<<< HEAD
      onFinish={value => props.handleSubmit(value)}
=======
      onFinish={(value) => props.handleSubmit(value)}
>>>>>>> 05e69ed... All Project
    >
      <Row gutter={20}>
        <Col span={7}>
          <Form.Item
            name="serviço"
            label="Serviço:"
            rules={[
<<<<<<< HEAD
              { required: true, message: "Por favor selecione um serviço" }
=======
              { required: true, message: "Por favor selecione um serviço" },
>>>>>>> 05e69ed... All Project
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
<<<<<<< HEAD
              { required: true, message: "Por favor selecione uma técnico" }
=======
              { required: true, message: "Por favor selecione uma técnico" },
>>>>>>> 05e69ed... All Project
            ]}
            style={{ width: "100%" }}
          >
            <Select
              placeholder="Selecione um técnico"
              disabled={props.disabled}
<<<<<<< HEAD
            >
              {props.tecnicos.map(valor => (
=======
              onChange={(tecnico) => form.setFieldsValue({ tecnico })}
            >
              {props.tecnicos.map((valor) => (
>>>>>>> 05e69ed... All Project
                <Option value={valor.name}>{valor.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={7}>
<<<<<<< HEAD
          <Form.Item
            name="data"
            label="Data: "
            rules={[{ required: true, message: "Por favor digite uma senha" }]}
=======
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.tecnico !== currentValues.tecnico}
        >
        {({ getFieldValue }) => {
            return (
              <Form.Item
            name="data"
            label="Data: "
            rules={[{ required: getFieldValue('tecnico') !== 'LABORATORIO', message: "Por favor digite uma senha" }]}
>>>>>>> 05e69ed... All Project
            style={{ width: "100%" }}
          >
            <DatePicker
              inputReadOnly={true}
<<<<<<< HEAD
              disabledDate={current =>
                current &&
                form.getFieldValue("serviço") === "saida" &&
                current < moment().startOf("day")
              }
              placeholder="Selecione uma data"
              disabled={props.disabled | (props.tecnico === "LABORATORIO")}
            />
          </Form.Item>
=======
              // disabledDate={(current) =>
              //   current &&
              //   form.getFieldValue("serviço") === "saida" &&
              //   current < moment().startOf("day")
              // }
              placeholder="Selecione uma data"
              disabled={props.disabled || getFieldValue('tecnico') === 'LABORATORIO'}
            />
          </Form.Item>
            );
          }}
          </Form.Item>
>>>>>>> 05e69ed... All Project
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
<<<<<<< HEAD
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
=======
    dataIndex: "os",
  },
  {
    title: "Qtd",
    dataIndex: "amount",
  },
  {
    title: "Produto",
    dataIndex: "produto",
  },
>>>>>>> 05e69ed... All Project
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
    data: null,
    prevAction: "",
<<<<<<< HEAD
    current: 1
=======
    current: 1,
>>>>>>> 05e69ed... All Project
  };

  componentDidMount = async () => {
    await this.getAllTecnico();
  };

  getAllTecnico = async () => {
<<<<<<< HEAD
    await getTecnico().then(resposta =>
      this.setState({
        tecnicoArray: resposta.data
=======
    await getTecnico().then((resposta) =>
      this.setState({
        tecnicoArray: resposta.data,
>>>>>>> 05e69ed... All Project
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
<<<<<<< HEAD
        rowsSelecteds: []
=======
        rowsSelecteds: [],
>>>>>>> 05e69ed... All Project
      });
    }
  };

  soundPlay = () => {
    const sound = new Howl({
      src: ha,
      html5: true,
      sprite: {
<<<<<<< HEAD
        laser: [15100, 1500]
      }
=======
        laser: [15100, 1500],
      },
>>>>>>> 05e69ed... All Project
    });

    sound.play("laser");
    // setTimeout(function() {
    // sound.play("laser");
    // }, 3000);
  };

<<<<<<< HEAD
  buscarOsParts = async value => {
    // this.soundPlay()
    let serviço = this.state.serviço;
    let tecnico = this.state.tecnico;
    let data = this.state.data;
=======
  buscarOsParts = async (value) => {
    // this.soundPlay()
    let serviço = this.state.serviço;
    let tecnico = this.state.tecnico;
    let data =    this.state.data;
>>>>>>> 05e69ed... All Project

    if (value) {
      serviço = value.serviço;
      tecnico = value.tecnico;
      data = value.data;
    }

    const query = {
      filters: {
        technician: {
          specific: {
<<<<<<< HEAD
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
=======
            name: tecnico,
          },
        },
        os: {
          specific: {
            date: tecnico ==="LABORATORIO" ? {start: '01/01/2019'} :{ start: data, end: data },
          },
        },
        technicianReserve: {
          specific: {
            data: tecnico !== "LABORATORIO" ?  { start: data, end: data } : undefined,
          },
        },
        osParts: {
          specific: {
            data: tecnico !== "LABORATORIO" ?  { start: data, end: data } : null,
          },
        }
      },
>>>>>>> 05e69ed... All Project
    };
    if (serviço === "saida") {
      const {
        status,
<<<<<<< HEAD
        data: { rows }
=======
        data: { rows },
>>>>>>> 05e69ed... All Project
      } = await getAllOsPartsByParams(query);

      const response = await getAllReservaTecnico(query);

      if (status === 200 && response.status === 200) {
        if (rows.length === 0 && response.data.length === 0) {
          message.error("Não reserva para esta técnico nesta data");
        } else {
          this.setState({
            rows,
<<<<<<< HEAD
            rowsSelecteds: []
=======
            rowsSelecteds: [],
>>>>>>> 05e69ed... All Project
            // rowsSelecteds: response.data
          });
          this.setState({ serviço, tecnico, data });
        }
      }
    }

    if (serviço === "retorno") {
      const response = await getAllReservaTecnicoReturn(query);
      // const resp = await getAllOsParts({ ...query, or: true });

      // if (resp.status === 200) {
      //   this.setState({ rowsSelecteds: resp.data.rows });
      // }

      if (response.status === 200) {
        this.setState({
<<<<<<< HEAD
          rows: response.data.filter(test => test.os === "-"),
          rowsSelecteds: response.data
            .filter(test => test.os !== "-")
            .map(item => {
=======
          rows: response.data.filter((test) => test.os === "-"),
          rowsSelecteds: response.data
            .filter((test) => test.os !== "-")
            .map((item) => {
>>>>>>> 05e69ed... All Project
              return {
                ...item,
                perda: item.prevAction === "perda" ? 1 : item.missOut || 0,
                retorno: item.prevAction === "retorno" ? 1 : item.return || 0,
<<<<<<< HEAD
                saida: item.prevAction === "saida" ? 1 : item.output || 0
              };
            })
=======
                saida: item.prevAction === "saida" ? 1 : item.output || 0,
              };
            }),
>>>>>>> 05e69ed... All Project
        });
        this.setState({ serviço, tecnico, data });
      }
    }
  };

<<<<<<< HEAD
  buscaPorNumeroSerie = async e => {
    const { value: serialNumber } = e.target;
    if (e.which === 13 || e.keyCode === 13) {
      const { status, data } = await getAllEquipBySerialNumber({
        serialNumber
=======
  buscaPorNumeroSerie = async (e) => {
    const { value: serialNumber } = e.target;
    if (e.which === 13 || e.keyCode === 13) {
      const { status, data } = await getAllEquipBySerialNumber({
        serialNumber,
>>>>>>> 05e69ed... All Project
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

<<<<<<< HEAD
        R.map(item => {
=======
        R.map((item) => {
>>>>>>> 05e69ed... All Project
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
<<<<<<< HEAD
            await this.setState(prevState => {
              return {
                rows: [
                  ...prevState.rows.filter(item => {
=======
            await this.setState((prevState) => {
              return {
                rows: [
                  ...prevState.rows.filter((item) => {
>>>>>>> 05e69ed... All Project
                    if (linhaUnica) {
                      return item.serialNumber !== serialNumber;
                    } else {
                      return item.id !== row.id;
                    }
                  }),
                  {
                    ...row,
<<<<<<< HEAD
                    amount: row.amount - 1
                  }
=======
                    amount: row.amount - 1,
                  },
>>>>>>> 05e69ed... All Project
                ],
                rowsSelecteds: [
                  ...prevState.rowsSelecteds,
                  {
                    ...row,
                    amount: 1,
<<<<<<< HEAD
                    serialNumbers: [{ serialNumber }]
                  }
                ]
              };
            });
          } else {
            await this.setState(prevState => {
=======
                    serialNumbers: [{ serialNumber }],
                  },
                ],
              };
            });
          } else {
            await this.setState((prevState) => {
>>>>>>> 05e69ed... All Project
              if (linhaUnica) {
                return {
                  rows: [
                    ...prevState.rows.filter(
<<<<<<< HEAD
                      item => item.serialNumber !== serialNumber
                    ),
                    {
                      ...row,
                      amount: row.amount - 1
                    }
=======
                      (item) => item.serialNumber !== serialNumber
                    ),
                    {
                      ...row,
                      amount: row.amount - 1,
                    },
>>>>>>> 05e69ed... All Project
                  ],
                  rowsSelecteds: [
                    ...prevState.rowsSelecteds,
                    {
                      ...row,
                      amount: 1,
<<<<<<< HEAD
                      serialNumbers: [{ serialNumber }]
                    }
                  ]
=======
                      serialNumbers: [{ serialNumber }],
                    },
                  ],
>>>>>>> 05e69ed... All Project
                };
              }
              return {
                rows: [
<<<<<<< HEAD
                  ...prevState.rows.filter(item => item.id !== row.id),
                  {
                    ...row,
                    amount: row.amount - 1
                  }
                ],
                rowsSelecteds: [
                  ...prevState.rowsSelecteds.filter(
                    item => item.id !== prevState.rowsSelecteds[idx].id
=======
                  ...prevState.rows.filter((item) => item.id !== row.id),
                  {
                    ...row,
                    amount: row.amount - 1,
                  },
                ],
                rowsSelecteds: [
                  ...prevState.rowsSelecteds.filter(
                    (item) => item.id !== prevState.rowsSelecteds[idx].id
>>>>>>> 05e69ed... All Project
                  ),
                  {
                    ...prevState.rowsSelecteds[idx],
                    amount: prevState.rowsSelecteds[idx].amount + 1,
                    serialNumbers: [
                      ...prevState.rowsSelecteds[idx].serialNumbers,
<<<<<<< HEAD
                      { serialNumber }
                    ]
                  }
                ]
=======
                      { serialNumber },
                    ],
                  },
                ],
>>>>>>> 05e69ed... All Project
              };
            });
          }

<<<<<<< HEAD
          await this.setState(prevState => {
            return {
              rows: [
                ...prevState.rows.filter(
                  item => !(item.id === row.id && item.amount === 0)
                )
              ]
=======
          await this.setState((prevState) => {
            return {
              rows: [
                ...prevState.rows.filter(
                  (item) => !(item.id === row.id && item.amount === 0)
                ),
              ],
>>>>>>> 05e69ed... All Project
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
      osPartId: item.osPartId,
      add: {
<<<<<<< HEAD
        [key]: item.valor
      },
      serialNumberArray: null
=======
        [key]: item.valor,
      },
      serialNumberArray: null,
>>>>>>> 05e69ed... All Project
    };

    const { status } = await baixaReservaOs(value);

    if (status === 200) {
<<<<<<< HEAD
      this.setState(prevState => {
=======
      this.setState((prevState) => {
>>>>>>> 05e69ed... All Project
        const { osPartsArrayReturn } = prevState;

        osPartsArrayReturn.splice(idx, 1, {
          ...osPartsArrayReturn[idx],
<<<<<<< HEAD
          amount: osPartsArrayReturn[idx].amount,
          [key]: osPartsArrayReturn[idx][key] + item.valor
        });

        return {
          osPartsArrayReturn
        };
      });
      this.buscarOsParts();
=======
          amount: osPartsArrayReturn[idx].amount - item.valor,
          [key]: osPartsArrayReturn[idx][key] + item.valor,
          valor: 0
        });

        return {
          osPartsArrayReturn,
        };
      });
      await this.buscarOsParts()
>>>>>>> 05e69ed... All Project
    }
  };

  ModalSemNumeroSerie = () => {
    return (
      <Modal
        title="Liberar"
<<<<<<< HEAD
        onCancel={() => this.setState({ visibleModalSemNumeroSerie: false })}
=======
        onCancel={() => {
          this.buscarOsParts()
          this.setState({ visibleModalSemNumeroSerie: false })
        }}
>>>>>>> 05e69ed... All Project
        visible={this.state.visibleModalSemNumeroSerie}
        width={700}
        // visible={true}
        footer={null}
      >
        {this.state.osPartsArrayReturn.map((item, idx) => (
<<<<<<< HEAD
          <div className="div-text-modal-romaneio">
            <table style={{ width: "100%" }}>
              <tr>
                <th>OS</th>
                <th>Quant</th>
=======
          <div className="div-text-modal">
            <table style={{ width: "100%" }}>
              <tr>
                <th>OS</th>
>>>>>>> 05e69ed... All Project
                <th>Saída</th>
                <th>Retorno</th>
                <th>Perca</th>
                <th>Ação</th>
              </tr>
              <tr>
                <td>{item.os}</td>
<<<<<<< HEAD
                <td>{item.amount}</td>
=======
>>>>>>> 05e69ed... All Project
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
<<<<<<< HEAD
                      onChange={valor =>
                        this.setState(prevState => {
=======
                      onChange={(valor) =>
                        this.setState((prevState) => {
>>>>>>> 05e69ed... All Project
                          const { osPartsArrayReturn } = prevState;

                          osPartsArrayReturn.splice(idx, 1, {
                            ...osPartsArrayReturn[idx],
<<<<<<< HEAD
                            valor
                          });

                          return {
                            osPartsArrayReturn
=======
                            valor,
                          });

                          return {
                            osPartsArrayReturn,
>>>>>>> 05e69ed... All Project
                          };
                        })
                      }
                    />
<<<<<<< HEAD
                    {console.log(item)}
=======
>>>>>>> 05e69ed... All Project
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
            tecnico: this.state.tecnico,
<<<<<<< HEAD
            prevAction: this.state.prevAction
          });

          if (status === 200) {
            this.buscarOsParts();
=======
            prevAction: this.state.prevAction,
          });

          if (status === 200) {
            await this.buscarOsParts();
>>>>>>> 05e69ed... All Project
            this.setState({ visible: false, oId: null });
          }
        }}
        onCancel={() => this.setState({ visible: false, prevAction: "" })}
      >
        <div
          style={{
            width: "100%",
            dislpay: "flex",
            flexDirection: "column",
<<<<<<< HEAD
            justifyContent: "space-between"
=======
            justifyContent: "space-between",
>>>>>>> 05e69ed... All Project
          }}
        >
          <Select
            style={{ width: "20%", marginRight: "5%" }}
            value={this.state.oId}
<<<<<<< HEAD
            onChange={oId => this.setState({ oId })}
            placeholder="os"
          >
            {this.state.osArrayReturn.map(item => (
=======
            onChange={(oId) => this.setState({ oId })}
            placeholder="os"
          >
            {this.state.osArrayReturn.map((item) => (
>>>>>>> 05e69ed... All Project
              <Option value={item.oId}>{item.os}</Option>
            ))}
          </Select>
          <Select
            style={{ width: "75%" }}
            value={this.state.oId}
<<<<<<< HEAD
            onChange={oId => this.setState({ oId })}
            placeholder="razão social"
          >
            {this.state.osArrayReturn.map(item => (
=======
            onChange={(oId) => this.setState({ oId })}
            placeholder="razão social"
          >
            {this.state.osArrayReturn.map((item) => (
>>>>>>> 05e69ed... All Project
              <Option value={item.oId}>{item.razaoSocial}</Option>
            ))}
          </Select>
        </div>
      </Modal>
    );
  };

<<<<<<< HEAD
  openModalOsByReturn = async text => {
=======
  openModalOsByReturn = async (text) => {
>>>>>>> 05e69ed... All Project
    const query = {
      filters: {
        technician: {
          specific: {
<<<<<<< HEAD
            name: text.tecnico
          }
        },
        product: {
          specific: {
            name: text.produto
          }
=======
            name: text.tecnico,
          },
        },
        product: {
          specific: {
            name: text.produto,
          },
>>>>>>> 05e69ed... All Project
        },
        os: {
          specific: {
            date: {
              start: this.state.data,
<<<<<<< HEAD
              end: this.state.data
            }
          }
        }
      }
=======
              end: this.state.data,
            },
          },
        },
      },
>>>>>>> 05e69ed... All Project
    };

    const resp = await getAllOsPartsByParamsForReturn(query);

    console.log(resp);

    if (resp.status === 200) {
      this.setState({
<<<<<<< HEAD
        osArrayReturn: resp.data.rows
=======
        osArrayReturn: resp.data.rows,
>>>>>>> 05e69ed... All Project
      });
    }
    this.setState({
      visible: true,
      serialNumberModal: text.serialNumber,
<<<<<<< HEAD
      technicianReserveId: text.technicianReserveId
=======
      technicianReserveId: text.technicianReserveId,
>>>>>>> 05e69ed... All Project
    });
  };

  render() {
    console.log(this.state);
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
            {this.state.serviço === "saida" && (
              <>
                <div className="ant-form-item">
                  <div className="ant-form-item-label">
                    <label>Numero de Série</label>
                  </div>

                  <Input
                    placeholder="insira o sumero de série a ser liberado"
                    id="search-serial-romaneio"
                    value={this.state.serialNumber}
                    onKeyPress={this.buscaPorNumeroSerie}
<<<<<<< HEAD
                    onChange={e =>
=======
                    onChange={(e) =>
>>>>>>> 05e69ed... All Project
                      this.setState({ serialNumber: e.target.value })
                    }
                  />
                </div>
                <Table
                  bordered
                  style={{ width: "100%" }}
                  columns={[
                    ...columns,
                    {
                      title: "Número de Série",
<<<<<<< HEAD
                      dataIndex: "serialNumber"
=======
                      dataIndex: "serialNumber",
>>>>>>> 05e69ed... All Project
                    },
                    {
                      title: "Ação",
                      dataIndex: "",
                      key: "id",
<<<<<<< HEAD
                      render: text => {
=======
                      render: (text) => {
>>>>>>> 05e69ed... All Project
                        if (text.serial) return null;
                        return (
                          <ArrowRightOutlined
                            onClick={() =>
<<<<<<< HEAD
                              this.setState(prevState => {
=======
                              this.setState((prevState) => {
>>>>>>> 05e69ed... All Project
                                const rowAdd = R.find(R.propEq("id", text.id))(
                                  prevState.rowsSelecteds
                                );

                                return {
                                  rows: [
                                    ...prevState.rows.filter(
<<<<<<< HEAD
                                      item => item.id !== text.id
                                    )
=======
                                      (item) => item.id !== text.id
                                    ),
>>>>>>> 05e69ed... All Project
                                  ],
                                  rowsSelecteds: rowAdd
                                    ? [
                                        ...prevState.rowsSelecteds.filter(
<<<<<<< HEAD
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
=======
                                          (item) => item.id !== text.id
                                        ),
                                        {
                                          ...rowAdd,
                                          amount: rowAdd.amount + text.amount,
                                        },
                                      ]
                                    : [
                                        ...prevState.rowsSelecteds,
                                        { ...text, serialNumbers: [] },
                                      ],
>>>>>>> 05e69ed... All Project
                                };
                              })
                            }
                          />
                        );
<<<<<<< HEAD
                      }
                    }
                  ]}
                  dataSource={this.state.rows.filter(item => item.amount > 0)}
=======
                      },
                    },
                  ]}
                  dataSource={this.state.rows.filter((item) => item.amount > 0)}
>>>>>>> 05e69ed... All Project
                />

                <Table
                  style={{ width: "100%" }}
                  columns={[
                    ...columns,
                    {
                      title: "Número de Série",
<<<<<<< HEAD
                      dataIndex: "serialNumber"
                    }
=======
                      dataIndex: "serialNumber",
                    },
>>>>>>> 05e69ed... All Project
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
<<<<<<< HEAD
                      dataIndex: "serialNumber"
=======
                      dataIndex: "serialNumber",
>>>>>>> 05e69ed... All Project
                    },
                    {
                      title: "Ação",
                      dataIndex: "",
                      key: "id",
<<<<<<< HEAD
                      render: text => {
=======
                      render: (text) => {
>>>>>>> 05e69ed... All Project
                        if (text.serial)
                          return (
                            <div className="div-acao-romaneio">
                              <ArrowRightOutlined
                                onClick={() => {
                                  this.setState({ prevAction: "saida" });
                                  this.openModalOsByReturn(text);
                                }}

                                // onClick={async () => {
                                //   if (text.os === "-") {
                                //     await this.openModalOsByReturn(text);
                                //   } else {
                                //     const value = {
                                //       osPartId: text.osPartId,
                                //       add: {
                                //         output: 1,
                                //       },
                                //       serialNumberArray: [text.serialNumber],
                                //     };

                                //     const resposta = await baixaReservaOs(
                                //       value
                                //     );

                                //     if (resposta.status === 200) {
                                //       this.buscarOsParts();
                                //     }
                                //   }
                                // }}
                              />
                              <RollbackOutlined
                                onClick={() => {
                                  this.setState({ prevAction: "retorno" });
                                  this.openModalOsByReturn(text);
                                }}

                                // onClick={async () => {
                                //   if (text.os === "-") {
                                //     await this.openModalOsByReturn(text);
                                //   } else {
                                //     const value = {
                                //       osPartId: text.osPartId,
                                //       add: {
                                //         return: 1,
                                //       },
                                //       serialNumberArray: [text.serialNumber],
                                //     };

                                //     const resposta = await baixaReservaOs(
                                //       value
                                //     );

                                //     if (resposta.status === 200) {
                                //       this.buscarOsParts();
                                //     }
                                //   }
                                // }}
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
<<<<<<< HEAD
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
=======
                                      name: this.state.tecnico,
                                    },
                                  },
                                  os: {
                                    specific: {
                                      date: this.state.tecnico === "LABORATORIO" ? { start: "01/01/2019" } : {
                                        start: this.state.data,
                                        end: this.state.data,
                                      },

                                    },
                                  },
                                  product: {
                                    specific: {
                                      name: text.produto,
                                    },
                                  },
                                },
>>>>>>> 05e69ed... All Project
                              };

                              const { status, data } = await getAllOsParts(
                                query
                              );

                              if (status === 200) {
                                await this.setState({
<<<<<<< HEAD
                                  osPartsArrayReturn: data.rows.map(item => {
                                    return { ...item, valor: 0 };
                                  }),
                                  visibleModalSemNumeroSerie: true
=======
                                  osPartsArrayReturn: data.rows.map((item) => {
                                    return { ...item, valor: 0 };
                                  }),
                                  visibleModalSemNumeroSerie: true,
>>>>>>> 05e69ed... All Project
                                });
                              }
                            }}
                          />
                        );
<<<<<<< HEAD
                      }
                    }
                  ]}
                  dataSource={this.state.rows.filter(item => item.amount > 0)}
=======
                      },
                    },
                  ]}
                  dataSource={this.state.rows.filter((item) => item.amount > 0)}
>>>>>>> 05e69ed... All Project
                />

                <table id="table-return-romaneo">
                  <tr>
                    <th>Os</th>
                    <th>Qtd</th>
                    <th>Produto</th>
                    <th>Saída</th>
                    <th>Retorno</th>
                    <th>Perda</th>
                    <th>Ação</th>
                    <th>Checkout</th>
                  </tr>
                  {this.state.rowsSelecteds
                    .slice(
                      10 * (this.state.current - 1),
                      10 * this.state.current
                    )
                    .map((row, idx) => (
<<<<<<< HEAD
                      <tr
                        className={row.checkout ? "row-disabled" : "tr-click"}
                      >
=======
                      <tr className={row.checkout ? "row-disabled" : ""}>
>>>>>>> 05e69ed... All Project
                        <td>{row.os}</td>
                        <td>{row.amount}</td>
                        <td>{row.produto}</td>
                        <td>{row.saida}</td>
                        <td>{row.retorno}</td>
                        <td>{row.perda}</td>
                        <td>
                          <Button
                            disabled={row.checkout}
                            onClick={async () => {
                              const { status } = await retornarBaixaReservaOs(
                                row
                              );
                              if (status === 200) {
                                await this.buscarOsParts();
                              }
                            }}
                          >
                            Retornar
                          </Button>
                        </td>
                        <td>
                          <Checkbox
                            defaultChecked={false}
                            checked={row.checkout}
<<<<<<< HEAD
                            onChange={e => {
                              this.setState(prevState => {
=======
                            onChange={(e) => {
                              this.setState((prevState) => {
>>>>>>> 05e69ed... All Project
                                const { rowsSelecteds } = prevState;

                                rowsSelecteds.splice(idx, 1, {
                                  ...rowsSelecteds[idx],
<<<<<<< HEAD
                                  checkout: e.target.checked
                                });

                                return {
                                  rowsSelecteds
=======
                                  checkout: e.target.checked,
                                });

                                return {
                                  rowsSelecteds,
>>>>>>> 05e69ed... All Project
                                };
                              });
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </table>
                <div className="div-pagination-table-romaneio">
                  <Pagination
<<<<<<< HEAD
                    onChange={current => this.setState({ current })}
=======
                    onChange={(current) => this.setState({ current })}
>>>>>>> 05e69ed... All Project
                    current={this.state.current}
                    total={this.state.rowsSelecteds.length}
                  />
                </div>

<<<<<<< HEAD
                {this.state.rowsSelecteds.filter(row => row.checkout).length ===
                  this.state.rowsSelecteds.length && (
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={() => checkout(this.state.rowsSelecteds)}
=======
                {this.state.rowsSelecteds.filter((row) => row.checkout)
                  .length === this.state.rowsSelecteds.length && (
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={async () => {
                      const {status} = await checkout(this.state.rowsSelecteds)

                      if(status === 200){
                        message.success("Sucesso")
                        await this.buscarOsParts()
                      }
                    }}
>>>>>>> 05e69ed... All Project
                  >
                    Enviar
                  </Button>
                )}
              </>
            )}
          </div>
        )}
        {/* <table id="table-return-romaneo">
          <tr>
            <th>Os</th>
            <th>Qtd</th>
            <th>Produto</th>
            <th>Saída</th>
            <th>Retorno</th>
            <th>Perda</th>
          </tr>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <tr>
              <td>Os</td>
              <td>Qtd</td>
              <td>Produto</td>
              <td>Saída</td>
              <td>Retorno</td>
              <td>Perda</td>
            </tr>
          ))}
        </table> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
<<<<<<< HEAD
    auth: state.auth
=======
    auth: state.auth,
>>>>>>> 05e69ed... All Project
  };
}

export default connect(mapStateToProps)(RomanieoContainer);
