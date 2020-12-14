import React from 'react'
import { action } from '@storybook/addon-actions'
import { Form, message } from 'antd'

import UpdateProductTypeContainer from '../../../../containers/ProductType/UpdateProductType'

export default {
  title: 'Containers/ProductTypes',
  component: UpdateProductTypeContainer,
}

const handleSubmitAction = action('Submit form')

const Template = (args) => {
  const [form] = Form.useForm()

  const handleSubmit = (productTypeFormData) => {
    handleSubmitAction(productTypeFormData)
    form.resetFields()
    message.success('Tipo de produto atualizado com sucesso')
  }

  return (
    <UpdateProductTypeContainer
      {...args}
      form={form}
      handleSubmit={handleSubmit}
    />
  )
}

export const UpdateProductType = Template.bind({})

UpdateProductType.args = {
  initialValues: {
    productType: 'Relógio',
  },
}
