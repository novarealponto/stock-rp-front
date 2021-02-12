import React from 'react'
import { Form } from 'antd'
import { action } from '@storybook/addon-actions'

import AddProviderSupContainer from '../../../../../containers/Supply/Register/Provider'
import buildProvider from '../../../../../utils/providerSpec'

export default {
  title: 'Containers/Supply/Register/Provider',
  component: AddProviderSupContainer,
}

const handleSubmitAction = action('Register new provider')

const Template = () => {
  const [form] = Form.useForm()

  const handleSubmit = (providerFormData) => {
    form.resetFields()
    handleSubmitAction(buildProvider(providerFormData))
  }

  return (
    <AddProviderSupContainer form={form} handleSubmit={handleSubmit} />
  )
}

export const AddProvider = Template.bind({})
