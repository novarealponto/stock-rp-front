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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getTecnico } from "../../../../services/tecnico";
import { getAllOsPartsByParams } from "../../../../services/reservaOs";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getAllEquipBySerialNumber } from "../../../../services/equip";
import {
  newReservaTecnico,
  getAllReservaTecnico,
  getAllReservaTecnicoReturn,
} from "../../../../services/reservaTecnico";

const { Option } = Select;

const SearchForm = (props) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="NewAccountForm"
      id="form-romaneio-search"
      layout="vertical"
      hideRequiredMark
      onFinish={(value) => props.handleSubmit(value)}
    >
      <Row gutter={20}>
        <Col span={7}>
          <Form.Item
            name="serviço"
            label="Serviço:"
            rules={[
              { required: true, message: "Por favor selecione um serviço" },
            ]}
            style={{ width: "100%" }}
          >
            <Select
              placeholder="selecione um serviço"
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
              { required: true, message: "Por favor selecione uma técnico" },
            ]}
            style={{ width: "100%" }}
          >
            <Select
              placeholder="selecione um técnico"
              disabled={props.disabled}
            >
              {props.tecnicos.map((valor) => (
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
              disabledDate={(current) =>
                current &&
                form.getFieldValue("serviço") === "saida" &&
                current < moment().startOf("day")
              }
              placeholder="selecione um dia"
              disabled={props.disabled}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={props.disabled}>
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
  {
    title: "Número de Série",
    dataIndex: "serialNumber",
  },
];

class RomanieoContainer extends Component {
  state = {
    serialNumber: undefined,
    tecnicoArray: [],
    tecnico: undefined,
    serviço: undefined,
    rows: [],
    rowsSelecteds: [],
    columns: [
      ...columns,
      {
        title: "Ação",
        dataIndex: "",
        key: "id",
        render: (text) => {
          if (text.serial) return null;
          return (
            <ArrowRightOutlined
              onClick={() =>
                this.setState((prevState) => {
                  return {
                    rows: [
                      ...prevState.rows.filter((item) => item.id !== text.id),
                    ],
                    rowsSelecteds: [
                      ...prevState.rowsSelecteds,
                      { ...text, serialNumbers: [] },
                    ],
                  };
                })
              }
            />
          );
        },
      },
    ],
  };

  componentDidMount = async () => {
    await this.getAllTecnico();
  };

  getAllTecnico = async () => {
    await getTecnico().then((resposta) =>
      this.setState({
        tecnicoArray: resposta.data,
      })
    );
  };

  newReservaTecnico = async () => {
    const { tecnico: technician, rowsSelecteds: rows } = this.state;
    const { status } = await newReservaTecnico({ technician, rows });

    if (status === 200) {
      this.setState({
        tecnico: undefined,
        serviço: undefined,
        rows: [],
        rowsSelecteds: [],
      });
    }
  };

  buscarOsParts = async (value) => {
    const { serviço, tecnico, data } = value;

    const query = {
      filters: {
        technician: {
          specific: {
            name: tecnico,
          },
        },
        os: {
          specific: {
            date: { start: data, end: data },
          },
        },
      },
    };
    if (serviço === "saida") {
      const {
        status,
        data: { rows },
      } = await getAllOsPartsByParams(query);

      const response = await getAllReservaTecnico(query);

      if (status === 200 && response.status === 200) {
        if (rows.length === 0 && response.data.length === 0) {
          message.error("Não reserva para esta técnico nesta data");
        } else {
          this.setState({ rows, rowsSelecteds: response.data });
          this.setState({ serviço, tecnico });
        }
      }
    }

    if (serviço === "retorno") {
      const response = await getAllReservaTecnicoReturn(query);
      if (response.status === 200) {
        if (response.data.length === 0) {
          message.error("Não retorno disponivel para esta técnico nesta data");
        } else {
          this.setState({ rows: response.data });
          this.setState({ serviço, tecnico });
        }
      }
    }
  };

  buscaPorNumeroSerie = async (e) => {
    const { value: serialNumber } = e.target;
    if (e.which === 13 || e.keyCode === 13) {
      const { status, data } = await getAllEquipBySerialNumber({
        serialNumber,
      });
      console.log(data);

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

        R.map((item) => {
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
            await this.setState((prevState) => {
              return {
                rows: [
                  ...prevState.rows.filter((item) => {
                    if (linhaUnica) {
                      return item.serialNumber !== serialNumber;
                    } else {
                      return item.id !== row.id;
                    }
                  }),
                  {
                    ...row,
                    amount: row.amount - 1,
                  },
                ],
                rowsSelecteds: [
                  ...prevState.rowsSelecteds,
                  {
                    ...row,
                    amount: 1,
                    serialNumbers: [{ serialNumber }],
                  },
                ],
              };
            });
          } else {
            await this.setState((prevState) => {
              if (linhaUnica) {
                return {
                  rows: [
                    ...prevState.rows.filter(
                      (item) => item.serialNumber !== serialNumber
                    ),
                    {
                      ...row,
                      amount: row.amount - 1,
                    },
                  ],
                  rowsSelecteds: [
                    ...prevState.rowsSelecteds,
                    {
                      ...row,
                      amount: 1,
                      serialNumbers: [{ serialNumber }],
                    },
                  ],
                };
              }
              return {
                rows: [
                  ...prevState.rows.filter((item) => item.id !== row.id),
                  {
                    ...row,
                    amount: row.amount - 1,
                  },
                ],
                rowsSelecteds: [
                  ...prevState.rowsSelecteds.filter(
                    (item) => item.id !== prevState.rowsSelecteds[idx].id
                  ),
                  {
                    ...prevState.rowsSelecteds[idx],
                    amount: prevState.rowsSelecteds[idx].amount + 1,
                    serialNumbers: [
                      ...prevState.rowsSelecteds[idx].serialNumbers,
                      { serialNumber },
                    ],
                  },
                ],
              };
            });
          }

          await this.setState((prevState) => {
            return {
              rows: [
                ...prevState.rows.filter(
                  (item) => !(item.id === row.id && item.amount === 0)
                ),
              ],
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

  render() {
    console.log(this.state);
    return (
      <div className="div-card-Rtecnico">
        <div className="linhaTexto-Rtecnico">
          <h1 className="h1-Rtecnico">Romaneio técnico</h1>
        </div>

        <SearchForm
          tecnicos={this.state.tecnicoArray}
          handleSubmit={this.buscarOsParts}
          disabled={!!this.state.serviço}
        />

        {this.state.serviço && (
          <div id="div-block-tables-saida-romaneio">
            <div className="ant-form-item">
              <div className="ant-form-item-label">
                <label>Numero de Série</label>
              </div>

              <Input
                placeholder="insira o sumero de série a ser liberado"
                id="search-serial-romaneio"
                value={this.state.serialNumber}
                onKeyPress={this.buscaPorNumeroSerie}
                onChange={(e) =>
                  this.setState({ serialNumber: e.target.value })
                }
              />
            </div>

            {(this.state.serviço === "saida" ||
              this.state.serviço === "retorno") && (
              <>
                <Table
                  bordered
                  style={{ width: "100%" }}
                  columns={this.state.columns}
                  dataSource={this.state.rows}
                />

                <Table
                  style={{ width: "100%" }}
                  columns={columns}
                  dataSource={this.state.rowsSelecteds}
                />
              </>
            )}

            <Button onClick={this.newReservaTecnico}>Submeter</Button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(RomanieoContainer);
