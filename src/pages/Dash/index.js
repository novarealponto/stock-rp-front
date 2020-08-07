import React, { Component } from "react";
import "./index.css";

import { pdfRelatorioItems } from "../../services/utils/pdfStock";

import { PrinterOutlined } from "@ant-design/icons";

// import { CreatePDF } from "../../services/pdf";

class Dash extends Component {
  // createPDF = async () => {
  //   await CreatePDF([]);
  // };
  render() {
    return (
      <div className="bg-wrapper-dash">
        {/* <PrinterOutlined onClick={pdfRelatorioItems} /> */}
        <img alt="example" src="../../bgDash1.png" className="image-dash" />
      </div>
    );
  }
}

export default Dash;
