import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import moment from "moment";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";

import * as R from "ramda";

import { getAllReservaTecnicoReturn } from "../../../../services/reservaTecnico";

import { Button, Drawer, Select, InputNumber } from "antd";

const { Option } = Select;

class ExternoContainer extends Component {
  state = {
    setVisible: false,
    nome: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
    current: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      indexProducts: [],
      products: [],
      index: -1,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  showDrawer = () => {
    this.setState({
      setVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      setVisible: false,
    });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  // renderRedirect = () => {
  //   if (!this.props.auth.addEntr) {
  //     return <Redirect to="/logged/" />;
  //   }
  // };

  componentDidMount = async () => {
    const query = {
      filters: {
        technician: {
          specific: {
            // name: "TECNICO 1",
            id: this.props.auth.technicianId,
            // name: this.props.auth.username,
          },
        },
        // os: {
        //   specific: {
        //     date: { start: moment(), end: data },
        //   },
        // },
        technicianReserve: {
          specific: {
            data: {
              start: moment(),
              end: moment(),
            },
          },
        },
      },
    };

    const { status, data } = await getAllReservaTecnicoReturn(query);

    if (status === 200) {
      data.map((item) => {
        const index = R.findIndex(R.propEq("produto", item.produto))(
          this.state.products
        );
        if (index === -1) {
          this.setState((prevState) => {
            return { products: [...prevState.products, item] };
          });
        } else {
          this.setState((prevState) => {
            const { products } = prevState;
            const { amount, serialNumbers } = products[index];

            products.splice(index, 1, {
              ...products[index],
              amount: amount + item.amount,
              serialNumbers: [...serialNumbers, ...item.serialNumbers],
            });
            return { products };
          });
        }
      });
    }

    console.log(status, data);
  };

  Drawer = () => (
    <Drawer
      title="Perfil"
      placement="right"
      closable={false}
      onClose={this.onClose}
      visible={this.state.setVisible}
    >
      <input
        className="input-drawer-externo"
        onChange={this.onChange}
        placeholder="Nome"
      ></input>
      <input
        className="input-drawer-externo"
        onChange={this.onChange}
        type="password"
        name="senhaAtual"
        placeholder="Senha atual"
      ></input>
      <input
        className="input-drawer-externo"
        onChange={this.onChange}
        type="password"
        name="novaSenha"
        placeholder="Nova senha"
      ></input>
      <input
        className="input-drawer-externo"
        name="confirmarSenha"
        type="password"
        onChange={this.onChange}
        placeholder="Confirmar senha"
      ></input>
      <div className="div-button-drawer-externo">
        <Button>Salvar</Button>
      </div>
      <div className="footer-drawer-externo">
        Developed by Jessi Castro and Guilherme Stain
      </div>
    </Drawer>
  );

  ItemList = () => {
    const { current } = this.state;

    switch (current) {
      case 0:
        return (
          <div className="div-card-externo">
            {this.state.products.map((item, index) => (
              <div
                className="div-linha-externo"
                select={
                  this.state.indexProducts.filter(
                    (indexProduct) => index === indexProduct.index
                  ).length !== 0
                    ? "true"
                    : "false"
                }
                onClick={() =>
                  this.setState((prevState) => {
                    if (
                      prevState.indexProducts.filter(
                        (idx) => idx.index === index
                      ).length !== 0
                    ) {
                      return {
                        indexProducts: [
                          ...prevState.indexProducts.filter(
                            (idx) => idx.index !== index
                          ),
                        ],
                      };
                    } else {
                      return {
                        indexProducts: [
                          ...prevState.indexProducts.filter(
                            (idx) => idx.index !== index
                          ),
                          { ...item, index },
                        ],
                      };
                    }
                  })
                }
              >
                <div className="div-quant-externo">{item.amount}</div>
                <div className="div-item-externo">{item.produto}</div>
              </div>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="div-card-externo">
            {this.state.indexProducts.map((item, index) => (
              <div
                className="div-linha-externo"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "48px",
                  }}
                >
                  <div className="div-item-externo">{item.produto}</div>
                </div>
                {item.serial ? (
                  <Select
                    style={{ width: "90%", margin: "5px 5% 10px" }}
                    mode="tags"
                    // onChange={handleChange}
                    tokenSeparators={[","]}
                  >
                    {item.serialNumbers.map((serialNumber) => (
                      <Option key={serialNumber}>{serialNumber}</Option>
                    ))}
                  </Select>
                ) : (
                  <InputNumber
                    min={0}
                    max={item.amount}
                    style={{ width: "90%", margin: "5px 0 10px" }}
                  />
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="div-card-emprestimo-report">
        <div className="title-emprestimo-report">
          <h1 className="h1-Gentrada">
            Externos
            <UserOutlined
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={this.showDrawer}
            />
          </h1>
        </div>

        <this.ItemList />

        <div className="div-buttons-externo">
          <Button
            onClick={() =>
              this.setState((prevState) => {
                return {
                  current: R.max(prevState.current - 1, 0),
                };
              })
            }
          >
            Voltar
          </Button>
          <Button
            onClick={() =>
              this.setState((prevState) => {
                return {
                  current: R.min(prevState.current + 1, 3),
                };
              })
            }
          >
            Avançar
          </Button>
        </div>
        <this.Drawer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ExternoContainer);
