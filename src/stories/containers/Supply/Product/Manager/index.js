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

const dataSource = []
const manufacturerList = []

for (let key = 0; key < 30; key++) {
  dataSource.push({
    key,
    code: key,
    product: commerce.productName(),
    manufacturer: company.companyName(),
    manufacturerId: key,
    minimumQuantity: random.number({ max: 20 }),
    createdAt: moment(date.past()).format('L'),
    unit: ['UNID', 'PÇ', 'CX', 'LT'][random.number({ max: 4 })],
    exporadic: random.boolean(),
  })

  manufacturerList.push({
    id: key,
    name: company.companyName(),
  })
}

const Template = (args) => {
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)
  const [formRegister] = Form.useForm()
  const [formUpdate] = Form.useForm()

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
      handleClickOnCancel={handleClickOnCancel}
      visibleModalRegister={visibleModalRegister}
      visibleModalUpdate={visibleModalUpdate}
      formRegister={formRegister}
      formUpdate={formUpdate}
      handleClickNewSupplyProduct={handleClickNewSupplyProduct}
      handleClickEditSupplyProduct={handleClickEditSupplyProduct}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  dataSource,
  handleOnSearch: action('handle On Search'),
  manufacturerList,
  pagination: { showSizeChanger: false },
  handleOnChangeTable: action('handle Change Table'),
  handleSubmitRegister: action('handle Submit Register'),
  handleSubmitUpdate: action('handle Submit Update'),
}
