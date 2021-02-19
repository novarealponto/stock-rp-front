import React, { useEffect } from 'react'
import { Form, message } from 'antd'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import { buildProvider, buildProviderUpdate } from '../../../../utils/providerSpec'
import EditProviderContainer from '../../../../containers/Supply/Provider/Edit'
import {
  getProviderById,
  UpdateProvider,
} from '../../../../services/Suprimentos/fornecedor'

const success = () => message.success('Fornecedor atualizado com sucesso.')
const errorMessage = () => message.error('Houve um erro ao atualizar fornecedor.')

const EditProvider = ({ history, match }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    const { id } = match.params

    getProviderById(id).then(({ data }) => {
      form.setFieldsValue(buildProviderUpdate(data))
    })
  }, [form, match])

  const handleSubmit = async (formData) => {
    try {
      const { id } = match.params

      await UpdateProvider(buildProvider({ ...formData, id }))
      history.push('/logged/supply/provider/manager')
      success()
    } catch (error) {
      errorMessage()
    }
  }

  return (
    <EditProviderContainer
      form={form}
      handleSubmit={handleSubmit}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(EditProvider)
