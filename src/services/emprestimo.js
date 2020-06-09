import axios from "axios";
import { BACKEND_URL } from "./var";
import { store } from "../App";
import jsPDF from "jspdf";
import moment from "moment";

export const addEprestimo = async (value) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/emprestimo`, value, { headers: headers })
    .then((resp) => {
      response = resp;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const updateEprestimo = async (value) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .put(`${BACKEND_URL}/api/emprestimo`, value, { headers: headers })
    .then((resp) => {
      response = resp;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const getEprestimoService = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/emprestimo`, {
      headers: headers,
      params: { query },
    })
    .then((resp) => {
      response = resp;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const deleteEmprestimoService = async (value) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .delete(`${BACKEND_URL}/api/emprestimo`, {
      headers: headers,
      params: value,
    })
    .then((resp) => {
      response = resp;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

function addWrappedText({
  text,
  textWidth,
  doc,
  fontSize = 10,
  fontType = "normal",
  lineSpacing = 7,
  xPosition = 10,
  YPosition = 32,
  initialYPosition = 10,
  pageWrapInitialYPosition = 10,
  index = 0,
  rows = 1,
}) {
  if (!!text) {
    var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
    var pageHeight = doc.internal.pageSize.height; // Get page height, well use this for auto-paging
    doc.setFontType(fontType);
    doc.setFontSize(fontSize);
    var cursorY = initialYPosition + 7 * index;

    textLines.forEach((lineText) => {
      if (cursorY > pageHeight) {
        // Auto-paging
        doc.addPage();
        cursorY = pageWrapInitialYPosition;
      }
      doc
        .text(
          xPosition + textWidth / 2,
          cursorY +
            (rows - 1) +
            2.5 * (rows - doc.splitTextToSize(text, textWidth).length),
          lineText,
          "center"
        )
        .rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
      cursorY += lineSpacing;
    });
  } else {
    doc.rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
  }
}

function title(type, doc) {
  if (type === "Em Cliente" || type === "Reservados") {
    addWrappedText({
      text: "Produto", // Put a really long string here
      textWidth: 80,
      doc,
      fontSize: "12",
      fontType: "bold",
      lineSpacing: 5, // Space between lines
      xPosition: 5, // Text offset from left of document
      YPosition: 25,
      initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
    });
    addWrappedText({
      text: "Razão Social", // Put a really long string here
      textWidth: 80,
      doc,
      fontSize: "12",
      fontType: "bold",
      lineSpacing: 5, // Space between lines
      xPosition: 85, // Text offset from left of document
      YPosition: 25,
      initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
    });
  } else {
    addWrappedText({
      text: "Produto", // Put a really long string here
      textWidth: 120,
      doc,
      fontSize: "12",
      fontType: "bold",
      lineSpacing: 5, // Space between lines
      xPosition: 5, // Text offset from left of document
      YPosition: 25,
      initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
    });
    addWrappedText({
      text: "Fabricante", // Put a really long string here
      textWidth: 40,
      doc,
      fontSize: "12",
      fontType: "bold",
      lineSpacing: 5, // Space between lines
      xPosition: 125, // Text offset from left of document
      YPosition: 25,
      initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
    });
  }
  addWrappedText({
    text: "Nº Série", // Put a really long string here
    textWidth: 40,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 165, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
}

function header(type, doc, page, total) {
  doc.setFont("times");
  doc.setFontType("bold");
  doc.setFontSize(20);
  doc.text(15, 15, type);

  doc.setFontSize(10);
  doc.setFontType("italic");
  doc.text(150, 15, moment().format("lll"));

  title(type, doc);

  doc
    .setFontSize(10)
    .setFontType("italic")
    .text(105, 290, `Página ${page} de ${total}`, "center");
}

export const CreatePDFEmprestimo = async (type, rows) => {
  var doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    hotfixes: [], // an array of hotfix strings to enable
  });

  moment.locale("pt");

  let totalRows = 0;
  let total = 1;

  doc.setFontSize(10);
  rows.map((row) => {
    if (type === "Em Cliente" || type === "Reservados") {
      const height = Math.max.apply(null, [
        doc.splitTextToSize(row.name, 80).length,
        doc.splitTextToSize(row.razaoSocial, 80).length,
        doc.splitTextToSize(row.serialNumber, 40).length,
      ]);
      if (totalRows + height > 36) {
        totalRows = 0;
        total = total + 1;
      }
      totalRows = totalRows + height;
    } else {
      // console.log(totalRows);
      const height = Math.max.apply(null, [
        doc.splitTextToSize(row.name, 120).length,
        doc.splitTextToSize(row.mark, 40).length,
        doc.splitTextToSize(row.serialNumber, 40).length,
      ]);

      if (totalRows + height > 36) {
        totalRows = 0;
        total = total + 1;
      }

      totalRows = totalRows + height;
    }
  });

  let page = 1;
  header(type, doc, page, total);

  let index = 0;

  rows.map((row) => {
    if (type === "Em Cliente" || type === "Reservados") {
      const height = Math.max.apply(null, [
        doc.splitTextToSize(row.name, 80).length,
        doc.splitTextToSize(row.razaoSocial, 80).length,
        doc.splitTextToSize(row.serialNumber, 40).length,
      ]);

      if (index + height > 36) {
        index = 0;
        doc.addPage();
        page = page + 1;
        header(type, doc, page, total);
      }

      addWrappedText({
        text: row.name.trim(), // Put a really long string here
        textWidth: 80,
        doc,
        fontSize: "10",
        fontType: "normal",
        lineSpacing: 5, // Space between lines
        xPosition: 5, // Text offset from left of document
        initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
        pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
        index,
        rows: height,
      });

      addWrappedText({
        text: row.razaoSocial.trim(), // Put a really long string here
        textWidth: 80,
        doc,
        fontSize: "10",
        fontType: "normal",
        lineSpacing: 5, // Space between lines
        xPosition: 85, // Text offset from left of document
        initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
        pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
        index,
        rows: height,
      });

      addWrappedText({
        text: row.serialNumber.trim(), // Put a really long string here
        textWidth: 40,
        doc,
        fontSize: "10",
        fontType: "normal",
        lineSpacing: 5, // Space between lines
        xPosition: 165, // Text offset from left of document
        initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
        pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
        index,
        rows: height,
      });

      index = index + height;
      // eslint-disable-next-line array-callback-return
      return;
    } else {
      const height = Math.max.apply(null, [
        doc.splitTextToSize(row.name, 120).length,
        doc.splitTextToSize(row.mark, 40).length,
        doc.splitTextToSize(row.serialNumber, 40).length,
      ]);

      if (index + height > 36) {
        index = 0;
        doc.addPage();
        page = page + 1;
        header(type, doc, page, total);
      }

      addWrappedText({
        text: row.name.trim(), // Put a really long string here
        textWidth: 120,
        doc,
        fontSize: "10",
        fontType: "normal",
        lineSpacing: 5, // Space between lines
        xPosition: 5, // Text offset from left of document
        initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
        pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
        index,
        rows: height,
      });
      addWrappedText({
        text: row.mark.trim(), // Put a really long string here
        textWidth: 40,
        doc,
        fontSize: "10",
        fontType: "normal",
        lineSpacing: 5, // Space between lines
        xPosition: 125, // Text offset from left of document
        initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
        pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
        index,
        rows: height,
      });
      addWrappedText({
        text: row.serialNumber.trim(), // Put a really long string here
        textWidth: 40,
        doc,
        fontSize: "10",
        fontType: "normal",
        lineSpacing: 5, // Space between lines
        xPosition: 165, // Text offset from left of document
        initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
        pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
        index,
        rows: height,
      });

      index = index + height;
      // eslint-disable-next-line array-callback-return
      return;
    }
  });

  doc.save(`${type}_${moment().format("L")}.pdf`);
};
