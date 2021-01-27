import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { has } from 'ramda'
import { random, commerce } from 'faker'
import { Form, message } from 'antd'

import ECommerceAddContainer from '../../../../containers/E-Commerce/Add'
import { validateSerialNumberForEntry } from '../../../../utils/validators'

export default {
  title: 'Containers/E-Commerce',
  component: ECommerceAddContainer,
}

const productList = []

for (let key = 0; key < 20; key++) {
  productList.push({
    key,
    max: random.number() % 30,
    name: commerce.productName(),
    serial: random.boolean(),
    category: random.boolean() ? 'equipamento' : 'peça',
  })
}

const handleOnSubmitAction = action('Submit form')

const Template = (args) => {
  const [form] = Form.useForm()
  const [max, setMax] = useState(1)
  const [productBaseId, setProductBaseId] = useState('')
  const [visibleTextArea, setVisibleTextArea] = useState(false)

  const handleChangeProduct = (_, { key, max, serial }) => {
    setMax(max)
    setProductBaseId(key)
    setVisibleTextArea(serial)
  }
  const handleOnSubmit = (formData) => {
    handleOnSubmitAction(formData)
    form.resetFields()
    setProductBaseId('')
    setVisibleTextArea(false)
  }

  const onPressEnterTextAreaSerialNumber = async ({ target, max }) => {
    const currentTargetValue = target.value

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue, {
        noRequest: true,
        limit: max,
      })

      if (has('error', response)) {
        const { error, serialNumbers, length } = response
        form.setFieldsValue({ serialNumbers, quantity: length })
        message.error(error)
      } else {
        const { length } = response
        form.setFieldsValue({ quantity: length })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ECommerceAddContainer
      {...args}
      handleChangeProduct={handleChangeProduct}
      handleOnSubmit={handleOnSubmit}
      form={form}
      max={max}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      productBaseId={productBaseId}
      productList={productList}
      visibleTextArea={visibleTextArea}
    />
  )
}

export const Add = Template.bind({})
