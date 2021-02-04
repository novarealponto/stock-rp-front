import React, { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, message } from 'antd'
import { compose, path } from 'ramda'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import {
  getResourcesByTypeAccount,
  getUserById,
  updateUsuario,
} from '../../../services/usuario'
import { getTypeAccount } from '../../../services/typeAccount'
import { buildUser, buildUserUpdate } from '../../../utils/userSpec'
import EditUserContainer from '../../../containers/User/EditUser'
import PERMISSIONS from '../../../utils/permissions'
import { clearValueUsuario } from '../../../store/Actions/user'

const createUserText = 'Usuário alterado com sucesso!'
const unableCreateUserText = 'Não foi possível alterar o usuário!'
const unableSetThatAccountType =
  'Não foi possível pegar as permissões desse tipo de conta!'

const successMessage = (messageText) => message.success(messageText)
const errorMessage = (messageText) => message.error(messageText)

const EditUser = ({ clearValueUsuario, userReducer }) => {
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
    const userParser = {
      id: path(['id'], userReducer),
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
    getUserById(userReducer.id).then(({ data }) => {
      form.setFieldsValue(buildUserUpdate(data))
      setAllowCustomPermissions(!!path(['customized'], data))
    })

    getAllTypeAccount()

    return () => clearValueUsuario()
  }, [form, userReducer, getAllTypeAccount])

  return (
    <EditUserContainer
      allowCustomPermissions={allowCustomPermissions}
      form={form}
      handleAllowSetCustomPermissions={handleAllowSetCustomPermissions}
      handleOnTypeAccountChange={handleOnTypeAccountChange}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
      typeAccounts={typeAccounts}
    />
  )
}

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
})

const mapDispacthToProps = (dispach) =>
  bindActionCreators({ clearValueUsuario }, dispach)

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

EditUser.propTypes = {
  userReducer: PropTypes.shape({
    customized: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    resource: PropTypes.shape({
      addAccessories: PropTypes.bool.isRequired,
      addAnalyze: PropTypes.bool.isRequired,
      addCar: PropTypes.bool.isRequired,
      addCompany: PropTypes.bool.isRequired,
      addEntr: PropTypes.bool.isRequired,
      addEntry: PropTypes.bool.isRequired,
      addEquip: PropTypes.bool.isRequired,
      addEquipType: PropTypes.bool.isRequired,
      addFonr: PropTypes.bool.isRequired,
      addKit: PropTypes.bool.isRequired,
      addKitOut: PropTypes.bool.isRequired,
      addMark: PropTypes.bool.isRequired,
      addOutPut: PropTypes.bool.isRequired,
      addPart: PropTypes.bool.isRequired,
      addProd: PropTypes.bool.isRequired,
      addRML: PropTypes.bool.isRequired,
      addROs: PropTypes.bool.isRequired,
      addStatus: PropTypes.bool.isRequired,
      addTec: PropTypes.bool.isRequired,
      addType: PropTypes.bool.isRequired,
      addTypeAccount: PropTypes.bool.isRequired,
      addUser: PropTypes.bool.isRequired,
      delROs: PropTypes.bool.isRequired,
      gerROs: PropTypes.bool.isRequired,
      modulo: PropTypes.bool.isRequired,
      suprimento: PropTypes.bool.isRequired,
      tecnico: PropTypes.bool.isRequired,
      updateRos: PropTypes.bool.isRequired,
    }).isRequired,
    typeName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default enhanced(EditUser)
