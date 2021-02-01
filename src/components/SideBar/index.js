import React, { Component } from 'react'
import { Menu, Tooltip } from 'antd'
import './index.css'
import { Redirect } from 'react-router-dom'
import { Logout } from '../../pages/Login/LoginRedux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as R from 'ramda'
import uuidValidate from 'uuid-validate'

import { auth } from '../../services/auth'
import { hasNotifications } from '../../services/notificacao'
import {
  DollarCircleOutlined,
  ShoppingOutlined,
  UserOutlined,
  LogoutOutlined,
  StockOutlined,
  RetweetOutlined,
  AreaChartOutlined,
  AppleOutlined,
  FileSearchOutlined,
  AlertOutlined,
  PieChartOutlined,
  ShopOutlined,
  FileAddOutlined,
  FilePdfOutlined,
  PushpinOutlined,
  UserAddOutlined,
  SettingOutlined,
  BankOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

const SubMenu = Menu.SubMenu

class SideBar extends Component {
  state = {
    notificacao: false,
    current: '0',
    redirect: false,
    open: [],
    auth: true,
  }

  hasNotifications = async () => {
    await hasNotifications().then((resp) =>
      this.setState({
        notificacao: resp.data,
      })
    )
  }

  auth = async () => {
    const value = {
      token: this.props.auth.token,
      username: this.props.auth.username,
    }

    let response = {}

    response = await auth(value).then((resp) =>
      this.setState({
        auth: resp ? resp.data : false,
      })
    )

    return response
  }

  hasAuth = R.has('auth')
  hasToken = R.has('token')

  forceLogout = async () => {
    if (!this.hasAuth(this.props)) {
      await this.logout()
    } else if (!this.hasToken(this.props.auth)) {
      await this.logout()
    } else if (!uuidValidate(this.props.auth.token)) {
      await this.logout()
    }
  }

  componentDidMount = async () => {
    await this.forceLogout()
  }

  logout = async () => {
    await this.props.Logout(this.props.auth.token)

    this.setState({
      current: 'logout',
      redirect: true,
    })
  }

  handleClickCompany = async (current, keyPath) => {
    await this.auth()

    if (!this.state.auth) {
      await this.logout()
      return
    }

    this.setState({
      current,
      redirect: true,
      open: [keyPath],
    })
  }

  changeRedirectState = () => {
    this.setState({
      redirect: false,
    })
  }

  handleClickAtalhos = async (current, keyPath) => {
    await this.auth()

    if (!this.state.auth) {
      await this.logout()
      return
    }

    this.setState({
      current,
      redirect: true,
      open: [keyPath],
    })
  }

  handleClick = async (e) => {
    await this.auth()

    if (!this.state.auth) {
      await this.logout()
      return
    }

    this.setState({
      current: e.key,
      redirect: true,
      open: [e.keyPath[1]],
    })
  }

  render() {
    if (this.state.redirect) {
      this.changeRedirectState()
      switch (this.state.current) {
        case 'novoUsuario_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/user/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'novoTipoConta_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/novoTipoConta/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'newTechnician_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/technician/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'novoProduto_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/product/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'productType':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/productType/manager',
                state: { from: this.props.location },
              }}
            />
          )
        case 'novoFornecedor_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/novoFornecedor/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarProduto_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/product/manager',
                state: { from: this.props.location },
              }}
            />
          )
        case 'entrada_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/entrada/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'entrada_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/gerenciarEntrada/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'estoque_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/stock/manager',
                state: { from: this.props.location },
              }}
            />
          )
        case 'reservaKit_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/reservaKit/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'reservaKit_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/reservaKitAdd/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'romaneio_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/romaneio/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'Rexterno_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/os/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'externo_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/externo/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'Rinterno_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/Rinterno/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'Os_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/os/manager',
                state: { from: this.props.location },
              }}
            />
          )
        case 'searchOs_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/searchOs/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'reservaML_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/reservaML/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioOs_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/relatorioOs/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioEmprestimo_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/relatorioEmprestimo/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioInterno_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/relatorioInterno/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioPerda_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/relatorioPerda/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioML_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/relatorioML/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioVendas_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/relatorioVendas/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioMap_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/relatorioMap/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioSup_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/RelatorioSuprimentos/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioCompras_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/RelatorioCompras/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'relatorioGastos_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/RelatorioGastos/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'profile_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/profile/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarProdutosDash_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/gerenciarProdutosDash/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarFornecedor_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/gerenciarFornecedor/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarUsuario_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/gerenciarUsuario/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarTecnico_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/gerenciarTecnico/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarEntrada_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/entradaDash/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'emprestimo_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/emprestimo/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarCadastrosSup_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/gerenciarCadastrosSup/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'gerenciarEstoqueSup_dash':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/gerenciarEstoqueSup/dash',
                state: { from: this.props.location },
              }}
            />
          )
        case 'cadastroFornecedorSup_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/cadastroFornecedorSup/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'cadastroProdutosSup_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/cadastroProdutosSup/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'entradaSup_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/entradaSup/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'saidaSup_add':
          return (
            <Redirect
              push
              to={{
                pathname: '/logged/saidaSup/add',
                state: { from: this.props.location },
              }}
            />
          )
        case 'logout':
          return <Redirect to="/login" />
        default:
          return <Redirect to="/logged/dash" />
      }
    }
    return (
      <div>
        <div className="menuIcon">
          <Tooltip placement="bottom" title={'Estoque'}>
            <StockOutlined
              className="menuIcon-icon"
              onClick={() => this.handleClickCompany('estoque_dash', 'Entrada')}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={'Entrada'}>
            <ShopOutlined
              className="menuIcon-icon"
              onClick={() => this.handleClickCompany('entrada_add')}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={'Perfil'}>
            <UserOutlined
              className="menuIcon-icon"
              onClick={() => this.handleClickCompany('profile_dash')}
            />
          </Tooltip>
          <Tooltip placement="bottom" title={'Logout'}>
            <LogoutOutlined
              key="logout"
              className="menuIcon-icon"
              onClick={() => this.logout()}
            />
          </Tooltip>
        </div>

        <Menu
          className="menu"
          theme="dark"
          onClick={this.handleClick}
          defaultOpenKeys={this.state.open}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="Cadastros"
            title={
              <span>
                <UserOutlined />
                <span>Cadastros</span>
              </span>
            }
          >
            <Menu.Item disabled={!this.props.auth.addUser} key="novoUsuario_add">
              <UserOutlined />
              Usuário
            </Menu.Item>
            {!this.props.auth.modulo && (
              <Menu.Item
                disabled={!this.props.auth.addTec}
                key="newTechnician_add"
              >
                <UserAddOutlined />
                Técnico
              </Menu.Item>
            )}
            <Menu.Item disabled={!this.props.auth.addProd} key="novoProduto_add">
              <SettingOutlined />
              Produto
            </Menu.Item>
            <Menu.Item
              disabled={!this.props.auth.addFonr}
              key="novoFornecedor_add"
            >
              <BankOutlined />
              Fornecedor
            </Menu.Item>
            <Menu.Item key="gerenciarProduto_dash">
              <UnorderedListOutlined />
              Gerenciar
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="Entrada"
            title={
              <span>
                <ShopOutlined />
                <span>Entrada</span>
              </span>
            }
          >
            <Menu.Item disabled={!this.props.auth.addEntr} key="entrada_add">
              <ShoppingCartOutlined />
              Nova
            </Menu.Item>
            <Menu.Item key="entrada_dash">
              <UnorderedListOutlined />
              Gerenciar
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu
            key="Compras"
            title={
              <span>
                <ShopOutlined />
                <span>Compras</span>
              </span>
            }
          >
            <Menu.Item disabled={!this.props.auth.addEntr} key="entrada_add">
              <ShoppingCartOutlined />
              Nova
            </Menu.Item>
          </SubMenu> */}
          <SubMenu
            key="Estoque"
            title={
              <span>
                <StockOutlined />
                <span>Estoque</span>
              </span>
            }
          >
            <Menu.Item key="estoque_dash">
              <UnorderedListOutlined />
              Gerenciar
            </Menu.Item>
          </SubMenu>

          {!this.props.auth.modulo && (
            <SubMenu
              key="Reserva"
              title={
                <span>
                  <PushpinOutlined />
                  <span>Reserva</span>
                </span>
              }
            >
              <Menu.Item
                disabled={!this.props.auth.addKitOut}
                key="reservaKit_dash"
              >
                <ShoppingCartOutlined />
                Kit
              </Menu.Item>
              <Menu.Item
                disabled={!this.props.auth.addOutPut}
                key="romaneio_dash"
              >
                <FilePdfOutlined />
                Romaneio
              </Menu.Item>
              {/* <Menu.Item disabled={!this.props.auth.gerROs} key="Rinterno_dash">
                <FileAddOutlined />
                Recepção
              </Menu.Item> */}
              <Menu.Item disabled={!this.props.auth.addROs} key="Rexterno_dash">
                <FileAddOutlined />
                Saídas
              </Menu.Item>
              {/* <Menu.Item disabled={!this.props.auth.addRML} key="reservaML_dash">
                <PieChartOutlined />
                E-Commerce
              </Menu.Item> */}
              <Menu.Item disabled={!this.props.auth.gerROs} key="Os_dash">
                <UnorderedListOutlined />
                Gerenciar Os
              </Menu.Item>
            </SubMenu>
          )}

          <SubMenu
            key="Emprestimo"
            title={
              <span>
                <RetweetOutlined />
                <span>{this.props.auth.modulo ? 'Modulo' : 'Empréstimo'}</span>
              </span>
            }
          >
            <Menu.Item key="emprestimo_dash">
              <UnorderedListOutlined />
              Gerenciar
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="Relatorios"
            title={
              <span>
                <AreaChartOutlined />
                <span>Relatórios</span>
              </span>
            }
          >
            {!this.props.auth.modulo && (
              <Menu.Item key="relatorioOs_dash">
                <FileSearchOutlined />
                Os
              </Menu.Item>
            )}
            {!this.props.auth.modulo && (
              <Menu.Item key="relatorioPerda_dash">
                <AlertOutlined />
                Perda
              </Menu.Item>
            )}

            {/* {!this.props.auth.modulo && (
              <Menu.Item key="relatorioML_dash">
                <PieChartOutlined />
                E-Commerce
              </Menu.Item>
            )} */}
            {!this.props.auth.modulo && (
              <Menu.Item key="relatorioVendas_dash">
                <ShoppingCartOutlined />
                Vendas
              </Menu.Item>
            )}
            {!this.props.auth.modulo && (
              <Menu.Item key="relatorioMap_dash">
                <FileSearchOutlined />
                Mapeamento
              </Menu.Item>
            )}
            {!this.props.auth.modulo && (
              <Menu.Item key="relatorioSup_dash">
                <AppleOutlined />
                Suprimentos
              </Menu.Item>
            )}
            {/* <Menu.Item key="relatorioInterno_dash">
              <UserOutlined />
              Interno
            </Menu.Item> */}
            <Menu.Item key="relatorioEmprestimo_dash">
              <RetweetOutlined />
              Empréstimo
            </Menu.Item>

            <Menu.Item key="relatorioCompras_dash">
              <ShoppingOutlined />
              Compras
            </Menu.Item>
            <Menu.Item key="relatorioGastos_dash">
              <DollarCircleOutlined />
              Gastos
            </Menu.Item>
          </SubMenu>

          {!this.props.auth.modulo && (
            <SubMenu
              key="Suprimentos"
              title={
                <span>
                  <AppleOutlined />
                  <span>Suprimentos</span>
                </span>
              }
            >
              <Menu.Item
                key="cadastroProdutosSup_add"
                disabled={!this.props.auth.suprimento}
              >
                <UnorderedListOutlined />
                Cad. Produtos
              </Menu.Item>
              <Menu.Item
                key="cadastroFornecedorSup_add"
                disabled={!this.props.auth.suprimento}
              >
                <UnorderedListOutlined />
                Cad. Fornecedor
              </Menu.Item>
              <Menu.Item
                key="entradaSup_add"
                disabled={!this.props.auth.suprimento}
              >
                <UnorderedListOutlined />
                Entrada
              </Menu.Item>
              <Menu.Item
                key="saidaSup_add"
                disabled={!this.props.auth.suprimento}
              >
                <UnorderedListOutlined />
                Saida
              </Menu.Item>
              <Menu.Item
                key="gerenciarCadastrosSup_dash"
                disabled={!this.props.auth.suprimento}
              >
                <UnorderedListOutlined />
                Ger. Cadastros
              </Menu.Item>
              <Menu.Item
                key="gerenciarEstoqueSup_dash"
                disabled={!this.props.auth.suprimento}
              >
                <UnorderedListOutlined />
                Ger. Estoque
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout }, dispach)
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(SideBar)
