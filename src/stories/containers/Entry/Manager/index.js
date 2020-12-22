import React from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, date, internet, random } from 'faker'
import moment from 'moment'

import ManagerContainer from '../../../../containers/Entry/Manager'

export default {
  title: 'Containers/Entries',
  component: ManagerContainer,
}

const dataSource = []

for (let key = 0; key < 100; key++) {
  dataSource.push({
    date: moment(date.past()).format('L'),
    key,
    product: commerce.productName(),
    quant: random.number(),
    username: internet.userName(),
  })
}

const Template = (args) => <ManagerContainer {...args} dataSource={dataSource} />

export const Manager = Template.bind({})

Manager.args = {
  handleOnSearch: action('Handle Search'),
  onChangeTable: action('Change table'),
}
