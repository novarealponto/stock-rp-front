import jsPDF from 'jspdf'
import moment from 'moment'
import { forEach } from 'ramda'

function addWrappedText({
  doc,
  fontSize = 10,
  fontType = 'normal',
  index = 0,
  initialYPosition = 10,
  lineSpacing = 7,
  pageWrapInitialYPosition = 10,
  rows = 1,
  text,
  textWidth,
  xPosition = 10,
  yPosition = 32,
}) {
  if (!!text) {
    var textLines = doc.splitTextToSize(text, textWidth) // Split the text into lines
    var pageHeight = doc.internal.pageSize.height // Get page height, well use this for auto-paging
    doc.setFontType(fontType)
    doc.setFontSize(fontSize)
    var cursorY = initialYPosition + 7 * index

    textLines.forEach((lineText) => {
      if (cursorY > pageHeight) {
        doc.addPage()
        cursorY = pageWrapInitialYPosition
      }
      doc
        .text(
          xPosition + textWidth / 2,
          cursorY +
            (rows - 1) +
            2.5 * (rows - doc.splitTextToSize(text, textWidth).length),
          lineText,
          'center'
        )
        .rect(xPosition, yPosition + 7 * index, textWidth, 7 + 7 * (rows - 1))
      cursorY += lineSpacing
    })
  } else {
    doc.rect(xPosition, yPosition + 7 * index, textWidth, 7 + 7 * (rows - 1))
  }
}

function title(doc) {
  addWrappedText({
    doc,
    fontSize: '12',
    fontType: 'bold',
    initialYPosition: 30,
    lineSpacing: 5,
    pageWrapInitialYPosition: 10,
    text: 'OS',
    textWidth: 30,
    xPosition: 5,
    yPosition: 25,
  })
  addWrappedText({
    doc,
    fontSize: '12',
    fontType: 'bold',
    initialYPosition: 30,
    lineSpacing: 5,
    pageWrapInitialYPosition: 10,
    text: 'Qntd.',
    textWidth: 30,
    xPosition: 35,
    yPosition: 25,
  })
  addWrappedText({
    doc,
    fontSize: '12',
    fontType: 'bold',
    initialYPosition: 30,
    lineSpacing: 5,
    pageWrapInitialYPosition: 10,
    text: 'Produto',
    textWidth: 167,
    xPosition: 65,
    yPosition: 25,
  })
  addWrappedText({
    doc,
    fontSize: '12',
    fontType: 'bold',
    initialYPosition: 30,
    lineSpacing: 5,
    pageWrapInitialYPosition: 10,
    text: 'Número de série',
    textWidth: 60,
    xPosition: 232,
    yPosition: 25,
  })
}

function header(doc, page, total, technician) {
  doc
    .setFont('times')
    .setFontType('italic')
    .setFontSize(10)
    .text(200, 15, `2 de Jul de 2020 ${moment().format('lll')}`)

  doc
    .setFont('times')
    .setFontType('bold')
    .setFontSize(12)
    .text(10, 15, technician)

  title(doc)

  doc
    .setFontSize(10)
    .setFontType('italic')
    .text(146, 200, `Página ${page} de ${total}`, 'center')
}

const createPDF = ({ rows, technician }) => {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    hotfixes: [],
  })

  let totalRows = 0
  let total = 1

  doc.setFontSize(10)

  forEach((row) => {
    const height = Math.max.apply(null, [
      doc.splitTextToSize(row.os, 30).length,
      doc.splitTextToSize(row.amount.toString(), 30).length,
      doc.splitTextToSize(row.produto, 167).length,
      doc.splitTextToSize(
        row.serialNumbers.length !== 0 ? row.serialNumbers[0] : '',
        60
      ).length,
    ])

    if (totalRows + height > 22) {
      totalRows = 0
      total = total + 1
    }

    totalRows = totalRows + height
  }, rows)

  let page = 1
  let index = 0

  header(doc, page, total, technician)

  forEach((row) => {
    const height = Math.max.apply(null, [
      doc.splitTextToSize(row.os, 30).length,
      doc.splitTextToSize(row.amount.toString(), 30).length,
      doc.splitTextToSize(row.produto, 167).length,
      doc.splitTextToSize(
        row.serialNumbers.length !== 0 ? row.serialNumbers[0] : '',
        60
      ).length,
    ])
    if (index + height > 22) {
      index = 0
      doc.addPage()
      page = page + 1
      header(doc, page, total, technician)
    }

    addWrappedText({
      doc,
      fontSize: '10',
      fontType: 'normal',
      index,
      initialYPosition: 37,
      lineSpacing: 5,
      pageWrapInitialYPosition: 10,
      rows: height,
      text: row.os,
      textWidth: 30,
      xPosition: 5,
    })
    addWrappedText({
      doc,
      fontSize: '10',
      fontType: 'normal',
      index,
      initialYPosition: 37,
      lineSpacing: 5,
      pageWrapInitialYPosition: 10,
      rows: height,
      text: row.amount.toString(),
      textWidth: 30,
      xPosition: 35,
    })
    addWrappedText({
      doc,
      fontSize: '10',
      fontType: 'normal',
      index,
      initialYPosition: 37,
      lineSpacing: 5,
      pageWrapInitialYPosition: 10,
      rows: height,
      text: row.produto,
      textWidth: 167,
      xPosition: 65,
    })
    addWrappedText({
      doc,
      fontSize: '10',
      fontType: 'normal',
      index,
      initialYPosition: 37,
      lineSpacing: 5,
      pageWrapInitialYPosition: 10,
      rows: height,
      text: row.serialNumbers.length !== 0 ? row.serialNumbers[0] : '',
      textWidth: 60,
      xPosition: 232,
    })

    index = index + height
  }, rows)

  doc.save(`Saída_${technician}_${moment().format('L')}.pdf`)
}

export default createPDF
