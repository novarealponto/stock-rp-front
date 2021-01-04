import axios from 'axios'
import { BACKEND_URL } from './var'
import jsPDF from 'jspdf'
import moment from 'moment/min/moment-with-locales'
import { store } from '../App'

export const getProdutos = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/product`, { headers: headers, params: { query } })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const getEquips = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/product/getEquipsByEntrance`, {
      headers: headers,
      params: { query },
    })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const getItens = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/product/getAllNames`, {
      headers: headers,
      params: { query },
    })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const getMarca = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/mark`, { headers: headers, params: { query } })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const getFabricante = async (peca) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/manufacturer`, {
      headers: headers,
      params: { query: peca },
    })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const getAllProductType = async () => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/equipModel/getAllType`, {
      headers: headers,
      params: {},
    })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const newMarca = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .post(`${BACKEND_URL}/api/mark`, values, { headers: headers })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const newProductType = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .post(`${BACKEND_URL}/api/equipModel/addType`, values, { headers: headers })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const newFabricante = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .post(`${BACKEND_URL}/api/manufacturer`, values, { headers: headers })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const newProduto = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .post(`${BACKEND_URL}/api/product`, values, { headers: headers })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const updateProduto = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .put(`${BACKEND_URL}/api/product`, values, { headers: headers })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const getProdutoByEstoque = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/product/getProductByStockBase`, {
      headers: headers,
      params: { query },
    })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

export const GetRelatVendas = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios
    .get(`${BACKEND_URL}/api/product/getAllVendas`, {
      headers: headers,
      params: { query },
    })
    .then((resp) => {
      response = resp
    })
    .catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message)
      }
    })
  return response
}

function addWrappedText({
  text,
  textWidth,
  doc,
  fontSize = 10,
  fontType = 'normal',
  lineSpacing = 7,
  xPosition = 10,
  YPosition = 17,
  initialYPosition = 10,
  pageWrapInitialYPosition = 10,
  index = 0,
  rows = 1,
}) {
  if (!!text) {
    var textLines = doc.splitTextToSize(text, textWidth) // Split the text into lines
    var pageHeight = doc.internal.pageSize.height // Get page height, well use this for auto-paging
    doc.setFontType(fontType)
    doc.setFontSize(fontSize)
    var cursorY = initialYPosition + 7 * index

    textLines.forEach((lineText) => {
      if (cursorY > pageHeight) {
        // Auto-paging
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
        .rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1))
      cursorY += lineSpacing
    })
  } else {
    doc.rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1))
  }
}

function title(doc) {
  addWrappedText({
    text: 'SKU', // Put a really long string here
    textWidth: 20,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 5, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'Produto', // Put a really long string here
    textWidth: 100,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 25, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'Marca', // Put a really long string here
    textWidth: 40,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 125, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'Corredor', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 165, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'coluna', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 195, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })
  addWrappedText({
    text: 'prateleira', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 225, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })
  addWrappedText({
    text: 'gaveta', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 255, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })
}

export const CreatePDF = async (products) => {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    hotfixes: [], // an array of hotfix strings to enable
  })

  doc.setFontSize(10).text(148.5, 205, `Página 1`, 'center')

  console.log(products)

  let index = 0
  let page = false
  products.map((product, idx) => {
    if (idx === 0) {
      title(doc)
    }

    const rows = Math.max.apply(null, [
      doc.splitTextToSize(product.sku, 20).length,
      doc.splitTextToSize(product.name, 100).length,
      doc.splitTextToSize(product.mark, 40).length,
    ])

    if (index + rows > 25) {
      index = 0

      doc.addPage()

      title(doc)
      page = page + 1
      doc.setFontSize(10).text(148.5, 205, `Página ${page + 1}`, 'center')
    }

    addWrappedText({
      text: product.sku.trim(), // Put a really long string here
      textWidth: 20,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 5, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.name.trim(), // Put a really long string here
      textWidth: 100,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 25, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.mark.trim(), // Put a really long string here
      textWidth: 40,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 125, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.corredor.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 165, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.coluna.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 195, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })
    addWrappedText({
      text: product.prateleira.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 225, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })
    addWrappedText({
      text: product.gaveta.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 255, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    index = index + rows

    // eslint-disable-next-line array-callback-return
    return
  })

  moment.locale('pt')

  doc.autoPrint()

  doc.save(`PRODUTOS_${moment().format('L')}.pdf`)
}
