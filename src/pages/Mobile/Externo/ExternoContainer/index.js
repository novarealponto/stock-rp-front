import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import moment from "moment";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";

import * as R from "ramda";

import { getAllReservaTecnicoReturn } from "../../../../services/reservaTecnico";

import { Button, Drawer, Select } from "antd";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class ExternoContainer extends Component {
  state = {
    setVisible: false,
    nome: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      indexProducts: [],
      products: [],
      index: -1
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showDrawer = () => {
    this.setState({
      setVisible: true
    });
  };

  onClose = () => {
    this.setState({
      setVisible: false
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
            // name: this.props.auth.username,
          }
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
              end: moment()
            }
          }
        }
      }
    };

    const { status, data } = await getAllReservaTecnicoReturn(query);

    if (status === 200) {
      data.map(item => {
        const index = R.findIndex(R.propEq("produto", item.produto))(
          this.state.products
        );
        if (index === -1) {
          this.setState(prevState => {
            return { products: [...prevState.products, item] };
          });
        } else {
          this.setState(prevState => {
            const { products } = prevState;
            const { amount } = products[index];

            products.splice(index, 1, {
              ...products[index],
              amount: amount + item.amount
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

  render() {
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

        <div className="div-card-externo">
          {this.state.products.map((item, index) => (
            <div
              className="div-linha-externo"
              select={
                this.state.indexProducts.filter(
                  indexProduct => index === indexProduct
                ).length !== 0
                  ? "true"
                  : "false"
              }
              onClick={() =>
                this.setState(prevState => {
                  if (
                    prevState.indexProducts.filter(idx => idx === index)
                      .length !== 0
                  ) {
                    return {
                      indexProducts: [
                        ...prevState.indexProducts.filter(idx => idx !== index)
                      ]
                    };
                  } else {
                    return {
                      indexProducts: [
                        ...prevState.indexProducts.filter(idx => idx !== index),
                        index
                      ]
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

        {/* <div className="div-card-externo">
          {this.state.products
            .filter((teste) => teste.serial)
            .map((item, index) => (
              <div
                className="div-linha-externo"
                select={
                  this.state.indexProducts.filter(
                    (indexProduct) => index === indexProduct
                  ).length !== 0
                    ? "true"
                    : "false"
                }
                onClick={() =>
                  this.setState((prevState) => {
                    if (
                      prevState.indexProducts.filter((idx) => idx === index)
                        .length !== 0
                    ) {
                      return {
                        indexProducts: [
                          ...prevState.indexProducts.filter(
                            (idx) => idx !== index
                          ),
                        ],
                      };
                    } else {
                      return {
                        indexProducts: [
                          ...prevState.indexProducts.filter(
                            (idx) => idx !== index
                          ),
                          index,
                        ],
                      };
                    }
                  })
                }
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
                  <div className="div-quant-externo">{item.amount}</div>
                  <div className="div-item-externo">{item.produto}</div>
                  <PlusOutlined onClick={() => this.setState({ index })} />
                </div>
                {this.state.index === index && (
                  <Select
                    style={{ width: "90%", margin: "5px 5%" }}
                    mode="tags"
                    // onChange={handleChange}
                    tokenSeparators={[","]}
                  >
                    {children}
                  </Select>
                )}
              </div>
            ))}
        </div> */}
        <div className="div-buttons-externo">
          <Button>Voltar</Button>
          <Button>Avançar</Button>
        </div>
        <this.Drawer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(ExternoContainer);
