import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Form } from 'antd'

import buildProductType from '../../../../utils/productTypeSpec'
import filterData from '../../../../utils/filterData'
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

const handleAddProductTypeAction = action('Register new type account')
const handleOnChangeTableAction = action('Go to AddProductType page')
const handleOnSearchAction = action('Search')
const openModalAddProductTypeAction = action(
  'Open modal resgister new type account'
)

const Template = (args) => {
  const [data, setData] = useState(initialData)
  const [formAddProductType] = Form.useForm()
  const [searching, setSearching] = useState(false)
  const [visibleModalAddProductType, setVisibleModalAddProductType] = useState(
    false
  )

  const closeModalAddProductType = () => {
    setVisibleModalAddProductType(false)
  }

  const handleAddProductType = (addProductTypeFormData) => {
    formAddProductType.resetFields()
    initialData.push({
      key: initialData.length,
      type: addProductTypeFormData.productType,
    })
    setVisibleModalAddProductType(false)
    handleAddProductTypeAction(buildProductType(addProductTypeFormData))
  }

  const handleSearch = async (searchValue) => {
    setSearching(true)
    setData(filterData({ type: searchValue }, initialData))
    handleOnSearchAction(searchValue)

    new Promise((resolve) => resolve()).then(
      setTimeout(() => {
        setSearching(false)
      }, 500)
    )
  }

  const openModalAddProductType = () => {
    setVisibleModalAddProductType(true)
    openModalAddProductTypeAction()
  }

  return (
    <ManageProductTypes
      {...args}
      dataSource={data}
      closeModalAddProductType={closeModalAddProductType}
      formAddProductType={formAddProductType}
      handleAddProductType={handleAddProductType}
      handleSearch={handleSearch}
      openModalAddProductType={openModalAddProductType}
      searching={searching}
      visibleModalAddProductType={visibleModalAddProductType}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  onChangeTable: (event) => handleOnChangeTableAction(event),
}
