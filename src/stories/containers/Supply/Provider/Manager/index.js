import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { company, random, vehicle } from 'faker'

import ManageProviderSupply from '../../../../../containers/Supply/Provider/Manager'

export default {
  title: 'Containers/Supply/Provider/Manager',
  component: ManageProviderSupply
}

const handleOnClickCloseSearchFormAction = action('on click close search')
const handleOnClickEditAction = action('on click edit')
const handleOnClickOpenSearchFormAction = action('on click open search')
const handleOnSearchAction = action('Search')

const initialDataSource = []

for (let key = 0; key < 100; key++) {
  initialDataSource.push({
    cnpj: company.companyName(),
    createdAt: vehicle.model(), 
    razaoSocial: random.number(),
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
    <ManageProviderSupply
      {...args}
      dataSource={initialDataSource}
      handleOnClickCloseSearchForm={handleOnClickCloseSearchForm}
      handleOnClickOpenSearchForm={handleOnClickOpenSearchForm}
      visibleSearch={visibleSearch}
    />
  )
}

export const Os = Template.bind({})

Os.args = {
  handleOnClickEdit: handleOnClickEditAction,
  handleOnSearch: handleOnSearchAction,
}
