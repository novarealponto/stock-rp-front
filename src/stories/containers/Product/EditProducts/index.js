import React from 'react';
import { action } from '@storybook/addon-actions'
import { commerce, company, random, vehicle } from 'faker'
import EditProducts from '../../../../containers/Product/Edit';
import { Form } from 'antd'

import buildProduct from '../../../../utils/productSpec'

export default {
    title: 'Containers/Products/EditProducts',
    component: EditProducts
  }

  const handleSubmitAction = action('On submit user form!');

  const initialValues = {
    mark: company.companyName(),
    category: vehicle.model(), 
    coluna: random.number(),
    prateleira: random.number(),
    key: random.uuid(),
    corredor: random.number(),
    mark: vehicle.manufacturer(),
    name: commerce.productName(),
    description: commerce.productDescription(),
    minimumStock: random.number(),
    type: vehicle.type(),
    serialNumber: random.float(),
    gaveta: random.number(),
    sku: random.float(),
  }

  const Template = (args) => {
    const [form] = Form.useForm();
  
    const handleSubmit = formData => handleSubmitAction(buildProduct(formData));
  
    return (
      <EditProducts
        {...args}
        form={form}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
    )
  }

export const Edit = Template.bind({});

