import React, { useState } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { commerce, company, date, random } from 'faker'
import { generate } from '@fnando/cnpj'

import ManagerOsContainer from '../../../../containers/Manager/Os'

export default {
  title: 'Containers/Os',
  component: ManagerOsContainer,
}

const handleOnChangeTableAction = action('Change Table')
const handleOnClickCloseSearchFormAction = action('on click close search')
const handleOnClickEditAction = action('on click edit')
const handleOnClickDeletAction = action('on click delete')
const handleOnClickOpenSearchFormAction = action('on click open search')
const handleOnSearchAction = action('Search')

const initialDataSource = []

for (let key = 0; key < 100; key++) {
  initialDataSource.push({
    cnpj: generate(),
    date: moment(date.past()).format('L'),
    key,
    notDelet: random.boolean(),
    os: random.number(),
    products: [
      {
        key: random.uuid(),
        product: commerce.productName(),
        quantity: random.number(),
      },
      {
        key: random.uuid(),
        product: commerce.productName(),
        quantity: random.number(),
      },
    ],
    razaoSocial: company.companyName(),
  })
}

const Template = (args) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  const handleOnClickCloseSearchForm = (eventClick) => {
    handleOnClickCloseSearchFormAction(eventClick)
    setVisibleSearch(false)
  }

  const handleOnClickOpenSearchForm = (eventClick) => {
    handleOnClickOpenSearchFormAction(eventClick)
    setVisibleSearch(true)
  }

  return (
    <ManagerOsContainer
      {...args}
      visibleSearch={visibleSearch}
      dataSource={initialDataSource}
      handleOnClickOpenSearchForm={handleOnClickOpenSearchForm}
      handleOnClickCloseSearchForm={handleOnClickCloseSearchForm}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  handleOnChangeTable: handleOnChangeTableAction,
  handleOnClickEdit: handleOnClickEditAction,
  handleOnClickDelet: handleOnClickDeletAction,
  handleOnSearch: handleOnSearchAction,
}
