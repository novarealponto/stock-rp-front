import React, { useEffect, useState } from 'react'
import { applySpec, filter, has, length, map, pathOr, pipe, split } from 'ramda'
import { Form, message } from 'antd'

import ManagerContainer from '../../containers/Manager/Stock'
import { getAllEquipsService } from '../../services/equip'
import { stock, UpdatteProductBase } from '../../services/estoque'
import { validateSerialNumberForEntry } from '../../utils/validators'

const buildStoks = applySpec({
  analysis: pathOr('', ['analysis']),
  available: pathOr('', ['available']),
  key: pathOr('', ['id']),
  manufacturer: pathOr('', ['manufacturer']),
  minimum: pathOr('', ['minimumStock']),
  preAnalysis: pathOr('', ['preAnalysis']),
  product: pathOr('', ['name']),
  productId: pathOr('', ['productId']),
  serial: pathOr('', ['serial']),
  stock: pathOr('', ['stockBase']),
})

const buildEquips = applySpec({
  inClient: pathOr('', ['inClient']),
  key: pathOr('', ['id']),
  reserved: pathOr('', ['reserved']),
  serialNumber: pathOr('', ['serialNumber']),
})

const Manager = () => {
  const [dataSource, setDataSource] = useState([])
  const [dataSourceSerialNumbers, setDataSourceSerialNumbers] = useState([])
  const [formEntryStock] = Form.useForm()
  const [formSearchSerialNumber] = Form.useForm()
  const [formSendToAnalyze] = Form.useForm()
  const [current, setCurrent] = useState(1)
  const [pagination, setPagination] = useState({ current })
  const [querySerialNumbers, setQuerySerialNumbers] = useState({})
  const [queryStock, setQueryStock] = useState({})
  const [row, setRow] = useState({})
  const [visibleModalAnalysis, setVisibleModalAnalysis] = useState(false)
  const [visibleModalSerialNumbers, setVisibleModalSerialNumbers] = useState(
    false
  )
  const [visibleSearch, setVisibleSearch] = useState(false)

  useEffect(() => {
    const getAllStock = () => {
      const { product, manufacturer, stock: stockBase } = queryStock
      const query = {
        filters: {
          product: {
            specific: {
              name: product,
            },
          },
          mark: {
            specific: {
              mark: manufacturer,
            },
          },
          stockBase: {
            specific: {
              stockBase,
            },
          },
        },
        page: current,
        total: 10,
      }
      stock(query).then(({ data: { rows, count: total } }) => {
        setPagination({ total, current })
        setDataSource(map(buildStoks, rows))
      })
    }
    getAllStock()
  }, [current, queryStock, visibleModalAnalysis])

  useEffect(() => {
    const getAllEquips = () => {
      const { stock, productId, serialNumber } = querySerialNumbers
      const query = {
        filters: {
          equip: {
            specific: {
              serialNumber,
            },
          },
          stockBase: {
            specific: {
              stockBase: stock,
            },
          },
          product: {
            specific: {
              id: productId,
            },
          },
        },
        total: null,
      }

      getAllEquipsService(query).then(({ data: { rows: equips } }) => {
        setDataSourceSerialNumbers(map(buildEquips, equips))
      })
    }
    getAllEquips()
  }, [querySerialNumbers])

  const handleOnCancelAnalysis = () => {
    formEntryStock.resetFields()
    formSendToAnalyze.resetFields()
    setVisibleModalAnalysis(false)
  }

  const handleOnCancelSerialNumbers = () => {
    formSearchSerialNumber.resetFields()
    setDataSourceSerialNumbers([])
    setQuerySerialNumbers({})
    setVisibleModalSerialNumbers(false)
  }

  const handleOnClickExperiment = (rowClicked) => {
    setRow(rowClicked)
    setVisibleModalAnalysis(true)
  }
  const handleOnClickInfo = ({ productId, stock }) => {
    setQuerySerialNumbers({ ...querySerialNumbers, productId, stock })
    setVisibleModalSerialNumbers(true)
  }

  const handleOnSearch = (query) => {
    setCurrent(1)
    setQueryStock(query)
    }

  const handleOnSearchSerialNumber = (serialNumber) =>
    setQuerySerialNumbers({ ...querySerialNumbers, serialNumber })

  const handleOnSubmitFormEntryStock = async (formEntryStockData) => {
    const buildProductBaseForUpdate = applySpec({
      id: pathOr('', ['key']),
      amount: pathOr('', ['quantity']),
      serialNumbers: pipe(
        pathOr('', ['serialNumbers']),
        split('\n'),
        filter((item) => item)
      ),
      status: () => 'analysis',
    })

    try {
      const productBaseBuilded = buildProductBaseForUpdate({
        ...formEntryStockData,
        ...row,
      })
      if (
        length(productBaseBuilded.serialNumbers) !== productBaseBuilded.amount
      ) {
        message.error(
          'Quantidade informada não condiz com a quantidade de números de série inseridos'
        )
        throw new Error('Error on quantity')
      }
      const { status } = await UpdatteProductBase(productBaseBuilded)

      if (status === 404 || status === 422 || status === 400 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      handleOnCancelAnalysis()
    } catch (err) {
      console.error(err)
    }
  }

  const handleOnSubmitFormSendToAnalyze = async (formSendToAnalyzeData) => {
    const buildProductBaseForUpdate = applySpec({
      id: pathOr('', ['key']),
      amount: pathOr('', ['quantity']),
      serialNumbers: () => [],
      status: () => 'preAnalysis',
    })

    try {
      const { status } = await UpdatteProductBase(
        buildProductBaseForUpdate({ ...formSendToAnalyzeData, ...row })
      )

      if (status === 404 || status === 422 || status === 400 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      handleOnCancelAnalysis()
    } catch (err) {
      console.error(err)
    }
  }

  const onChangeTable = ({ current }) => setCurrent(current)

  const onPressEnterTextAreaSerialNumber = async ({ target, analysis }) => {
    const currentTargetValue = target.value

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue, {
        limit: analysis,
      })
      const { error, serialNumbers } = response

      if (has('error', response)) {
        formEntryStock.setFieldsValue({ serialNumbers })
        message.error(error)
      }
      formEntryStock.setFieldsValue({ quantity: length(serialNumbers) })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ManagerContainer
      dataSource={dataSource}
      dataSourceSerialNumbers={dataSourceSerialNumbers}
      formEntryStock={formEntryStock}
      formSearchSerialNumber={formSearchSerialNumber}
      formSendToAnalyze={formSendToAnalyze}
      handleOnCancelAnalysis={handleOnCancelAnalysis}
      handleOnCancelSerialNumbers={handleOnCancelSerialNumbers}
      handleOnClickCloseSearchForm={() => setVisibleSearch(false)}
      handleOnClickExperiment={handleOnClickExperiment}
      handleOnClickOpenSearchForm={() => setVisibleSearch(true)}
      handleOnClickInfo={handleOnClickInfo}
      handleOnSearch={handleOnSearch}
      handleOnSearchSerialNumber={handleOnSearchSerialNumber}
      handleOnSubmitFormEntryStock={handleOnSubmitFormEntryStock}
      handleOnSubmitFormSendToAnalyze={handleOnSubmitFormSendToAnalyze}
      onChangeTable={onChangeTable}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      pagination={pagination}
      row={row}
      visibleModalAnalysis={visibleModalAnalysis}
      visibleModalSerialNumbers={visibleModalSerialNumbers}
      visibleSearch={visibleSearch}
    />
  )
}

export default Manager
