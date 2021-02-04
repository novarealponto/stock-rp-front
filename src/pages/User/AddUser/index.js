import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, message } from 'antd'
import { compose, pathOr } from 'ramda'
import PropTypes from 'prop-types'

import {
  getResourcesByTypeAccount,
  NovoUsuarioService,
} from '../../../services/usuario'
import { getTypeAccount } from '../../../services/typeAccount'
import { buildUser } from '../../../utils/userSpec'
import AddUserContainer from '../../../containers/User/AddUser'
import PERMISSIONS from '../../../utils/permissions'

const createUserText = 'Usuário cadastrado com sucesso!'
const unableCreateUserText = 'Não foi possível cadastrar o usuário!'
const unableSetThatAccountType =
  'Não foi possível pegar as permissões desse tipo de conta!'

const successMessage = (messageText) => message.success(messageText)
const errorMessage = (messageText) => message.error(messageText)

const AddUser = ({ allowAddTypeAccount, history }) => {
  const [allowCustomPermissions, setAllowCustomPermissions] = useState(false)
  const [form] = Form.useForm()
  const [shouldRequest, setShouldRequest] = useState(true)
  const [typeAccounts, setTypeAccounts] = useState([])

  useEffect(() => {
    if (shouldRequest) {
      getAllTypeAccount()
    }
  }, [shouldRequest])

  const getAllTypeAccount = async () => {
    let responseStatus = null
    try {
      const query = {
        filters: {
          typeAccount: {
            specific: {
              stock: true,
            },
          },
        },
      }

      const { data, status } = await getTypeAccount(query)
      responseStatus = status
      setTypeAccounts(data.rows)
      setShouldRequest(false)
    } catch (error) {
      setShouldRequest(false)
      console.log({ status: responseStatus, error })
    }
  }

  const goToAddTypeAccount = () => history.push('/logged/typeAccount/add')

  const handleAllowSetCustomPermissions = () =>
    setAllowCustomPermissions(!allowCustomPermissions)

  const handleOnTypeAccountChange = async (typeAccount) => {
    try {
      const query = {
        filters: {
          typeAccount: {
            specific: {
              typeName: typeAccount,
            },
          },
        },
      }

      const { data } = await getResourcesByTypeAccount(query)

      form.setFieldsValue({
        ...data,
        typeAccount,
      })
    } catch (error) {
      errorMessage(unableSetThatAccountType)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const { status } = await NovoUsuarioService(
        buildUser({
          ...formData,
          allowCustomPermissions,
        })
      )
      if (status === 422) {
        throw new Error('422 Unprocessable Entity!')
      }
      form.resetFields()
      successMessage(createUserText)
    } catch (error) {
      errorMessage(unableCreateUserText)
    }
  }

  return (
    <AddUserContainer
      allowAddTypeAccount={allowAddTypeAccount}
      allowCustomPermissions={allowCustomPermissions}
      form={form}
      goToAddTypeAccount={goToAddTypeAccount}
      handleAllowSetCustomPermissions={handleAllowSetCustomPermissions}
      handleOnTypeAccountChange={handleOnTypeAccountChange}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
      typeAccounts={typeAccounts}
    />
  )
}

const mapStateToProps = ({ auth }) => {
  const allowAddTypeAccount = pathOr(false, ['addTypeAccount'], auth)
  return {
    allowAddTypeAccount,
  }
}

const enhanced = compose(connect(mapStateToProps), withRouter)

AddUser.propTypes = {
  allowAddTypeAccount: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default enhanced(AddUser)
