import React, { useState } from 'react'
import { Form } from 'antd'
import { action } from '@storybook/addon-actions'

import UpdateProviderContainer from '../../../../containers/Provider/UpdateProvider'
import buildProvider from '../../../../utils/providerSpec'

export default {
  title: 'Containers/Providers',
  component: UpdateProviderContainer,
}

const handleSubmitAction = action('Update provider')

const Template = (args) => {
  const [form] = Form.useForm()

  const handleSubmit = (providerFormData) => {
    form.resetFields()
    handleSubmitAction(buildProvider(providerFormData))
  }

  return (
    <UpdateProviderContainer {...args} form={form} handleSubmit={handleSubmit} />
  )
}

export const UpdateProvider = Template.bind({})

UpdateProvider.args = {
  initialValues: {
    city: 'Diadema',
    cnpj: '78576261735508',
    complement: '',
    email: 'jessi_leandro@hotmail.com',
    nameContact: 'Jessi L C',
    neighborhood: 'Taboão',
    number: '170',
    razaoSocial: 'Sauer, Stamm and Medhurst',
    referencePoint: '(Jd Nações)',
    state: 'SP',
    street: 'Rua Paramaribo',
    telphone: '11963214760',
    zipCode: '09930210',
  },
  handleCancel: action('Cancel update provider'),
}
