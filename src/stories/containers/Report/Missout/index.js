import React from 'react'
import moment from 'moment'
import { commerce, date, name, random } from 'faker'

import ReportMissoutContainer from '../../../../containers/Report/Missout'

export default {
  title: 'Containers/Reports',
  component: ReportMissoutContainer,
}

const dataSource = []
const technicianList = []

for (let key = 0; key < 20; key++) {
  dataSource.push({
    date: moment(date.past()).format('L'),
    key,
    os: key,
    product: commerce.productName(),
    quantity: random.number({ max: 5 }),
    technician: name.firstName(),
  })

  technicianList.push({
    id: key,
    name: name.firstName(),
  })
}

const Template = (args) => {
  return <ReportMissoutContainer {...args} />
}

export const ReportMissout = Template.bind({})

ReportMissout.args = {
  dataSource,
  technicianList,
}
