import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, company, random, vehicle } from 'faker'

import ManageProducts from '../../../../containers/Product/Manage'

export default {
  title: 'Containers/Products/ManageProducts',
  component: ManageProducts
}

const handleOnClickCloseSearchFormAction = action('on click close search')
const handleOnClickEditAction = action('on click edit')
const handleOnClickOpenSearchFormAction = action('on click open search')
const handleOnSearchAction = action('Search')

const initialDataSource = []

for (let key = 0; key < 100; key++) {
  initialDataSource.push({
    key,
    brand: company.companyName(),
    category: vehicle.model(), 
    column: random.number(),
    drawer: random.number(),
    key: random.uuid(),
    lobby: random.number(),
    mark: vehicle.manufacturer(),
    product: commerce.productName(),
    productDescription: commerce.productDescription(),
    quantityMin: random.number(),
    type: vehicle.type(),
    serialNumber: random.float(),
    shelf: random.number(),
    sku: random.float(),
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
    <ManageProducts
      {...args}
      visibleSearch={visibleSearch}
      dataSource={initialDataSource}
      handleOnClickOpenSearchForm={handleOnClickOpenSearchForm}
      handleOnClickCloseSearchForm={handleOnClickCloseSearchForm}W
    />
  )
}

export const Os = Template.bind({})

Os.args = {
  handleOnClickEdit: handleOnClickEditAction,
  handleOnSearch: handleOnSearchAction,
}
