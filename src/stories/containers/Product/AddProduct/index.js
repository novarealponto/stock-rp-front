import React from 'react'
import { action } from '@storybook/addon-actions'
import { Form } from 'antd'

import AddProduct from '../../../../containers/Product/AddProduct'
import buildProduct from '../../../../utils/productSpec'

export default {
  title: 'Containers/Product',
  component: AddProduct,
}

const handleSubmitAction = action('On submit user form!');

const Template = (args) => {
  const [form] = Form.useForm();

  const handleSubmit = formData => handleSubmitAction(buildProduct(formData));

  return (
    <AddProduct
      {...args}
      form={form}
      handleSubmit={handleSubmit}
    />
  )
}

export const addNewProduct = Template.bind({})


addNewProduct.args = {
  marksList: [
    {
      mark: 'Marca 1',
    },
    {
      mark: 'Marca 2',
    },
    {
      mark: 'Marca 3',
    },
  ],
  typesList: [
    {
      type: 'Tipo 1',
    },
    {
      type: 'Tipo 2',
    },
    {
      type: 'Tipo 3',
    },
  ],
};
