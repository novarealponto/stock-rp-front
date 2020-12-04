import React, { Component } from 'react';
import uuidValidate from 'uuid-validate';
import { has } from 'ramda';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginContainer from '../../containers/Login';
import { signIn } from '../../services/auth';
import { onSubmit } from './LoginRedux/action';

class LoginPage extends Component {
  state = {
    authenticated: false,
  };

  verifyAuth = () => {
    if (has('auth', this.props) && has('token', this.props.auth)) {
      return this.setState({ authenticated: uuidValidate(this.props.auth.token) });
    }
  };

  success = () => {
    message.success('Bem-vindo ao Estoque');
  };

  error = () => {
    message.error('Inautorizado, confira username e senha por favor');
  };

  handleSubmit = async ({ username, password }) => {
    try {
      const { status, data } = await signIn({
        username,
        password,
        typeAccount: {
          stock: true,
        },
      });

      if (Number(status) === 401) {
        throw new Error('User UNAUTHORIZED');
      }

      await this.props.onSubmit(data);
      this.verifyAuth();
      return this.state.authenticated && this.success();
    } catch (error) {
      return this.error();
    }
  };

  componentDidMount = () => {
    this.verifyAuth();
  };

  render() {
    return this.state.authenticated ? (
      <Redirect to="/logged" />
    ) : (
      <LoginContainer onSubmit={this.handleSubmit} />
    );
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
