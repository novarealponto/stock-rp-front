import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import moment from "moment";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import * as R from "ramda";

import { getAllReservaTecnicoReturn } from "../../../../services/reservaTecnico";
import { getAllEquipsService } from "../../../../services/equip";
import {
  getTodasOs,
  associarEquipsParaOsPart,
} from "../../../../services/reservaOs";

import { Button, Drawer, Select, InputNumber } from "antd";

const { Option } = Select;

class ExternoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      indexProducts: [],
      products: [],
      os: [],
      index: -1,
      setVisible: false,
      nome: "",
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
      oId: null,
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

  getOs = async () => {
    const query = {
      filters: {
        technician: {
          specific: {
            // name: "TECNICO 1",
            id: this.props.auth.technicianId,
            // name: this.props.auth.username,
          },
        },
        os: {
          specific: {
            date: { start: moment(), end: moment() },
          },
        },
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

    const response = await getTodasOs(query);

    if (response.status === 200) {
      this.setState({ os: response.data.rows });
    }
  };

  componentDidMount = async () => {
    await this.getOs();
  };

  getAllReservaTecnicoReturn = async () => {
    const query = {
      filters: {
        technician: {
          specific: {
            id: this.props.auth.technicianId,
          },
        },
        technicianReserve: {
          specific: {
            data: {
              start: moment(),
              end: moment(),
            },
          },
        },
      },
      osPartsId: null,
    };
    const { status, data } = await getAllReservaTecnicoReturn(query);

    if (status === 200) {
      data.map((item) => {
        const index = R.findIndex(R.propEq("produto", item.produto))(
          this.state.products
        );

        const osPartId = R.find(R.propEq("name", item.produto))(
          R.find(R.propEq("id", this.state.oId))(this.state.os).products
        ).id;

        if (index === -1) {
          this.setState((prevState) => {
            return { products: [...prevState.products, { ...item, osPartId }] };
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
      await Promise.all(
        this.state.products.map(async (item, index) => {
          const {
            data: { count },
          } = await getAllEquipsService({
            filters: {
              equip: {
                specific: {
                  osPartId: item.osPartId,
                },
              },
            },
          });
          const amount =
            R.find(R.propEq("name", item.produto))(
              R.find(R.propEq("id", this.state.oId))(this.state.os).products
            ).quantMax - count;

          this.setState((prevState) => {
            const { products } = prevState;

            products.splice(index, 1, {
              ...products[index],
              amount,
            });
            return { products };
          });
        })
      );
    }
  };

  Drawer = () => (
    <Drawer
      title={
        <div className="div-drawer-externo">
          Perfil <LogoutOutlined style={{ cursor: "pointer" }} />{" "}
        </div>
      }
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
            {this.state.os.map((item) => (
              <div
                className="div-linha-externo"
                select={this.state.oId === item.id ? "true" : "false"}
                onClick={() => this.setState({ oId: item.id })}
              >
                <div className="div-quant-externo">{item.os}</div>
                <div className="div-item-externo">{item.razaoSocial}</div>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="div-card-externo">
            {this.state.products
              .filter((item) => item.amount > 0)
              .map((item, index) => (
                <div
                  className="div-linha-externo"
                  select={
                    this.state.indexProducts.filter(
                      (indexProduct) => index === indexProduct.index
                    ).length !== 0
                      ? "true"
                      : "false"
                  }
                  onClick={async () => {
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
                            {
                              ...item,
                              index,
                              serialNumersSelects: [],
                              quantidadeSaida: 0,
                            },
                          ],
                        };
                      }
                    });
                  }}
                >
                  <div className="div-quant-externo">{item.amount}</div>
                  <div className="div-item-externo">{item.produto}</div>
                </div>
              ))}
          </div>
        );

      case 2:
        return (
          <div className="div-card-externo">
            {this.state.indexProducts.map((item, index) => {
              return (
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
                      value={item.serialNumersSelects}
                      onChange={(e) =>
                        this.setState((prevState) => {
                          const { indexProducts } = this.state;
                          indexProducts.splice(index, 1, {
                            ...item,
                            serialNumersSelects: e.slice(0, item.amount),
                          });

                          return { indexProducts };
                        })
                      }
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
                      value={item.quantidadeSaida}
                      onChange={(quantidadeSaida) => {
                        this.setState((prevState) => {
                          const { indexProducts } = prevState;
                          indexProducts.splice(index, 1, {
                            ...item,
                            quantidadeSaida,
                          });

                          return { indexProducts };
                        });
                      }}
                      style={{ width: "90%", margin: "5px 0 10px" }}
                    />
                  )}
                </div>
              );
            })}
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
            onClick={() => {
              this.setState((prevState) => {
                return {
                  products: prevState.current === 1 ? [] : prevState.products,
                  current: R.max(prevState.current - 1, 0),
                };
              });
            }}
          >
            Voltar
          </Button>
          <Button
            onClick={async () => {
              if (this.state.current === 0)
                await this.getAllReservaTecnicoReturn();
              if (this.state.current === 2) {
                const { status } = await associarEquipsParaOsPart({
                  technicianId: this.props.auth.technicianId,
                  osParts: this.state.indexProducts,
                });
                if (status === 200) {
                  await this.setState({
                    current: 0,
                    indexProducts: [],
                    products: [],
                    os: [],
                    index: -1,
                    oId: null,
                  });
                  await this.getOs();
                }
              } else {
                this.setState((prevState) => {
                  return {
                    current: R.min(prevState.current + 1, 2),
                  };
                });
              }
            }}
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
