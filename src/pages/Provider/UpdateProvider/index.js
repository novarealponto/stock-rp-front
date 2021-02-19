import React from 'react'
import { bindActionCreators } from 'redux'
import { compose, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, message } from 'antd'

import  { buildProvider } from '../../../utils/providerSpec'
import UpdateProviderContainer from '../../../containers/Provider/UpdateProvider'
import { clearValueFornecedor } from '../../../store/Actions/fornecedor'
import { updateFornecedor } from '../../../services/fornecedores'

const messageErrorText = 'Erro ao atualizar fornecedor'
const messageSuccessText = 'Fornecedor atualizado com sucesso'

const UpdateProvider = ({
  clearValueFornecedor,
  fornecedorReducer,
  history,
}) => {
  const [form] = Form.useForm()

  const handleCancel = () => {
    clearValueFornecedor()
    history.push('manager')
  }

  const handleSubmit = async (providerFormData) => {
    try {
      const { status } = await updateFornecedor({
        ...buildProvider(providerFormData),
        id: pathOr('', ['id'], fornecedorReducer),
      })

      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      form.resetFields()
      message.success(messageSuccessText)
      clearValueFornecedor()
      history.push('manager')
    } catch (err) {
      console.log(err)
      message.error(messageErrorText)
    }
  }

  return (
    <UpdateProviderContainer
      form={form}
      handleSubmit={handleSubmit}
      initialValues={buildProvider(fornecedorReducer)}
      handleCancel={handleCancel}
    />
  )
}

const mapDispacthToProps = (dispatch) =>
  bindActionCreators({ clearValueFornecedor }, dispatch)

const mapStateToProps = ({ fornecedorReducer }) => ({ fornecedorReducer })

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(UpdateProvider)
