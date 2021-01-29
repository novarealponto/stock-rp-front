import React from 'react';
import { action } from '@storybook/addon-actions'
import { commerce, company, random, vehicle } from 'faker'
import { Form } from 'antd'

import buildProduct from '../../../../utils/productSpec'
import EditProducts from '../../../../containers/Product/Edit';

export default {
    title: 'Containers/Products/EditProducts',
    component: EditProducts
  }

  const handleSubmitAction = action('On submit user form!');

  const initialValues = {
    category: vehicle.model(), 
    coluna: random.number(),
    corredor: random.number(),
    description: commerce.productDescription(),
    mark: company.companyName(),
    gaveta: random.number(),
    key: random.uuid(),
    mark: vehicle.manufacturer(),
    minimumStock: random.number(),
    name: commerce.productName(),
    prateleira: random.number(),
    serialNumber: random.float(),
    type: vehicle.type(),
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

