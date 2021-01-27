import React from 'react';
import { commerce, company, random, vehicle } from 'faker'
import EditProducts from '../../../../containers/Product/Edit';

export default {
    title: 'Containers/Products/EditProducts',
    component: EditProducts
  }

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

const Template = () => {

  return (
    <EditProducts
      dataSource={initialDataSource}
    />
  );
};

export const Edit = Template.bind({});

