import React, { Component } from "react";
import "./index.css";

import { connect } from "react-redux";
import moment from "moment";
import { Table } from "antd";

import { getAllReservaTecnicoReturn } from "../../../../services/reservaTecnico";

function NestedTable() {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
    });
  }

  return (
    <div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

class ExternoContainer extends Component {
  componentDidMount = async () => {
    const query = {
      filters: {
        technician: {
          specific: {
            name: this.props.auth.username,
          },
        },
        // os: {
        //   specific: {
        //     date: { start: moment(), end: data },
        //   },
        // },
        technicianReserve: {
          specific: {
            data: { start: moment(), end: moment() },
          },
        },
      },
    };

    const response = await getAllReservaTecnicoReturn(query);

    console.log(response);
  };
  render() {
    return (
      <div className="div-card-emprestimo-report">
        <div className="title-emprestimo-report">
          <h1 className="h1-Gentrada">Externos</h1>
        </div>
        <NestedTable />
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
