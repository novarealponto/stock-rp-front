import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SideBar from "../components/SideBar";

import PagesRoute from "../pages";
import ExternoContainer from "../pages/Mobile/Externo/ExternoContainer";
import { Logout } from "../pages/Login/LoginRedux/action";
import { auth } from "../services/auth";
import "./index.css";

class PrivateRoute extends Component {
  state = {
    auth: true,
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token);
  };

  auth = async () => {
    const value = {
      token: this.props.auth.token,
      username: this.props.auth.username,
    };

    let response = {};

    response = await auth(value).then((resp) =>
      this.setState({
        auth: resp ? resp.data : false,
      })
    );

    return response;
  };

  componentDidMount = async () => {
    await this.auth();
  };

  render() {
    if (this.state.auth) {
<<<<<<< HEAD
      if (!this.props.auth.tecnico) {
        return (
          <div className="div-main-route">
            <div className="div-sideBar">
              <SideBar />
            </div>
            <div className="div-body">
              <Switch>
                <Route path="/logged" component={PagesRoute} />
              </Switch>
            </div>
          </div>
        );
      } else {
        return (
          <div className="div-main-route">
            <div className="div-body-sSidebar">
              <Switch>
                <Route exact path="/logged" component={ExternoContainer} />
                <Redirect to="/logged" />
              </Switch>
            </div>
=======
      return (
        <div className="div-main-route">
          <div className="div-sideBar">
            <SideBar />
          </div>
          <div className="div-body">
            <Switch>
              <Route path="/logged" component={PagesRoute} />
            </Switch>
>>>>>>> fix mobile
          </div>
        );
      }
    } else {
      this.logout();
      return <Redirect to="/login" />;
    }
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout }, dispach);
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(PrivateRoute);
