import React from 'react'
import { Form, message } from 'antd'

import AddProviderContainer from '../../../containers/Provider/AddProvider'
import  { buildProvider } from '../../../utils/providerSpec'
import { newProvider } from '../../../services/fornecedores'

const messageErrorText = 'Erro ao cadastrar fornecedor'
const messageSuccessText = 'Fornecedor cadastrado com sucesso'

const AddProvider = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (providerFormData) => {
    try {
      const { status } = await newProvider(buildProvider(providerFormData))

      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      form.resetFields()
      message.success(messageSuccessText)
    } catch (err) {
      console.log(err)
      message.error(messageErrorText)
    }
  }

  return <AddProviderContainer form={form} handleSubmit={handleSubmit} />
}

export default AddProvider
