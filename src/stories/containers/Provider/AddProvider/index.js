import React from 'react'
import { Form } from 'antd'
import { action } from '@storybook/addon-actions'

import AddProviderContainer from '../../../../containers/Provider/AddProvider'
import buildProvider from '../../../../utils/providerSpec'

export default {
  title: 'Containers/Providers',
  component: AddProviderContainer,
}

const handleSubmitAction = action('Register new provider')

const Template = () => {
  const [form] = Form.useForm()

  const handleSubmit = (providerFormData) => {
    form.resetFields()
    handleSubmitAction(buildProvider(providerFormData))
  }

  return (
    <AddProviderContainer form={form} handleSubmit={handleSubmit} />
  )
}

export const AddProvider = Template.bind({})
