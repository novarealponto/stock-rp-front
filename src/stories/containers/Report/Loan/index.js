import React from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { company, date, random } from 'faker'

import ReportLoanContainer from '../../../../containers/Report/Loan'

export default {
  title: 'Containers/Reports',
  component: ReportLoanContainer,
}

const dataSource = []

for (let key = 0; key < 20; key++) {
  dataSource.push({
    date: moment(date.past()).format('L'),
    key,
    razaoSocial: company.companyName(),
    return: moment(date.past()).format('L'),
    serialNumber: random.number(),
    solicitation: moment(date.past()).format('L'),
  })
}

const Template = (args) => {
  return <ReportLoanContainer {...args} />
}

export const Loan = Template.bind({})

Loan.args = {
  dataSource,
  handleSubmitSearch: action('Submit search'),
  onChangeTable: action('Change table'),
}
