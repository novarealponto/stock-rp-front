import React, { useState } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { commerce, company, date, lorem, name, random } from 'faker'
import { generate } from '@fnando/cnpj'
import { Form } from 'antd'

import ManagerContainer from '../../../containers/Loan'

export default {
  title: 'Containers/Loan',
  component: ManagerContainer,
}

const availableList = [],
  inClientList = [],
  reservedList = [],
  technicianList = []

for (let key = 0; key < 200; key++) {
  availableList.push({
    key,
    mark: company.companyName(),
    product: commerce.productName(),
    serialNumber: random.number(),
  })
  inClientList.push({
    cnpj: generate(),
    date: moment(date.past()),
    key,
    observation: lorem.text(),
    product: commerce.productName(),
    razaoSocial: company.companyName(),
    serialNumber: random.number(),
    solicitation: date.past(),
    tecnician: random.number() % 40,
  })
  reservedList.push({
    cnpj: generate(),
    date: moment(),
    key,
    observation: lorem.text(),
    product: commerce.productName(),
    razaoSocial: company.companyName(),
    serialNumber: random.number(),
    solicitation: date.past(),
    tecnician: random.number() % 40,
  })
  technicianList.push({
    key,
    name: name.firstName(),
  })
}

const onCancelModalAction = action('close modal')
const onChangeSelectAction = action('change value select')
const onChangeTableAction = action('change table')
const onClickDeletReserveAction = action('Delet reserve')
const onClickIconAddReserveAction = action('clicked plus icon in available table')
const onClickIconEditReserveAction = action('clicked edit icon in reserved table')
const onClickIconRollBackAction = action(
  'clicked roll back icon in "In Client" table'
)
const onClickPrintAction = action('clicked print icon')
const onClickSearchButtonAction = action('clicked button search')
const onOkAction = action('clicked ok')
const onSearchAction = action('search')

const Template = (args) => {
  const [dataSource, setDatasource] = useState(availableList)
  const [formModal] = Form.useForm()
  const [formSearch] = Form.useForm()
  const [select, setSelect] = useState('disponiveis')
  const [visibleModal, setvisibleModal] = useState(false)
  const [visibleSearch, setVisibleSearch] = useState(false)

  const handleCancelModal = (eventCancel) => {
    formModal.resetFields()
    onCancelModalAction(eventCancel)
    setvisibleModal(false)
  }

  const handleClickIconAddReserve = (eventClick) => {
    onClickIconAddReserveAction(eventClick)
    setvisibleModal(true)
  }

  const handleClickIconEditReserve = (rowValues) => {
    formModal.setFieldsValue(rowValues)
    onClickIconEditReserveAction(rowValues)
    setvisibleModal(true)
  }

  const handleClickIconRollBack = (rowValues) => {
    formModal.setFieldsValue(rowValues)
    onClickIconRollBackAction(rowValues)
    setvisibleModal(true)
  }

  const handleClickSearchButton = (eventClick) => {
    onClickSearchButtonAction(eventClick)
    setVisibleSearch(!visibleSearch)
  }

  const handleOk = (eventCancel) => {
    formModal.resetFields()
    onOkAction(eventCancel)
    setvisibleModal(false)
  }

  const onChangeSelect = (value) => {
    onChangeSelectAction(value)
    setSelect(value)
    return {
      disponiveis: setDatasource(availableList),
      emCliente: setDatasource(inClientList),
      reservados: setDatasource(reservedList),
    }[value]
  }

  return (
    <ManagerContainer
      {...args}
      dataSource={dataSource}
      formModal={formModal}
      formSearch={formSearch}
      handleCancelModal={handleCancelModal}
      handleClickIconAddReserve={handleClickIconAddReserve}
      handleClickIconEditReserve={handleClickIconEditReserve}
      handleClickIconRollBack={handleClickIconRollBack}
      handleOk={handleOk}
      onChangeSelect={onChangeSelect}
      pagination={{ showSizeChanger: false }}
      select={select}
      showSearch={handleClickSearchButton}
      technicianList={technicianList}
      visibleModal={visibleModal}
      visibleSearch={visibleSearch}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  handleChangeTable: onChangeTableAction,
  handleClickDeletReserve: onClickDeletReserveAction,
  handleClickPrint: onClickPrintAction,
  handleSearch: onSearchAction,
}
