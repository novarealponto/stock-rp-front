import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, company, date, random } from 'faker'
import { Form } from 'antd'
import moment from 'moment'

import ManagerSupplyProductContainer from '../../../../../containers/Supply/Product/Manager'

export default {
  title: 'Containers/Supply/Product',
  component: ManagerSupplyProductContainer,
}

const dataSource = new Array(30).fill(null).map((_, index) => ({
    code: key,
    createdAt: moment(date.past()).format('L'),
    exporadic: random.boolean(),
    key,
    manufacturer: company.companyName(),
    manufacturerId: key,
    minimumQuantity: random.number({ max: 20 }),
    product: commerce.productName(),
    unit: ['UNID', 'PÇ', 'CX', 'LT'][random.number({ max: 4 })],
  }))
const manufacturerList = new Array(30).fill(null).map((_, index) => ({
    id: key,
    name: company.companyName(),
  }))


const Template = (args) => {
  const [formRegister] = Form.useForm()
  const [formUpdate] = Form.useForm()
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)

  const handleClickOnCancel = () => {
    setVisibleModalRegister(false)
    setVisibleModalUpdate(false)
    formRegister.resetFields()
    formUpdate.resetFields()
  }

  const handleClickEditSupplyProduct = (row) => {
    formUpdate.setFieldsValue(row)
    setVisibleModalUpdate(true)
  }

  const handleClickNewSupplyProduct = () => setVisibleModalRegister(true)

  return (
    <ManagerSupplyProductContainer
      {...args}
      formRegister={formRegister}
      formUpdate={formUpdate}
      handleClickEditSupplyProduct={handleClickEditSupplyProduct}
      handleClickNewSupplyProduct={handleClickNewSupplyProduct}
      handleClickOnCancel={handleClickOnCancel}
      visibleModalRegister={visibleModalRegister}
      visibleModalUpdate={visibleModalUpdate}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  dataSource,
  handleOnChangeTable: action('handle Change Table'),
  handleOnSearch: action('handle On Search'),
  handleSubmitRegister: action('handle Submit Register'),
  handleSubmitUpdate: action('handle Submit Update'),
  manufacturerList,
  pagination: { showSizeChanger: false },
}
