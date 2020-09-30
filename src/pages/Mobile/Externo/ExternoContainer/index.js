import React, { Component } from "react";
import "./index.css";

import { Table } from "antd";

function NestedTable() {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" }
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00"
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

export default ExternoContainer;
