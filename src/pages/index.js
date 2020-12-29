import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dash from './Dash'

import { auth } from '../services/auth'
import { Logout } from './Login/LoginRedux/action'
import AddKitRoute from './Gerenciar/Kit'
import * as R from 'ramda'
import CadastroFornecedorSupRoute from './Suprimentos/Cad.Fornecedor'
import CadastroProdutosSupRoute from './Suprimentos/Cad.Produtos'
import EditarFornecedorSupRoute from './Suprimentos/Edit.Fornecedor'
import EntradaSupRoute from './Suprimentos/Entrada'
import EmprestimoRoute from './Gerenciar/Emprestimo'
import EstoqueRoute from './Gerenciar/Estoque'
import GerenciarCadastrosSupRoute from './Suprimentos/Ger.Cadastros'
import GerenciarEntradaDashRoute from './Gerenciar/GerenciarEntrada'
import GerenciarEntradaRoute from './Gerenciar/Entrada'
import GerenciarEstoqueSupRoute from './Suprimentos/Ger.Estoque'
import GerenciarFornecedorRoute from './Gerenciar/GerenciarFornecedores'
import GerenciarProdutosDashRoute from './Gerenciar/GerenciarProdutos'
import GerenciarProdutoRoute from './Gerenciar/Produto'
import GerenciarTecnicoRoute from './Gerenciar/GerenciarTecnico'
import GerenciarUsuarioRoute from './Gerenciar/GerenciarUsuarios'
import NotificacaoRoute from './Gerenciar/Notificacoes'
import NovaEntradaRoute from './Cadastros/NovaEntrada'
import NovoFornecedorRoute from './Cadastros/NovoFornecedor'
import NovoTipoContaRoute from './Cadastros/NovoTipoConta'
import OsDashRoute from './Gerenciar/Os'
import Profile from './Profile'
import Product from './Product'
import RelatorioComprasRoute from './Relatorios/RelatorioCompras'
import RelatorioEmprestimoRoute from './Relatorios/RelatorioEmprestimo'
import RelatorioGastosRoute from './Relatorios/RelatorioGastos'
import RelatorioInternoRoute from './Relatorios/RelatorioInterno'
import RelatorioMapRoute from './Relatorios/RelatorioMapeamento'
import RelatorioMLRoute from './Relatorios/RelatorioML'
import RelatorioOsRoute from './Relatorios/RelatorioOs'
import RelatorioPerdaRoute from './Relatorios/RelatorioPerda'
import RelatorioSuprimentosRoute from './Relatorios/RelatorioSuprimentos'
import RelatorioVendasRoute from './Relatorios/RelatorioVendas'
import ReservaExternoRoute from './Reservas/ReservaOs'
import ReservaInternoRoute from './Reservas/ReservaInterno'
import ReservaKitRoute from './Reservas/ReservaKit'
import ReservaMLRoute from './Reservas/ReservaML'
import RomanieoRoute from './Reservas/Romaneio'
import SaidaSupRoute from './Suprimentos/Saida'
import SearchOsRoute from './Gerenciar/SearchOs'
import TechnicianRoute from './Technician'
import uuidValidate from 'uuid-validate'
import User from './User'
import Os from './Manager/Os'

class PagesRoute extends Component {
  state = {
    auth: true,
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

  logout = async () => {
    await this.props.Logout(this.props.auth.token)
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

  componentDidMount = async () => {
    await this.auth()

    await this.forceLogout()
  }

  render() {
    if (this.state.auth) {
      return (
        <Switch>
          <Route exact path="/logged/dash" component={Dash} />
          <Route path="/logged/user" component={User} />
          <Route path="/logged/novoTipoConta" component={NovoTipoContaRoute} />
          <Route path="/logged/novoFornecedor" component={NovoFornecedorRoute} />
          <Route path="/logged/product" component={Product} />
          <Route
            path="/logged/gerenciarProduto"
            component={GerenciarProdutoRoute}
          />
          <Route path="/logged/entrada" component={NovaEntradaRoute} />
          <Route
            path="/logged/gerenciarEntrada"
            component={GerenciarEntradaRoute}
          />
          <Route path="/logged/estoque" component={EstoqueRoute} />
          <Route path="/logged/reservaKit" component={ReservaKitRoute} />
          <Route path="/logged/romaneio" component={RomanieoRoute} />
          <Route path="/logged/Rexterno" component={ReservaExternoRoute} />
          <Route path="/logged/reservaKitAdd" component={AddKitRoute} />
          <Route path="/logged/reservaML" component={ReservaMLRoute} />
          <Route path="/logged/relatorioOs" component={RelatorioOsRoute} />
          <Route path="/logged/Rinterno" component={ReservaInternoRoute} />
          <Route
            path="/logged/relatorioEmprestimo"
            component={RelatorioEmprestimoRoute}
          />
          <Route path="/logged/relatorioPerda" component={RelatorioPerdaRoute} />
          <Route path="/logged/relatorioMap" component={RelatorioMapRoute} />
          <Route path="/logged/relatorioML" component={RelatorioMLRoute} />
          <Route
            path="/logged/relatorioCompras"
            component={RelatorioComprasRoute}
          />
          <Route
            path="/logged/relatorioGastos"
            component={RelatorioGastosRoute}
          />
          <Route
            path="/logged/relatorioInterno"
            component={RelatorioInternoRoute}
          />
          <Route
            path="/logged/relatorioVendas"
            component={RelatorioVendasRoute}
          />
          <Route
            path="/logged/relatorioSuprimentos"
            component={RelatorioSuprimentosRoute}
          />
          <Route path="/logged/searchOs" component={SearchOsRoute} />
          <Route exact path="/logged/Os/manager" component={Os} />
          <Route path="/logged/Os" component={OsDashRoute} />
          <Route path="/logged/profile" component={Profile} />
          <Route
            path="/logged/gerenciarProdutosDash"
            component={GerenciarProdutosDashRoute}
          />
          <Route
            path="/logged/gerenciarFornecedor"
            component={GerenciarFornecedorRoute}
          />
          <Route
            path="/logged/gerenciarUsuario"
            component={GerenciarUsuarioRoute}
          />
          <Route
            path="/logged/gerenciarTecnico"
            component={GerenciarTecnicoRoute}
          />
          <Route
            path="/logged/entradaDash"
            component={GerenciarEntradaDashRoute}
          />
          <Route path="/logged/emprestimo" component={EmprestimoRoute} />
          <Route path="/logged/notificacao" component={NotificacaoRoute} />

          <Route path="/logged/technician/" component={TechnicianRoute} />

          {this.props.auth.suprimento && (
            <Switch>
              <Route path="/logged/saidaSup" component={SaidaSupRoute} />
              <Route
                path="/logged/gerenciarEstoqueSup"
                component={GerenciarEstoqueSupRoute}
              />
              <Route
                path="/logged/gerenciarCadastrosSup"
                component={GerenciarCadastrosSupRoute}
              />
              <Route path="/logged/entradaSup" component={EntradaSupRoute} />
              <Route
                path="/logged/cadastroProdutosSup"
                component={CadastroProdutosSupRoute}
              />
              <Route
                path="/logged/cadastroFornecedorSup"
                component={CadastroFornecedorSupRoute}
              />
              <Route
                path="/logged/fornecedorSup/atializar"
                component={EditarFornecedorSupRoute}
              />

              <Redirect to="/logged/dash" />
            </Switch>
          )}
          <Redirect to="/logged/dash" />
        </Switch>
      )
    } else {
      this.logout()
      return <Redirect to="/login" />
    }
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

export default connect(mapStateToProps, mapDispacthToProps)(PagesRoute)
