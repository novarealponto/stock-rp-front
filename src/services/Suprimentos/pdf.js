import jsPDF from "jspdf";
import moment from "moment";

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
  addWrappedText({
    text: "Código", // Put a really long string here
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
    text: "Fabricante", // Put a really long string here
    textWidth: 60,
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
    text: "Quantidade", // Put a really long string here
    textWidth: 40,
    doc,
    fontSize: "12",
    fontType: "bold",
    lineSpacing: 5, // Space between lines
    xPosition: 195, // Text offset from left of document
    YPosition: 25,
    initialYPosition: 30, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  });
  addWrappedText({
    text: "Data Atualiz.", // Put a really long string here
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

function header(type, doc, page, total) {
  doc.setFont("times");
  doc.setFontType("bold");
  doc.setFontSize(20);
  doc.text(5, 15, type.toUpperCase());

  doc.setFontSize(10);
  doc.setFontType("italic");
  doc.text(250, 15, moment().format("lll"));

  title(type, doc);

  doc
    .setFontSize(10)
    .setFontType("italic")
    .text(146, 200, `Página ${page} de ${total}`, "center");

  return
}

export const CreatePDFSuprimento = async (type, rows) => {
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
      doc.splitTextToSize(row.code, 30).length,
      doc.splitTextToSize(row.name, 100).length,
      doc.splitTextToSize(row.manufacturer.name, 60).length,
      doc.splitTextToSize(row.amount.toString(), 40).length,
      doc.splitTextToSize(moment(row.updatedAt).format("ll"), 57).length,
    ]);
    if (totalRows + height > 22) {
      totalRows = 0;
      total = total + 1;
    }
    totalRows = totalRows + height;
    // eslint-disable-next-line array-callback-return
    return;
  });

  let page = 1;
  header(type, doc, page, total);

  let index = 0;

  rows.map((row) => {
    doc.setFontSize(10);
    const height = Math.max.apply(null, [
      doc.splitTextToSize(row.code, 30).length,
      doc.splitTextToSize(row.name, 100).length,
      doc.splitTextToSize(row.manufacturer.name, 60).length,
      doc.splitTextToSize(row.amount.toString(), 40).length,
      doc.splitTextToSize(moment(row.updatedAt).format("ll"), 57).length,
    ]);

    if (index + height > 22) {
      index = 0;
      doc.addPage();
      page = page + 1;
      header(type, doc, page, total);
    }

    addWrappedText({
      text: row.code.trim(), // Put a really long string here
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
      text: row.name.trim(), // Put a really long string here
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
      text: row.manufacturer.name.trim(), // Put a really long string here
      textWidth: 60,
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
      text: row.amount.toString().trim(), // Put a really long string here
      textWidth: 40,
      doc,
      fontSize: "10",
      fontType: "normal",
      lineSpacing: 5, // Space between lines
      xPosition: 195, // Text offset from left of document
      initialYPosition: 37, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows: height,
    });
    addWrappedText({
      text: moment(row.updatedAt).format("ll"), // Put a really long string here
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
    return ;
  });

  return doc.save(`${type}_${moment().format("L")}.pdf`);
};
