import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, company, random } from 'faker'
import { forEach, has } from 'ramda'
import { Form, message } from 'antd'

import filterData from '../../../utils/filterData'
import ManagerContainer from '../../../containers/Manager/Stock'
import { validateSerialNumberForEntry } from '../../../utils/validators'

export default {
  title: 'Containers/Managers',
  component: ManagerContainer,
}

const createObjSearchGlobal = (keys, value) => {
  const obj = {}
  forEach((key) => (obj[key] = value), keys)
  return obj
}
const handleOnCancelSerialNumberAction = action('handle onCancel serial number')
const handleOnCancelAnalysisAction = action('handle onCancel analysis')
const handleOnClickCloseSearchFormAction = action('on click close search')
const handleOnClickIconAnalysisAction = action('handle onClick icon analysis')
const handleOnClickIconInfoAction = action('handle onClick icon info')
const handleOnClickOpenSearchFormAction = action('on click open search')
const handleOnPressTextAraeaSerialNumberAction = action(
  'handle onPress textAraea serial number'
)
const handleOnSearchAction = action('handle onSearch')
const handleOnSearchSerialNumberAction = action('handle onSearch serialNumber')
const handleOnSubmitFormEntryStockAction = action(
  'handle onSubmit form entryStock'
)
const handleOnSubmitFormSendToAnalyzeAction = action(
  'handle onSubmit form sendToAnalyze'
)

const initialDataSource = []
const initialDataSourceSerialNumbers = []

for (let key = 0; key < 100; key++) {
  initialDataSource.push({
    analysis: random.number(),
    available: random.number(),
    key,
    manufacturer: company.companyName(),
    minimum: random.number(),
    preAnalysis: random.number(),
    product: commerce.productName(),
    serial: random.boolean(),
    stock: random.boolean() ? 'ESTOQUE' : 'EMPRESTIMO',
  })

  initialDataSourceSerialNumbers.push({
    inClient: random.boolean(),
    key,
    reserved: random.boolean(),
    serialNumber: random.number().toString(),
  })
}

const Template = () => {
  const [dataSource, setDataSource] = useState(initialDataSource)
  const [dataSourceSerialNumbers, setDataSourceSerialNumbers] = useState(
    initialDataSourceSerialNumbers
  )
  const [formEntryStock] = Form.useForm()
  const [formSearchSerialNumber] = Form.useForm()
  const [formSendToAnalyze] = Form.useForm()
  const [row, setRow] = useState({})
  const [visibleModalAnalysis, setVisibleModalAnalysis] = useState(false)
  const [visibleModalSerialNumbers, setVisibleModalSerialNumbers] = useState(
    false
  )
  const [visibleSearch, setVisibleSearch] = useState(false)

  const handleOnClickCloseSearchForm = (eventClick) => {
    handleOnClickCloseSearchFormAction(eventClick)
    setVisibleSearch(false)
  }

  const handleOnClickOpenSearchForm = (eventClick) => {
    handleOnClickOpenSearchFormAction(eventClick)
    setVisibleSearch(true)
  }

  const handleOnCancelAnalysis = (eventOnCancel) => {
    setVisibleModalAnalysis(false)
    formSendToAnalyze.resetFields()
    formEntryStock.resetFields()
    handleOnCancelAnalysisAction(eventOnCancel)
  }

  const handleOnCancelSerialNumbers = (eventOnCancel) => {
    handleOnCancelSerialNumberAction(eventOnCancel)
    setVisibleModalSerialNumbers(false)
    formSearchSerialNumber.resetFields()
  }

  const handleOnClickExperiment = (eventClick) => {
    setRow(eventClick)
    handleOnClickIconAnalysisAction(eventClick)
    setVisibleModalAnalysis(true)
  }

  const handleOnClickInfo = (rowInfo) => {
    handleOnClickIconInfoAction(rowInfo)
    setVisibleModalSerialNumbers(true)
  }

  const handleOnSearch = (searchValue) => {
    handleOnSearchAction(searchValue)

    setDataSource(filterData(searchValue, initialDataSource, { and: true }))
  }

  const handleOnSearchSerialNumber = (searchValue) => {
    handleOnSearchSerialNumberAction(searchValue)
    const query = createObjSearchGlobal(['serialNumber'], searchValue)

    setDataSourceSerialNumbers(filterData(query, initialDataSourceSerialNumbers))
  }

  const handleOnSubmitFormEntryStock = (entryStockFormData) => {
    handleOnSubmitFormEntryStockAction(entryStockFormData)
  }

  const handleOnSubmitFormSendToAnalyze = (SendToAnalyzeFormData) => {
    handleOnSubmitFormSendToAnalyzeAction(SendToAnalyzeFormData)
  }

  const onPressEnterTextAreaSerialNumber = async ({ target }) => {
    const currentTargetValue = target.value
    handleOnPressTextAraeaSerialNumberAction(currentTargetValue)

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue, {
        noRequest: true,
      })

      if (has('error', response)) {
        const { error, serialNumbers } = response
        formEntryStock.setFieldsValue({ serialNumbers })
        message.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ManagerContainer
      dataSource={dataSource}
      dataSourceSerialNumbers={dataSourceSerialNumbers}
      formEntryStock={formEntryStock}
      formSendToAnalyze={formSendToAnalyze}
      formSearchSerialNumber={formSearchSerialNumber}
      handleOnCancelAnalysis={handleOnCancelAnalysis}
      handleOnCancelSerialNumbers={handleOnCancelSerialNumbers}
      handleOnClickCloseSearchForm={handleOnClickCloseSearchForm}
      handleOnClickExperiment={handleOnClickExperiment}
      handleOnClickInfo={handleOnClickInfo}
      handleOnClickOpenSearchForm={handleOnClickOpenSearchForm}
      handleOnSearch={handleOnSearch}
      handleOnSearchSerialNumber={handleOnSearchSerialNumber}
      handleOnSubmitFormEntryStock={handleOnSubmitFormEntryStock}
      handleOnSubmitFormSendToAnalyze={handleOnSubmitFormSendToAnalyze}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      row={row}
      visibleModalAnalysis={visibleModalAnalysis}
      visibleModalSerialNumbers={visibleModalSerialNumbers}
      visibleSearch={visibleSearch}
    />
  )
}

export const Stock = Template.bind({})
