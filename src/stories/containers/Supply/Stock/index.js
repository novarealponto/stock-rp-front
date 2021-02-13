import React from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { commerce, company, date, random } from 'faker'
import { Form } from 'antd'

import ManagerSupplyStockContainer from '../../../../containers/Supply/Stock/Manager'

export default {
  title: 'Containers/Supply/Stock',
  component: ManagerSupplyStockContainer,
}

const dataSource = new Array(30).fill(null).map((_, key) => ({
  key,
  outputs: new Array(3).fill(null).map((_, key) => ({
    key,
    date: moment(date.past()).format('L'),
    quantity: random.number({ max: 10 }),
    razaoSocial: company.companyName(),
  })),
  product: commerce.productName(),
  quantity: random.number({ max: 100 }),
  updatedAt: moment(date.past()).format('L'),
}))

const Template = (args) => {
  const [formRegister] = Form.useForm()

  return <ManagerSupplyStockContainer {...args} formRegister={formRegister} />
}

export const Manager = Template.bind({})

Manager.args = {
  dataSource,
  handleOnChangeTable: action('handle Change Table'),
  handleOnSearch: action('handle On Search'),
  pagination: { showSizeChanger: false },
}
