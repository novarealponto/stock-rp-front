import React from 'react'
import { Form, message } from 'antd'

import AddProductTypeContainer from '../../../containers/ProductType/AddProductType'
import buildProductType from '../../../utils/productTypeSpec'
import { newProductType } from '../../../services/produto'

const AddProductType = ({}) => {
  const [form] = Form.useForm()

  const handleSubmit = async (productTypeFormData) => {
    try {
      const { status, data } = await newProductType(
        buildProductType(productTypeFormData)
      )

      if (status !== 200 && status !== 201) {
        throw new Error()
      }

      form.resetFields()
      message.success('Tipo de produto cadastro com sucesso')
    } catch (err) {
      message.error('Erro ao casdastrar tipo de produto')
      console.log(err)
    }
  }

  return <AddProductTypeContainer form={form} handleSubmit={handleSubmit} />
}

export default AddProductType
