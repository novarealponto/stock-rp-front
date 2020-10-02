import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import moment from "moment";

import { getAllReservaTecnicoReturn } from "../../../../services/reservaTecnico";
import { UserOutlined } from "@ant-design/icons";

import { Button, message } from "antd";

class ExternoContainer extends Component {
  state = { visible: false };

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  componentDidMount = async () => {
    const query = {
      filters: {
        technician: {
          specific: {
            name: this.props.auth.username
          }
        },
        // os: {
        //   specific: {
        //     date: { start: moment(), end: data },
        //   },
        // },
        technicianReserve: {
          specific: {
            data: { start: moment(), end: moment() }
          }
        }
      }
    };

    const response = await getAllReservaTecnicoReturn(query);

    console.log(response);
  };

  render() {
    return (
      <div className="div-card-emprestimo-report">
        <div className="title-emprestimo-report">
          <h1 className="h1-Gentrada">
            Externos
            <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          </h1>
        </div>

        <div className="div-card-externo">
          <div className="div-linha-externo">
            <div className="div-quant-externo">1</div>
            <div className="div-item-externo">
              RELÓGIO CARTOGRAFICO HENRY VEGA BIOMETRICO (COM BATERIA)
            </div>
          </div>
        </div>
        <div className="div-buttons-externo">
          <Button>Voltar</Button> <Button>Avançar</Button>
        </div>
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
