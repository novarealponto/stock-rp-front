import React, { useState } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { commerce, company, date, random } from 'faker'

import ReportSupplyContainer from '../../../../containers/Report/Supply'

export default {
  title: 'Containers/Reports',
  container: ReportSupplyContainer,
}

const dataSource = []

for (let key = 0; key < 50; key++) {
  dataSource.push({
    code: key,
    date: moment(date.past()).format('L'),
    key,
    manufacturer: company.companyName(),
    product: commerce.productName(),
    quantity: random.number(),
    quantityMin: random.number(),
  })
}

const handleChangeSelectAction = action('Change table')

const Template = (args) => {
  const [select, setSelect] = useState('ESTOQUE')

  const handleChangeSelect = (select) => {
    handleChangeSelectAction(select)
    setSelect(select)
  }

  return (
    <ReportSupplyContainer
      {...args}
      handleChangeSelect={handleChangeSelect}
      select={select}
    />
  )
}

export const Supply = Template.bind({})

Supply.args = {
  dataSource,
  handleClickPrinterIcon: action('Click printer icon'),
  handleOnChangeTable: action('Change table'),
  handleSubmitSearch: action('Submit search'),
  pagination: { showSizeChanger: false },
}
