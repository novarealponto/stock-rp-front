import React, { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
<<<<<<< HEAD
import { Form, message } from 'antd'
import { compose, length, path, pathOr, pipe } from 'ramda'
=======
import { connect } from 'react-redux'
import { Form, message } from 'antd'
import { compose, path } from 'ramda'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
>>>>>>> 7c53950... chore: all changes

import {
  getResourcesByTypeAccount,
  getUserById,
  updateUsuario,
} from '../../../services/usuario'
import { getTypeAccount } from '../../../services/typeAccount'
import { buildUser, buildUserUpdate } from '../../../utils/userSpec'
import EditUserContainer from '../../../containers/User/EditUser'
import PERMISSIONS from '../../../utils/permissions'
<<<<<<< HEAD
=======
import { clearValueUsuario } from '../../../store/Actions/user'
>>>>>>> 7c53950... chore: all changes

const createUserText = 'Usuário alterado com sucesso!'
const unableCreateUserText = 'Não foi possível alterar o usuário!'
const unableSetThatAccountType =
  'Não foi possível pegar as permissões desse tipo de conta!'

const successMessage = (messageText) => message.success(messageText)
const errorMessage = (messageText) => message.error(messageText)

<<<<<<< HEAD
const EditUser = () => {
=======
const EditUser = ({ clearValueUsuario, userReducer }) => {
>>>>>>> 7c53950... chore: all changes
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
<<<<<<< HEAD
    const pathname = pipe(pathOr('', ['location', 'pathname']), (item) =>
      item.split('/')
    )(window)

    const id = pathname[length(pathname) - 1]

    getUserById(id).then(({ data }) => {
=======
    getUserById(userReducer.id).then(({ data }) => {
>>>>>>> 7c53950... chore: all changes
      form.setFieldsValue(buildUserUpdate(data))
      setAllowCustomPermissions(!!path(['customized'], data))
    })

    getAllTypeAccount()
<<<<<<< HEAD
  }, [form, getAllTypeAccount])
=======

    return () => clearValueUsuario()
  }, [form, userReducer, getAllTypeAccount])
>>>>>>> 7c53950... chore: all changes

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

<<<<<<< HEAD
const enhanced = compose(withRouter)
=======
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
>>>>>>> 7c53950... chore: all changes

export default enhanced(EditUser)
