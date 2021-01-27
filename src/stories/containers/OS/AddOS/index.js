import React from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, name, random } from 'faker'
import { Form, message } from 'antd'
import { has } from 'ramda'

import AddOSContainer from '../../../../containers/OS/AddOS'
import { validateSerialNumberForEntry } from '../../../../utils/validators'

export default {
  title: 'Containers/Os',
  component: AddOSContainer,
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
    category: random.boolean() ? 'equipamento' : 'peca',
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
  const [status, setStatus] = useState('')

  const onChangeStatus = (_, { children }) => {
    setStatus(children)
    form.setFieldsValue({
      product: undefined,
      quantity: 1,
      serialNumbers: undefined,
    })
  }

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
    <AddOSContainer
      {...args}
      form={form}
      onChangeStatus={onChangeStatus}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      productList={productList}
      status={status}
      statusList={statusList}
      technicianList={technicianList}
    />
  )
}

export const AddOS = Template.bind({})

AddOS.args = {
  handleSubmit: action('Submit form'),
}
