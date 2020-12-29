import React, { useState } from 'react'
import { name, random, commerce } from 'faker'

import ManagerContainer from '../../../../containers/OS/AddOS'

export default {
  title: 'Containers/Os',
  component: ManagerContainer,
}

const technicianList = []
const productList = []
const statusList = [
  { status: 'Venda', key: 0 },
  { status: 'Troca', key: 1 },
  { status: 'Conserto', key: 2 },
]

for (let key = 0; key < 20; key++) {
  technicianList.push({
    key,
    name: name.firstName(),
  })
  productList.push({
    key,
    name: commerce.productName(),
    serial: random.boolean(),
  })
}

const Template = () => {
  const [visibleTextArea, setVisibleTextArea] = useState(false)

  const handleChangeProduct = (_, { serial }) => setVisibleTextArea(serial)

  return (
    <ManagerContainer
      statusList={statusList}
      productList={productList}
      technicianList={technicianList}
      visibleTextArea={visibleTextArea}
      handleChangeProduct={handleChangeProduct}
    />
  )
}

export const AddOS = Template.bind({})
