import React from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { commerce, date, name, random } from 'faker'

import ReportSoldsContainer from '../../../../containers/Report/Solds'

export default {
  title: 'Containers/Reports',
  component: ReportSoldsContainer,
}

const dataSource = []

for (let key = 0; key < 20; key++) {
  dataSource.push({
    date: moment(date.past()).format('L'),
    key,
    os: key,
    product: commerce.productName(),
    quantity: random.number({ max: 5 }),
    status: [
      {
        key,
        lastDate: moment(date.past()).format('L'),
        status: commerce.department(),
        total: random.number({ max: 10, precision: 1 }),
      },
    ],
    technician: name.firstName(),
  })
}

const Template = (args) => {
  return <ReportSoldsContainer {...args} />
}

export const Solds = Template.bind({})

Solds.args = {
  dataSource,
  handleSubmitSearch: action('Submit search'),
  onChangeTable: action('Change table'),
  pagination: { showSizeChanger: false },
}
