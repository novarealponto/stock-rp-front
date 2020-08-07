import jsPDF from "jspdf";
import moment from "moment";
import axios from "axios";
import { BACKEND_URL } from "./var";
import { store } from "../App";

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

function title(doc) {
  addWrappedText({
    text: "Qtd", // Put a really long string here
    textWidth: 30,
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
    text: "Produto", // Put a really long string here
    textWidth: 100,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 35, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
  addWrappedText({
    text: "solicitante", // Put a really long string here
    textWidth: 40,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 135, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
  addWrappedText({
    text: "e-mail solicitante", // Put a really long string here
    textWidth: 60,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 175, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
  addWrappedText({
    text: "e-mail responsável", // Put a really long string here
    textWidth: 57,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 235, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
}

function header(doc, page, total) {
  doc.setFont("times");
  doc.setFontType("bold");
  doc.setFontSize(20);
  // doc.text(5, 15, "Saída suprimento");

  doc.setFontSize(10);
  doc.setFontType("italic");
  doc.text(200, 15, `2 de Jul de 2020 ${moment().format("lll")}`);

  title(doc);

  doc
    .setFontSize(10)
    .setFontType("italic")
    .text(146, 200, `Página ${page} de ${total}`, "center");
}

export const CreatePDF = async () => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/oapi/util/findAllTable`, {
      headers: headers,
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

  console.log(response);

  const rows = response.data;

  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    hotfixes: [], // an array of hotfix strings to enable
  });
  moment.locale("pt");
  let totalRows = 0;
  let total = 1;
  doc.setFontSize(10);
  rows.map((row) => {
    const height = Math.max.apply(null, [
      doc.splitTextToSize(row.amount.toString(), 30).length,
      doc.splitTextToSize(row.supProduct.name, 100).length,
      doc.splitTextToSize(row.solicitante, 40).length,
      doc.splitTextToSize(row.emailSolic, 60).length,
      doc.splitTextToSize(row.emailResp ? row.emailResp : "", 57).length,
    ]);
    if (totalRows + height > 22) {
      totalRows = 0;
      total = total + 1;
    }
    totalRows = totalRows + height;
  });
  let page = 1;
  header(doc, page, total);
  let index = 0;

  rows.map((row) => {
    const height = Math.max.apply(null, [
      doc.splitTextToSize(row.amount.toString(), 30).length,
      doc.splitTextToSize(row.supProduct.name, 100).length,
      doc.splitTextToSize(row.solicitante, 40).length,
      doc.splitTextToSize(row.emailSolic, 60).length,
      doc.splitTextToSize(row.emailResp ? row.emailResp : "", 57).length,
    ]);
    if (index + height > 22) {
      index = 0;
      doc.addPage();
      page = page + 1;
      header(doc, page, total);
    }

    addWrappedText({
      text: row.amount.toString(), // Put a really long string here
      textWidth: 30,
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
      text: row.supProduct.name.trim(), // Put a really long string here
      textWidth: 100,
      doc,
      fontSize: "10",
      fontType: "normal",
      lineSpacing: 5, // Space between lines
      xPosition: 35, // Text offset from left of document
      initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows: height,
    });
    addWrappedText({
      text: row.solicitante.trim(), // Put a really long string here
      textWidth: 40,
      doc,
      fontSize: "10",
      fontType: "normal",
      lineSpacing: 5, // Space between lines
      xPosition: 135, // Text offset from left of document
      initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows: height,
    });
    addWrappedText({
      text: row.emailSolic.trim(), // Put a really long string here
      textWidth: 60,
      doc,
      fontSize: "10",
      fontType: "normal",
      lineSpacing: 5, // Space between lines
      xPosition: 175, // Text offset from left of document
      initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows: height,
    });
    addWrappedText({
      text: row.emailResp ? row.emailResp : "", // Put a really long string here
      textWidth: 57,
      doc,
      fontSize: "10",
      fontType: "normal",
      lineSpacing: 5, // Space between lines
      xPosition: 235, // Text offset from left of document
      initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows: height,
    });

    index = index + height;
    // eslint-disable-next-line array-callback-return
  });

  doc.save(`${"saidaSup"}_${moment().format("L")}.pdf`);
};

//*********************************************************************************************** */

// function addWrappedText({
//   text,
//   textWidth,
//   doc,
//   fontSize = 10,
//   fontType = "normal",
//   lineSpacing = 7,
//   xPosition = 10,
//   YPosition = 32,
//   initialYPosition = 10,
//   pageWrapInitialYPosition = 10,
//   index = 0,
//   rows = 1,
// }) {
//   if (!!text) {
//     var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
//     var pageHeight = doc.internal.pageSize.height; // Get page height, well use this for auto-paging
//     doc.setFontType(fontType);
//     doc.setFontSize(fontSize);
//     var cursorY = initialYPosition + 7 * index;

//     textLines.forEach((lineText) => {
//       if (cursorY > pageHeight) {
//         // Auto-paging
//         doc.addPage();
//         cursorY = pageWrapInitialYPosition;
//       }
//       doc
//         .text(
//           xPosition + textWidth / 2,
//           cursorY +
//             (rows - 1) +
//             2.5 * (rows - doc.splitTextToSize(text, textWidth).length),
//           lineText,
//           "center"
//         )
//         .rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
//       cursorY += lineSpacing;
//     });
//   } else {
//     doc.rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
//   }
// }

// function title(doc) {
//   addWrappedText({
//     text: "CÓDIGO", // Put a really long string here
//     textWidth: 50,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 5, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "Razaosocial", // Put a really long string here
//     textWidth: 150,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 55, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "cnpj", // Put a really long string here
//     textWidth: 50,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 205, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "Qtde", // Put a really long string here
//     textWidth: 35,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 255, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });

//   addWrappedText({
//     text: "Produto", // Put a really long string here
//     textWidth: 150,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 5, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//     index: 1,
//   });
//   addWrappedText({
//     text: "Base Estoque", // Put a really long string here
//     textWidth: 65,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 155, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//     index: 1,
//   });
//   addWrappedText({
//     text: "Numero de Série", // Put a really long string here
//     textWidth: 70,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 220, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//     index: 1,
//   });
// }
// function header(doc, page, total) {
//   doc.setFont("times");
//   doc.setFontType("bold");
//   doc.setFontSize(20);
//   doc.text(5, 15, "E-COMERCE");

//   doc.setFontSize(10);
//   doc.setFontType("italic");
//   doc.text(200, 15, `2 de Jul de 2020 ${moment().format("lll")}`);

//   title(doc);

//   doc
//     .setFontSize(10)
//     .setFontType("italic")
//     .text(146, 200, `Página ${page} de ${9}`, "center");
// }

// export const CreatePDF = async () => {
//   const storeObject = store.getState();

//   const headers = {
//     token: storeObject.auth.token,
//     username: storeObject.auth.username,
//   };

//   let response = {};

//   await axios
//     .get(`${BACKEND_URL}/oapi/util/findAllTable`, {
//       headers: headers,
//     })
//     .then((resp) => {
//       response = resp;
//     })
//     .catch((error) => {
//       if (error.response) {
//         response = error.response;
//       } else {
//         console.log("Error", error.message);
//       }
//     });

//   console.log(response);

//   const rows = response.data;

//   var doc = new jsPDF({
//     orientation: "l",
//     unit: "mm",
//     format: "a4",
//     hotfixes: [], // an array of hotfix strings to enable
//   });
//   moment.locale("pt");
//   let totalRows = 0;
//   let total = 1;
//   doc.setFontSize(10);
//   // rows.map((row) => {
//   //   // const height = Math.max.apply(null, [
//   //   //   doc.splitTextToSize(row.amount.toString(), 30).length,
//   //   //   doc.splitTextToSize(row.supProduct.name, 100).length,
//   //   //   doc.splitTextToSize(row.solicitante, 40).length,
//   //   //   doc.splitTextToSize(row.emailSolic, 60).length,
//   //   //   doc.splitTextToSize(row.emailResp ? row.emailResp : "", 57).length,
//   //   // ]);
//   //   if (totalRows + height > 22) {
//   //     totalRows = 0;
//   //     total = total + 1;
//   //   }
//   //   totalRows = totalRows + height;
//   // });
//   let page = 1;
//   header(doc, page, total);
//   let index = 1;

//   let corretor = 2;
//   rows.map((row, idx) => {
//     const height = Math.max.apply(null, [
//       doc.splitTextToSize(row.codigo.toString(), 50).length,
//       doc.splitTextToSize(row.razaosocial, 150).length,
//       doc.splitTextToSize(row.cnpj, 50).length,
//       doc.splitTextToSize(row.quantidade.toString(), 35).length,
//       // doc.splitTextToSize(row.emailResp ? row.emailResp : "", 57).length,
//     ]);
//     if (index + height > 11) {
//       index = 0;
//       doc.addPage();
//       page = page + 1;
//       doc.setTextColor(0, 0, 0);

//       header(doc, page, total);
//       corretor = 0;
//     }

//     console.log(idx, index + idx, index + idx - 9 * (page - 1));

//     console.log(idx % 2);
//     if (idx % 2 === 0) {
//       doc.setTextColor(0, 0, 255);
//     } else {
//       doc.setTextColor(0, 0, 0);
//     }

//     addWrappedText({
//       text: row.codigo, // Put a really long string here
//       textWidth: 50,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 5, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index: index + idx - 11 * (page - 1) + 2 - corretor,
//       rows: height,
//     });
//     addWrappedText({
//       text: row.razaosocial, // Put a really long string here
//       textWidth: 150,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 55, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index: index + idx - 11 * (page - 1) + 2 - corretor,
//       rows: height,
//     });
//     addWrappedText({
//       text: row.cnpj, // Put a really long string here
//       textWidth: 50,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 205, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index: index + idx - 11 * (page - 1) + 2 - corretor,
//       rows: height,
//     });
//     addWrappedText({
//       text: row.quantidade.toString(), // Put a really long string here
//       textWidth: 35,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 255, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index: index + idx - 11 * (page - 1) + 2 - corretor,
//       rows: height,
//     });

//     addWrappedText({
//       text: row.produto, // Put a really long string here
//       textWidth: 150,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 5, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index: index + idx - 11 * (page - 1) + 3 - corretor,
//       rows: height,
//     });
//     addWrappedText({
//       text: row.estoque, // Put a really long string here
//       textWidth: 65,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 155, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index: index + idx - 11 * (page - 1) + 3 - corretor,
//       rows: height,
//     });
//     let equips = "";
//     if (row.equips) {
//       row.equips.map((equip) => (equips = `${equips} ${equip.serialNumber}`));
//     }
//     addWrappedText({
//       text: equips, // Put a really long string here
//       textWidth: 70,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 220, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index: index + idx - 11 * (page - 1) + 3 - corretor,
//       rows: height,
//     });
//     index = index + height;
//   });

//   doc.save(`${"E-COMERCE"}_${moment().format("L")}.pdf`);
// };

// function addWrappedText({
//   text,
//   textWidth,
//   doc,
//   fontSize = 10,
//   fontType = "normal",
//   lineSpacing = 7,
//   xPosition = 10,
//   YPosition = 32,
//   initialYPosition = 10,
//   pageWrapInitialYPosition = 10,
//   index = 0,
//   rows = 1,
// }) {
//   if (!!text) {
//     var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
//     var pageHeight = doc.internal.pageSize.height; // Get page height, well use this for auto-paging
//     doc.setFontType(fontType);
//     doc.setFontSize(fontSize);
//     var cursorY = initialYPosition + 7 * index;

//     textLines.forEach((lineText) => {
//       if (cursorY > pageHeight) {
//         // Auto-paging
//         doc.addPage();
//         cursorY = pageWrapInitialYPosition;
//       }
//       doc
//         .text(
//           xPosition + textWidth / 2,
//           cursorY +
//             (rows - 1) +
//             2.5 * (rows - doc.splitTextToSize(text, textWidth).length),
//           lineText,
//           "center"
//         )
//         .rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
//       cursorY += lineSpacing;
//     });
//   } else {
//     doc.rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
//   }
// }

// function title(doc) {
//   addWrappedText({
//     text: "Razão Social", // Put a really long string here
//     textWidth: 75,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 5, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "Atendimento", // Put a really long string here
//     textWidth: 30,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 80, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "tecnico", // Put a really long string here
//     textWidth: 40,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 110, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "produto", // Put a really long string here
//     textWidth: 85,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 150, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "Qtde", // Put a really long string here
//     textWidth: 20,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 235, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
//   addWrappedText({
//     text: "Estoque", // Put a really long string here
//     textWidth: 35,
//     doc,
//     fontSize: "12",
//     fontType: "bold",
//     lineSpacing: 5, // Space between lines
//     xPosition: 255, // Text offset from left of document
//     YPosition: 25,
//     initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
//     pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//   });
// }
// function header(doc, page, total) {
//   doc.setFont("times");
//   doc.setFontType("bold");
//   doc.setFontSize(20);
//   doc.text(5, 15, "Intern");

//   doc.setFontSize(10);
//   doc.setFontType("italic");
//   doc.text(200, 15, `2 de Jul de 2020 ${moment().format("lll")}`);

//   title(doc);

//   doc
//     .setFontSize(10)
//     .setFontType("italic")
//     .text(146, 200, `Página ${page} de ${total}`, "center");
// }

// export const CreatePDF = async () => {
//   const storeObject = store.getState();

//   const headers = {
//     token: storeObject.auth.token,
//     username: storeObject.auth.username,
//   };

//   let response = {};

//   await axios
//     .get(`${BACKEND_URL}/oapi/util/findAllTable`, {
//       headers: headers,
//     })
//     .then((resp) => {
//       response = resp;
//     })
//     .catch((error) => {
//       if (error.response) {
//         response = error.response;
//       } else {
//         console.log("Error", error.message);
//       }
//     });

//   console.log(response);

//   const rows = response.data;

//   var doc = new jsPDF({
//     orientation: "l",
//     unit: "mm",
//     format: "a4",
//     hotfixes: [], // an array of hotfix strings to enable
//   });
//   moment.locale("pt");
//   let totalRows = 0;
//   let total = 1;
//   doc.setFontSize(10);
//   rows.map((row) => {
//     const height = Math.max.apply(null, [
//       doc.splitTextToSize(row.razaoSocial, 75).length,
//       doc.splitTextToSize(row.date, 30).length,
//       doc.splitTextToSize(row.tecnico, 40).length,
//       doc.splitTextToSize(row.produto, 85).length,
//       doc.splitTextToSize(row.quantidade.toString(), 20).length,
//       doc.splitTextToSize(row.estoque, 35).length,
//     ]);
//     if (totalRows + height > 22) {
//       totalRows = 0;
//       total = total + 1;
//     }
//     totalRows = totalRows + height;
//   });
//   let page = 1;
//   header(doc, page, total);
//   let index = 0;

//   rows.map((row, idx) => {
//     const height = Math.max.apply(null, [
//       doc.splitTextToSize(row.razaoSocial, 75).length,
//       doc.splitTextToSize(row.date, 30).length,
//       doc.splitTextToSize(row.tecnico, 40).length,
//       doc.splitTextToSize(row.produto, 85).length,
//       doc.splitTextToSize(row.quantidade.toString(), 20).length,
//       doc.splitTextToSize(row.estoque, 35).length,
//     ]);
//     if (index + height > 22) {
//       index = 0;
//       doc.addPage();
//       page = page + 1;
//       header(doc, page, total);
//     }

//     addWrappedText({
//       text: row.razaoSocial, // Put a really long string here
//       textWidth: 75,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 5, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index,
//       rows: height,
//     });
//     addWrappedText({
//       text: moment(row.date).format("L"), // Put a really long string here
//       textWidth: 30,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 80, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index,
//       rows: height,
//     });

//     addWrappedText({
//       text: row.tecnico, // Put a really long string here
//       textWidth: 40,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 110, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index,
//       rows: height,
//     });

//     addWrappedText({
//       text: row.produto, // Put a really long string here
//       textWidth: 85,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 150, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index,
//       rows: height,
//     });

//     addWrappedText({
//       text: row.quantidade.toString(), // Put a really long string here
//       textWidth: 20,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 235, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index,
//       rows: height,
//     });

//     addWrappedText({
//       text: row.estoque, // Put a really long string here
//       textWidth: 35,
//       doc,
//       fontSize: "10",
//       fontType: "normal",
//       lineSpacing: 5, // Space between lines
//       xPosition: 255, // Text offset from left of document
//       initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
//       pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//       index,
//       rows: height,
//     });

//     index = index + height;
//   });

//   doc.save(`${"INTERNO"}_${moment().format("L")}.pdf`);
// };
