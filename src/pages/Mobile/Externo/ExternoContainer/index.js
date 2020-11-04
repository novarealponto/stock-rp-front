import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import uuidValidate from 'uuid-validate';
import { updateSenha } from '../../../../services/password';

import { auth } from '../../../../services/auth';
import { Logout } from '../../../Login/LoginRedux/action';

import { getAllReservaTecnicoReturn } from '../../../../services/reservaTecnico';
import { getAllEquipsService } from '../../../../services/equip';
import { getTodasOs, associarEquipsParaOsPart } from '../../../../services/reservaOs';

import { Button, Drawer, Select, InputNumber, message, Input } from 'antd';

import { Howl, Howler } from 'howler';
import ha from './sound.mp3';

const { Option } = Select;

class ExternoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      indexProducts: [],
      products: [],
      setVisible: false,
      messageError: false,
      messageSuccess: false,
      auth: true,
      user: this.props.auth.username,
      pass: '',
      newPass: '',
      confPass: '',
      os: [],
      index: -1,
      oId: null
    };
  }

  hasAuth = R.has('auth');
  hasToken = R.has('token');

  forceLogout = async () => {
    if (!this.hasAuth(this.props)) {
      await this.logout();
    } else if (!this.hasToken(this.props.auth)) {
      await this.logout();
    } else if (!uuidValidate(this.props.auth.token)) {
      await this.logout();
    }
  };

  error = () => {
    message.error('Os dados do usuário não foram atualizados');
  };

  success = () => {
    message.success('Os dados do usuário foram atualizados');
  };

  messageErrorPass = () => {
    message.error('As duas senhas não coincidem');
  };

  messagePassEqual = () => {
    message.error('A senha atual não pode ser a mesma que a antiga');
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token);
  };

  saveNewPassword = async () => {
    if (this.state.pass === this.state.newPass) {
      this.messagePassEqual();
    } else if (this.state.newPass !== this.state.confPass) {
      this.messageErrorPass();
    } else {
      const value = {
        username: this.state.user,
        oldPassword: this.state.pass,
        newPassword: this.state.newPass
      };

      this.setState({
        loading: true
      });

      const resposta = await updateSenha(value);

      if (resposta.status === 422) {
        this.setState({
          messageError: true
        });
        await this.error();
        this.setState({
          loading: false,
          messageError: false
        });
      }
      if (resposta.status === 200) {
        this.setState({
          newPass: '',
          pass: '',
          confPass: '',
          messageSuccess: true,
          editar: false
        });
        await this.success();
        this.setState({
          loading: false,
          messageSuccess: false
        });
      }
    }
  };

  auth = async () => {
    const value = {
      token: this.props.auth.token,
      username: this.props.auth.username
    };

    let response = {};

    response = await auth(value).then(resp =>
      this.setState({
        auth: resp ? resp.data : false
      })
    );

    return response;
  };

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

  cancelUpdate = () => {
    this.setState({
      setVisible: false,
      user: this.props.auth.username,
      pass: '',
      newPass: '',
      confPass: ''
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
    await this.auth();

    await this.forceLogout();

    await this.getOs();
  };

  getOs = async () => {
    const query = {
      paranoid:true,
      filters: {
        technician: {
          specific: {
            // name: "TECNICO 1",
            id: this.props.auth.technicianId
            // name: this.props.auth.username,
          }
        },
        os: {
          specific: {
            date:
              this.props.auth.technicianId !== '0c451d60-f837-4a9e-b8a6-cab41a788133'
                ? {
                    start: moment(),
                    end: moment()
                  }
                : undefined
          }
        },
        technicianReserve: {
          specific: {
            data: {
              start: moment(),
              end: moment()
            }
          }
        },
      }
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
            id: this.props.auth.technicianId
          }
        },
        technicianReserve: {
          specific: {
            data:
              this.props.auth.technicianId !== '0c451d60-f837-4a9e-b8a6-cab41a788133'
                ? {
                    start: moment(),
                    end: moment()
                  }
                : undefined
          }
        }
      },
      osPartsId: null
    };
    const { status, data } = await getAllReservaTecnicoReturn(query);

    if (status === 200) {
      data.forEach(item => {
        const index = R.findIndex(R.propEq('produto', item.produto))(this.state.products);
        const osPart = R.find(R.propEq('name', item.produto))(
          R.find(R.propEq('id', this.state.oId))(this.state.os).products
        );
        if (index === -1) {
          if (!osPart) return;
          const osPartId = osPart.id;
          this.setState(prevState => {
            return { products: [...prevState.products, { ...item, osPartId }] };
          });
        } else {
          this.setState(prevState => {
            const { products } = prevState;
            const { amount, serialNumbers } = products[index];

            products.splice(index, 1, {
              ...products[index],
              amount: amount + item.amount,
              serialNumbers: [...serialNumbers, ...item.serialNumbers]
            });
            return { products };
          });
        }
      });
      await Promise.all(
        this.state.products.map(async (item, index) => {
          const {
            data: { count }
          } = await getAllEquipsService({
            filters: {
              equip: {
                specific: {
                  osPartId: item.osPartId
                }
              }
            }
          });
          const amount =
            R.find(R.propEq('name', item.produto))(
              R.find(R.propEq('id', this.state.oId))(this.state.os).products
            ).quantMax - count;

          this.setState(prevState => {
            const { products } = prevState;

            products.splice(index, 1, {
              ...products[index],
              amount
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
          Perfil <LogoutOutlined size="large" onClick={this.logout} style={{ cursor: 'pointer' }} />{' '}
        </div>
      }
      width={'100%'}
      placement="right"
      closable={false}
      onClose={this.onClose}
      visible={this.state.setVisible}
    >
      <Input
        className="input-drawer-externo"
        bordered={false}
        onChange={this.onChange}
        placeholder="user"
        value={this.state.user}
        readOnly
      ></Input>
      <Input.Password
        className="input-drawer-externo"
        bordered={false}
        onChange={this.onChange}
        type="password"
        name="pass"
        value={this.state.pass}
        placeholder="Senha atual"
      ></Input.Password>
      <Input.Password
        className="input-drawer-externo"
        bordered={false}
        onChange={this.onChange}
        type="password"
        value={this.state.newPass}
        name="newPass"
        placeholder="Nova senha"
      ></Input.Password>
      <Input.Password
        className="input-drawer-externo"
        bordered={false}
        name="confPass"
        value={this.state.confPass}
        type="password"
        onChange={this.onChange}
        placeholder="Confirmar senha"
      ></Input.Password>
      <div className="div-button-drawer-externo">
        <Button size="large" onClick={this.cancelUpdate}>
          Voltar
        </Button>
        <Button size="large" onClick={this.saveNewPassword}>
          Salvar
        </Button>
      </div>
      <div className="footer-drawer-externo">Developed by Jessi Castro and Guilherme Stain</div>
    </Drawer>
  );

  ItemList = () => {
    const { current } = this.state;

    switch (current) {
      case 0:
        return (
          <div className="div-card-externo">
            {console.log(this.state.os)}
            {this.state.os.map(item => (
              <div
                className="div-linha-externo"
                select={this.state.oId === item.id ? 'true' : 'false'}
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
              .filter(item => item.amount > 0)
              .map((item, index) => (
                <div
                  className="div-linha-externo"
                  select={
                    this.state.indexProducts.filter(indexProduct => index === indexProduct.index)
                      .length !== 0
                      ? 'true'
                      : 'false'
                  }
                  onClick={async () => {
                    this.setState(prevState => {
                      if (prevState.indexProducts.filter(idx => idx.index === index).length !== 0) {
                        return {
                          indexProducts: [
                            ...prevState.indexProducts.filter(idx => idx.index !== index)
                          ]
                        };
                      } else {
                        return {
                          indexProducts: [
                            ...prevState.indexProducts.filter(idx => idx.index !== index),
                            {
                              ...item,
                              index,
                              serialNumersSelects: [],
                              quantidadeSaida: 0
                            }
                          ]
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '48px'
                    }}
                  >
                    <div className="div-item-externo">{item.produto}</div>
                  </div>
                  {item.serial ? (
                    <Select
                      style={{ width: '90%', margin: '5px 5% 10px' }}
                      mode="tags"
                      value={item.serialNumersSelects}
                      onChange={e =>
                        this.setState(prevState => {
                          const { indexProducts } = this.state;
                          indexProducts.splice(index, 1, {
                            ...item,
                            serialNumersSelects: e.slice(0, item.amount)
                          });

                          return { indexProducts };
                        })
                      }
                      tokenSeparators={[',']}
                    >
                      {item.serialNumbers.map(serialNumber => (
                        <Option key={serialNumber}>{serialNumber}</Option>
                      ))}
                    </Select>
                  ) : (
                    <InputNumber
                      min={0}
                      max={item.amount}
                      value={item.quantidadeSaida}
                      onChange={quantidadeSaida => {
                        this.setState(prevState => {
                          const { indexProducts } = prevState;
                          indexProducts.splice(index, 1, {
                            ...item,
                            quantidadeSaida
                          });

                          return { indexProducts };
                        });
                      }}
                      style={{ width: '90%', margin: '5px 0 10px' }}
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

  soundPlay = () => {
    const sound = new Howl({
      src: ha,
      html5: true,
      sprite: {
        laser: [15100, 1500]
      }
    });

    sound.play('laser');
    // setTimeout(function() {
    // sound.play("laser");
    // }, 3000);
  };

  render() {
    Howler.volume(1);
    return (
      <div className="div-card-emprestimo-report">
        <div className="title-emprestimo-report">
          <h1 className="h1-externo">
            {this.props.auth.username.replace(/\./g, ' ')}
            <UserOutlined
              style={{
                fontSize: '25px',
                cursor: 'pointer',
                marginLeft: '20px'
              }}
              onClick={this.showDrawer}
            />
          </h1>
        </div>

        <this.ItemList />

        <div className="div-buttons-externo">
          <Button
            size="large"
            onClick={() => {
              this.setState(prevState => {
                return {
                  products: prevState.current === 1 ? [] : prevState.products,
                  current: R.max(prevState.current - 1, 0)
                };
              });
            }}
          >
            Voltar
          </Button>
          <Button
            size="large"
            onClick={async () => {
              // this.soundPlay()
              if (this.state.current === 0) await this.getAllReservaTecnicoReturn();
              if (this.state.current === 2) {
                const { status } = await associarEquipsParaOsPart({
                  technicianId: this.props.auth.technicianId,
                  osParts: this.state.indexProducts
                });
                if (status === 200) {
                  await this.setState({
                    current: 0,
                    indexProducts: [],
                    products: [],
                    os: [],
                    index: -1,
                    oId: null
                  });
                  await this.getOs();
                }
              } else {
                this.setState(prevState => {
                  return {
                    current: R.min(prevState.current + 1, 2)
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

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout }, dispach);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(ExternoContainer);
