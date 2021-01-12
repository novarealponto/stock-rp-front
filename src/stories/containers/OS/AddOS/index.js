import React from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, name, random } from 'faker'
import { Form, message } from 'antd'
import { has } from 'ramda'

import ManagerContainer from '../../../../containers/OS/AddOS'
import { validateSerialNumberForEntry } from '../../../../utils/validators'

export default {
  title: 'Containers/Os',
  component: ManagerContainer,
}

const productList = []
const statusList = [
  { status: 'Venda', key: 1 },
  { status: 'Troca', key: 2 },
  { status: 'Conserto', key: 3 },
]
const technicianList = []

for (let key = 0; key < 20; key++) {
  productList.push({
    key,
    max: random.number() % 30,
    name: commerce.productName(),
    serial: random.boolean(),
  })
  technicianList.push({
    key,
    name: name.firstName(),
  })
}

const Template = (args) => {
  const [form] = Form.useForm()

  const onPressEnterTextAreaSerialNumber = async ({ target }) => {
    const currentTargetValue = target.value

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue, {
        noRequest: true,
      })

      if (has('error', response)) {
        const { error, serialNumbers } = response
        form.setFieldsValue({ serialNumbers })
        message.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ManagerContainer
      {...args}
      form={form}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      productList={productList}
      statusList={statusList}
      technicianList={technicianList}
    />
  )
}

export const AddOS = Template.bind({})

AddOS.args = {
  handleSubmit: action('Submit form'),
}
