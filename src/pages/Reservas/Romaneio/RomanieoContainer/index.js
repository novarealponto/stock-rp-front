import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Select, Form, Input, DatePicker, Button, Row, Col, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getTecnico } from "../../../../services/tecnico";
import { getAllOsPartsByParams } from "../../../../services/reservaOs";
import { ArrowRightOutlined } from "@ant-design/icons";

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
            <Select placeholder="selecione um serviço">
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
            <Select placeholder="selecione um técnico">
              {props.tecnicos.map((valor) => (
                <Option value={valor.name}>{valor.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="data"
            label="Dia: "
            rules={[{ required: true, message: "Por favor digite uma senha" }]}
            style={{ width: "100%" }}
          >
            <DatePicker placeholder="selecione um dia" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Buscar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

class RomanieoContainer extends Component {
  state = {
    avancado: false,
    tecnicoArray: [],
    tecnico: undefined,
    serviço: undefined,
    rows: [],
    rowsSelecteds: [],
    columns: [
      {
        title: "Os",
        dataIndex: "os",
      },
      {
        title: "Técnico",
        dataIndex: "tecnico",
      },
      {
        title: "Qtd",
        dataIndex: "amount",
      },
      {
        title: "Cliente",
        dataIndex: "razaoSocial",
      },
      {
        title: "Ação",
        dataIndex: "",
        key: "id",
        render: (text) => {
          return (
            <ArrowRightOutlined
              onClick={() =>
                this.setState((prevState) => {
                  console.log(prevState);
                  return {
                    rows: [
                      ...prevState.rows.filter((item) => item.id !== text.id),
                    ],
                    rowsSelecteds: [...prevState.rowsSelecteds, text],
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
      // page: this.state.page,
      // total: this.state.total,
    };

    const {
      status,
      data: { rows },
    } = await getAllOsPartsByParams(query);

    if (status === 200) {
      this.setState({ rows });
    }
  };

  render() {
    return (
      <div className="div-card-Rtecnico">
        <div className="linhaTexto-Rtecnico">
          <h1 className="h1-Rtecnico">Romaneio técnico</h1>
        </div>

        <SearchForm
          tecnicos={this.state.tecnicoArray}
          handleSubmit={this.buscarOsParts}
        />

        <Table
          style={{ width: "100%" }}
          columns={this.state.columns}
          dataSource={this.state.rows}
        />

        <Table
          style={{ width: "100%" }}
          columns={this.state.columns}
          dataSource={this.state.rowsSelecteds}
        />
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
