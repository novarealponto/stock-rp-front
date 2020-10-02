import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import moment from "moment";

import { getAllReservaTecnicoReturn } from "../../../../services/reservaTecnico";
import { UserOutlined } from "@ant-design/icons";

import { Steps, Modal, Button, message } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: "First-content"
  },
  {
    title: "Second",
    content: "Second-content"
  },
  {
    title: "Last",
    content: "Last-content"
  }
];

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

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  ModalDetalhes = () => (
    <Modal
      title="Basic Modal"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleOk}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <p>Some contents...</p>
    </Modal>
  );

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
    const { current } = this.state;
    return (
      <div className="div-card-emprestimo-report">
        <div className="title-emprestimo-report">
          <h1 className="h1-Gentrada">
            Externos
            <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          </h1>
        </div>
        <button onClick={this.showModal}>MODAL</button>
        <this.ModalDetalhes />
        <>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </>
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
