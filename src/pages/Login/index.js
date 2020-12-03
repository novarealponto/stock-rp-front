import React, { Component } from 'react';

import uuidValidate from 'uuid-validate';

import * as R from 'ramda';

import { message } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import LoginContainer from '../../containers/Login';

import { signIn } from '../../services/auth';
import { onSubmit } from './LoginRedux/action'

class LoginPage extends Component {
  state = {
    authenticated: false,
  }

  verifyAuth = () => {
          if (this.hasAuth(this.props)) {
      if (this.hasToken(this.props.auth)) {
        if (uuidValidate(this.props.auth.token)) {
          return this.setState({authenticated : true})
        }
      }
    }
  }

  hasAuth = R.has('auth');
  hasToken = R.has('token');

  success = () => {
    message.success('Bem-vindo ao Estoque');
  };

  handleSubmit = async ({ username, password }) => {
    const { status, data } = await signIn({ username, password });

    switch (status) {
      case 200:
        await this.props.onSubmit(data);
        this.verifyAuth()

        if(this.state.authenticated) this.success();
        break;
      case 401:

        message.error("Inautorizado, confira username e senha por favor");

        break;
      default:
    }
  };

  componentDidMount = () => {
    this.verifyAuth()
  }

  render() {
    return this.state.authenticated ? <Redirect to="/logged" /> : <LoginContainer onSubmit={this.handleSubmit} />
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ onSubmit }, dispach);
}

export default connect(mapStateToProps, mapDispacthToProps)(LoginPage);
