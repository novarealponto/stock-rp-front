import React, { Component } from "react";
import "./index.css";

import { pdfRelatorioItems, getBug } from "../../services/utils/pdfStock";

import { PrinterOutlined } from "@ant-design/icons";
import { Button } from "antd";

// import { CreatePDF } from "../../services/pdf";

class Dash extends Component {
  // createPDF = async () => {
  //   await CreatePDF([]);
  // };
  render() {
    return (
      <div className="bg-wrapper-dash">
        {/* <PrinterOutlined onClick={pdfRelatorioItems} /> */}
        <Button onClick={async () => await getBug()}>teste</Button>
        <img alt="example" src="../../bgDash1.png" className="image-dash" />
      </div>
    );
  }
}

export default Dash;
