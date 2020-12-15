import React from 'react'
import { Form, message } from 'antd'

import AddTypeAccountContainer from '../../../containers/TypeAccount/AddTypeAccount'
import buildTypeAccount from '../../../utils/typeAccountSpec'
import PERMISSIONS from '../../../utils/permissions'
import { newTypeAccount } from '../../../services/typeAccount'

const createTypeAccountText = 'Tipo de conta cadastrado com sucesso!'
const unableCreateTypeAccountText = 'Não foi possível cadastrar o tipo de conta!'

const AddTypeAccount = ({}) => {
  const [form] = Form.useForm()

  const handleSubmit = async (typeAccountFormData) => {
    try{
      const { status } = await newTypeAccount(buildTypeAccount(typeAccountFormData))

      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      form.resetFields()
      message.success(createTypeAccountText)
    } catch(err) {
      message.error(unableCreateTypeAccountText)
      console.log(err);
    }
  }

  return (
    <AddTypeAccountContainer
      form={form}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
    />
  )
}

export default AddTypeAccount
