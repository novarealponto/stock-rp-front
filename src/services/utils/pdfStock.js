import axios from "axios";
import { BACKEND_URL } from "../var";
import { store } from "../../App";
import moment from "moment";
import jsPDF from "jspdf";

export const getBug = async () => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  try {
    const { status, data } = await axios.get(
      `${BACKEND_URL}/oapi/util/getBug`,
      {
        headers: headers,
      }
    );
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      console.log("Error", error.message);
    }
  }
};

export const pdfRelatorioItems = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  try {
    const { status, data } = await axios.get(
      `${BACKEND_URL}/oapi/util/pdfStock`,
      {
        headers: headers,
      }
    );

    if (status === 200) {
      console.log(data);
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

      data.map((product) => {
        product.stockBases.map((row) => {
          const height = Math.max.apply(null, [
            doc.splitTextToSize(row.productBase.amount, 30).length,
            doc.splitTextToSize(row.productBase.available, 30).length,
            doc.splitTextToSize(row.productBase.reserved, 30).length,
            doc.splitTextToSize(product.name, 140).length,
            doc.splitTextToSize(row.stockBase, 60).length,
          ]);
          if (totalRows + height > 22) {
            totalRows = 0;
            total = total + 1;
          }
          totalRows = totalRows + height;
        });
      });

      let page = 1;
      header(doc, page, total);
      let index = 0;

      data.map((product) => {
        product.stockBases.map((row) => {
          const height = Math.max.apply(null, [
            doc.splitTextToSize(row.productBase.amount, 30).length,
            doc.splitTextToSize(row.productBase.available, 30).length,
            doc.splitTextToSize(row.productBase.reserved, 30).length,
            doc.splitTextToSize(product.name, 140).length,
            doc.splitTextToSize(row.stockBase, 60).length,
          ]);

          if (index + height > 22) {
            index = 0;
            doc.addPage();
            page = page + 1;
            header(doc, page, total);
          }

          addWrappedText({
            text: product.name, // Put a really long string here
            textWidth: 140,
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
            text: row.stockBase, // Put a really long string here
            textWidth: 60,
            doc,
            fontSize: "10",
            fontType: "normal",
            lineSpacing: 5, // Space between lines
            xPosition: 145, // Text offset from left of document
            initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
            pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
            index,
            rows: height,
          });
          addWrappedText({
            text: row.productBase.available, // Put a really long string here
            textWidth: 30,
            doc,
            fontSize: "10",
            fontType: "normal",
            lineSpacing: 5, // Space between lines
            xPosition: 205, // Text offset from left of document
            initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
            pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
            index,
            rows: height,
          });
          addWrappedText({
            text: row.productBase.reserved, // Put a really long string here
            textWidth: 30,
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
          addWrappedText({
            text: row.productBase.amount, // Put a really long string here
            textWidth: 30,
            doc,
            fontSize: "10",
            fontType: "normal",
            lineSpacing: 5, // Space between lines
            xPosition: 265, // Text offset from left of document
            initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
            pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
            index,
            rows: height,
          });

          index = index + height;
        });
      });

      doc.save(`${"ESTOQUE"}_${moment().format("L")}.pdf`);
    }
    return "sucess";
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      console.log("Error", error.message);
    }
  }
};

function header(doc, page, total) {
  doc.setFont("times");
  doc.setFontType("bold");
  doc.setFontSize(20);
  doc.text(5, 15, "ESTOQUE");

  doc.setFontSize(10);
  doc.setFontType("italic");
  doc.text(200, 15, `2 de Jul de 2020 ${moment().format("lll")}`);

  title(doc);

  doc
    .setFontSize(10)
    .setFontType("italic")
    .text(146, 200, `Página ${page} de ${total}`, "center");
}

function title(doc) {
  addWrappedText({
    text: "Produto", // Put a really long string here
    textWidth: 140,
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
    text: "Base", // Put a really long string here
    textWidth: 60,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 145, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });

  addWrappedText({
    text: "Disp.", // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 205, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
  addWrappedText({
    text: "Reserv.", // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 235, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
  addWrappedText({
    text: "Total", // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 265, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
}

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
