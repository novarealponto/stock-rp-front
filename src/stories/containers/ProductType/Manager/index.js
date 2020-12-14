import React, { useState } from 'react'
import { filter, length, match } from 'ramda'
import { action } from '@storybook/addon-actions'

import ManageProductTypes from '../../../../containers/ProductType/Manager'

const initialData = []

for (let i = 0; i < 100; i++) {
  initialData.push({
    key: i,
    type: `name teste ${i}`,
  })
}

export default {
  title: 'Containers/ProductTypes',
  component: ManageProductTypes,
}

const goToAddProductTypeAction = action('Go to AddProductType page')
const goToUpdateProductTypeAction = action('Go to EditProductType page')
const onChangeTableAction = action('Go to AddProductType page')
const onSearchAction = action('Search')

const Template = (args) => {
  const [data, setData] = useState(initialData)
  const [searching, setSearching] = useState(false)

  const applyMatch = (key, object, value) =>
    match(createRegex(value), object[key])

  const createRegex = (pattern) => new RegExp(`${pattern}`, 'gi')

  const filterData = (searchValue) => {
    const callback = (item) => {
      return length(applyMatch('type', item, searchValue)) > 0
    }
    return filter(callback, initialData)
  }

  const handleSearch = async (searchValue) => {
    setSearching(true)
    setData(filterData(searchValue))
    onSearchAction(searchValue)

    new Promise((resolve) => resolve()).then(
      setTimeout(() => {
        setSearching(false)
      }, 500)
    )
  }

  return (
    <ManageProductTypes
      {...args}
      dataSource={data}
      searching={searching}
      handleSearch={handleSearch}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  goToUpdateProductType: (productType) =>
    goToUpdateProductTypeAction(productType),
  goToAddProductType: () => goToAddProductTypeAction(),
  onChangeTable: (event) => onChangeTableAction(event),
}
