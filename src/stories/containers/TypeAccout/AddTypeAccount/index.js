import React from 'react'
import { action } from '@storybook/addon-actions'
import { Form } from 'antd'

import AddTypeAccountContainer from '../../../../containers/TypeAccount/AddTypeAccount'
import buildTypeAccount from '../../../../utils/typeAccountSpec'
import PERMISSIONS from '../../../../utils/permissions'

const submitFormAction = action('Register new type account')

export default {
  title: 'Containers/TypeAccount',
  component: AddTypeAccountContainer,
}

const Template = (args) => {
  const [form] = Form.useForm()

  const handleSubmit = (typeAccountFormData) =>
    submitFormAction(buildTypeAccount(typeAccountFormData))

  return (
    <AddTypeAccountContainer
      form={form}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
    />
  )
}

export const AddTypeAccount = Template.bind({})
