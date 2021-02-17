import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, message } from 'antd'
import { compose, length, path, pathOr, pipe } from 'ramda'

import {
  getResourcesByTypeAccount,
  getUserById,
  updateUsuario,
} from '../../../services/usuario'
import { getTypeAccount } from '../../../services/typeAccount'
import { buildUser, buildUserUpdate } from '../../../utils/userSpec'
import EditUserContainer from '../../../containers/User/EditUser'
import PERMISSIONS from '../../../utils/permissions'

const createUserText = 'Usuário alterado com sucesso!'
const unableCreateUserText = 'Não foi possível alterar o usuário!'
const unableSetThatAccountType =
  'Não foi possível pegar as permissões desse tipo de conta!'

const successMessage = (messageText) => message.success(messageText)
const errorMessage = (messageText) => message.error(messageText)

const EditUser = ({ username }) => {
  const [allowCustomPermissions, setAllowCustomPermissions] = useState(false)
  const [form] = Form.useForm()
  const [typeAccounts, setTypeAccounts] = useState([])

  const getAllTypeAccount = useCallback(async () => {
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
    } catch (error) {
      console.log({ status: responseStatus, error })
    }
  }, [])

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
    const pathname = pipe(pathOr('', ['location', 'pathname']), (item) =>
      item.split('/')
    )(window)

    const id = pathname[length(pathname) - 1]

    const userParser = {
      id,
      ...buildUser(formData),
    }

    try {
      const { status } = await updateUsuario(userParser)

      if (status === 422 || status === 500) {
        throw new Error('Unprocessable Entity!')
      }
      successMessage(createUserText)
    } catch (error) {
      errorMessage(unableCreateUserText)
    }
  }

  useEffect(() => {
    const pathname = pipe(pathOr('', ['location', 'pathname']), (item) =>
      item.split('/')
    )(window)

    const id = pathname[length(pathname) - 1]

    getUserById(id).then(({ data }) => {
      form.setFieldsValue(buildUserUpdate(data))
      setAllowCustomPermissions(!!path(['customized'], data))
    })

    getAllTypeAccount()
  }, [form, getAllTypeAccount])

  return (
    <EditUserContainer
      allowCustomPermissions={allowCustomPermissions}
      allowUpdatePassword={username=== 'modrp'}
      form={form}
      handleAllowSetCustomPermissions={handleAllowSetCustomPermissions}
      handleOnTypeAccountChange={handleOnTypeAccountChange}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
      typeAccounts={typeAccounts}
    />
  )
}

const mapStateToProps = ({ auth }) => {
  const username = pathOr(false, ['username'], auth)
  return {
    username,
  }
}
const enhanced = compose(connect(mapStateToProps), withRouter)

export default enhanced(EditUser)



