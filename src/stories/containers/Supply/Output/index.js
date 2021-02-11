import React, { useState } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { commerce, date, internet, name, random } from 'faker'
import { Form } from 'antd'

import ManagerSupplyOutputContainer from '../../../../containers/Supply/Output/Manager'

export default {
  title: 'Containers/Supply/Output',
  component: ManagerSupplyOutputContainer,
}

const dataSource = new Array(30).fill(null).map((_, key) => ({
  createdAt: moment(date.past()).format('L'),
  emailRequester: internet.email(),
  emailResponsible: internet.email(),
  key,
  product: commerce.productName(),
  quantity: random.number({ max: 100 }),
  requester: name.firstName(),
  user: name.firstName(),
}))

const productList = new Array(30).fill(null).map((_, id) => ({
  id,
  name: commerce.productName(),
}))

const Template = (args) => {
  const [formRegister] = Form.useForm()
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)

  const handleClickNewSupplyOutput = () => setVisibleModalRegister(true)

  const handleClickOnCancel = () => {
    setVisibleModalRegister(false)
    formRegister.resetFields()
  }

  return (
    <ManagerSupplyOutputContainer
      {...args}
      formRegister={formRegister}
      handleClickNewSupplyOutput={handleClickNewSupplyOutput}
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
}
