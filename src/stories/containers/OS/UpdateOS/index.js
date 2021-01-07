import React from 'react'
import moment from 'moment'
import { actions } from '@storybook/addon-actions'
import { commerce, name, random } from 'faker'
import { has } from 'ramda'
import { Form, message } from 'antd'

import UpdateOsContainer from '../../../../containers/OS/UpdateOs'
import { validateSerialNumberForEntry } from '../../../../utils/validators'

export default {
  title: 'Containers/Os',
  component: UpdateOsContainer,
}

const productList = []
const statusList = [
  { key: 1, status: 'Venda' },
  { key: 2, status: 'Troca' },
  { key: 3, status: 'Conserto' },
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
    <UpdateOsContainer
      {...args}
      form={form}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      productList={productList}
      statusList={statusList}
      technicianList={technicianList}
    />
  )
}

export const UpdateOS = Template.bind({})

UpdateOS.args = {
  allowChanges: true,
  goBack: actions('Go to back page'),
  handleSubmit: actions('Submit form'),
  initialValues: {
    cnpj: '58.388.713/0001-54',
    date: moment().add(3, 'day'),
    products: [
      {
        key: 0,
        name: 0,
        fieldKey: 0,
        product: 'teste',
        quantity: 1,
      },
    ],
    razaoSocial: 'testes analise de peça LTDA',
    technician: 2,
  },
}
