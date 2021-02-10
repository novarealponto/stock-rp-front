import React, { useState } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { commerce, date, name, random } from 'faker'
import { Form } from 'antd'

import ManagerSupplyEntryContainer from '../../../../containers/Supply/Entry/Manager'

export default {
  title: 'Containers/Supply/Entry',
  component: ManagerSupplyEntryContainer,
}

const dataSource = new Array(30).fill(null).map((_, key) => ({
  createdAt: moment(date.past()).format('L'),
  discount: random.number({ max: 10 }),
  key,
  price: random.number({ max: 100 }),
  product: commerce.productName(),
  provider: commerce.productName(),
  quantity: random.number({ max: 100 }),
  user: name.firstName(),
}))

const productList = new Array(30).fill(null).map((_, id) => ({
  id,
  name: commerce.productName(),
}))

const providerList = new Array(30).fill(null).map((_, id) => ({
  id,
  razaoSocial: commerce.productName(),
}))

const Template = (args) => {
  const [formRegister] = Form.useForm()
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)

  const handleClickNewSupplyEntry = () => setVisibleModalRegister(true)

  const handleClickOnCancel = () => {
    setVisibleModalRegister(false)
    formRegister.resetFields()
  }

  return (
    <ManagerSupplyEntryContainer
      {...args}
      formRegister={formRegister}
      handleClickNewSupplyEntry={handleClickNewSupplyEntry}
      handleClickOnCancel={handleClickOnCancel}
      visibleModalRegister={visibleModalRegister}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  dataSource,
  handleOnChangeTable: action('handle Change Table'),
  handleOnSearch: action('handle On Search'),
  handleSubmitRegister: action('handle Submit Register'),
  pagination: { showSizeChanger: false },
  productList,
  providerList,
}
