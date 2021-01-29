import React from 'react'
import moment from 'moment'
import { commerce, company, date, name, random } from 'faker'

import ReportOSContainer from '../../../../containers/Report/Os'

export default {
  title: 'Containers/Reports',
  component: ReportOSContainer,
}

const osList = []
const statusList = []
const technicianList = []

for (let key = 0; key < 20; key++) {
  osList.push({
    date: moment(date.past()).format('L'),
    key,
    os: key,
    products: [
      {
        missout: random.number({ max: 10, precision: 1 }),
        output: random.number({ max: 10, precision: 1 }),
        product: commerce.productName(),
        reserve: random.number({ max: 10, precision: 1 }),
        return: random.number({ max: 10, precision: 1 }),
        status: 'VENDA',
      },
    ],
    razaoSocial: company.companyName(),
    technician: name.firstName(),
  })

  statusList.push({
    id: key,
    status: commerce.department(),
  })

  technicianList.push({
    id: key,
    name: name.firstName(),
  })
}

const Template = (args) => {
  return <ReportOSContainer {...args} />
}

export const Os = Template.bind({})

Os.args = {
  osList,
  statusList,
  technicianList,
}
