import React from 'react'
import { action } from '@storybook/addon-actions'
import { Form, message } from 'antd'

import AddProductTypeContainer from '../../../../containers/ProductType/AddProductType'

export default {
  title: 'Containers/ProductTypes',
  component: AddProductTypeContainer,
}

const handleSubmitAction = action('Submit form')

const Template = (args) => {
  const [form] = Form.useForm()

  const handleSubmit = (productTypeFormData) => {
    handleSubmitAction(productTypeFormData)
    form.resetFields()
    message.success('Tipo de produto cadastrado com sucesso')
  }

  return (
    <AddProductTypeContainer {...args} form={form} handleSubmit={handleSubmit} />
  )
}

export const AddProductType = Template.bind({})

AddProductType.args = {}
