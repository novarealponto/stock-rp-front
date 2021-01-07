import React, { useEffect, useState, useCallback } from 'react'
import {
  applySpec,
  compose,
  equals,
  filter,
  has,
  ifElse,
  length,
  map,
  pathOr,
} from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message, Form } from 'antd'
import { withRouter } from 'react-router-dom'

import UpdateOsContainer from '../../../containers/OS/UpdateOs'
import { clearValueOs } from '../../Gerenciar/Os/OsRedux/action'
import { getAllStatusExpedition } from '../../../services/statusExpedition'
import { getProdutoByEstoque } from '../../../services/produto'
import { getTecnico } from '../../../services/tecnico'
import { updateReservaOs } from '../../../services/reservaOs'
import { validateSerialNumberForEntry } from '../../../utils/validators'

import {
  buildInitialValues,
  buildOsForUpdate,
  buildStatus,
  buildTechnician,
} from './specs'

const UpdateOS = ({ osUpdateValue, history, clearValueOs }) => {
  const [form] = Form.useForm()
  const [productList, setProductList] = useState([])
  const [status, setStatus] = useState('')
  const [statusList, setStatusList] = useState([])
  const [technicianList, setTechnicianList] = useState([])

  const allowChanges = equals(
    length(filter((item) => item.technicianReserve, osUpdateValue.products)),
    0
  )

  const getAllProdutoByEstoque = useCallback(() => {
    const buildProduct = applySpec({
      category: pathOr('', ['category']),
      key: pathOr('', ['id']),
      max: ifElse(
        () => status === 'CONSERTO',
        () => undefined,
        pathOr(1, ['available'])
      ),
      name: pathOr('', ['name']),
      serial: pathOr(false, ['serial']),
    })

    const query = {
      filters: {
        product: {
          specific: {
            serial: status === 'CONSERTO' ? true : undefined,
          },
        },
        productBase: {
          specific: {
            stockBaseId: status === 'CONSERTO' ? null : undefined,
          },
        },
        stockBase: {
          specific: {
            stockBase: status === 'CONSERTO' ? null : 'ESTOQUE',
          },
        },
      },
      stockBaseId: status === 'CONSERTO' ? null : 'ESTOQUE',
    }
    getProdutoByEstoque(query).then(({ data }) =>
      setProductList(map(buildProduct, data))
    )
  }, [status])

  const handleSubmit = async (formData) => {
    try {
      const { status } = await updateReservaOs(
        buildOsForUpdate({ ...osUpdateValue, ...formData })
      )

      if (status === 422 || status === 401 || status === 500) {
        console.log('object')
        throw new Error('422 Unprocessable Entity!')
      }

      message.success('Reserva efetuada com sucesso')
      history.push('manager')
    } catch (err) {
      message.error('Erro ao efetuar reserva')
      console.log(err)
    }
  }

  const onChangeStatus = (_, { children }) => {
    setStatus(children)
    form.setFieldsValue({
      product: undefined,
      quantity: 1,
      serialNumbers: undefined,
    })
  }

  const onPressEnterTextAreaSerialNumber = async ({ target, max }) => {
    const currentTargetValue = target.value

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue, {
        limit: max,
        reserve: status !== 'CONSERTO',
      })

      if (has('error', response)) {
        const { error, serialNumbers, length } = response
        form.setFieldsValue({ serialNumbers, quantity: length })
        message.error(error)
      } else {
        const { length } = response
        form.setFieldsValue({ quantity: length })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllStatusExpedition().then(({ data }) =>
      setStatusList(map(buildStatus, data))
    )
    getTecnico({ total: 100 }).then(({ data }) =>
      setTechnicianList(map(buildTechnician, data))
    )
    return () => clearValueOs()
  }, [clearValueOs])

  useEffect(() => {
    getAllProdutoByEstoque()
  }, [getAllProdutoByEstoque])

  return (
    <UpdateOsContainer
      allowChanges={allowChanges}
      form={form}
      goBack={() => history.push('manager')}
      handleSubmit={handleSubmit}
      initialValues={buildInitialValues(osUpdateValue)}
      onChangeStatus={onChangeStatus}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      productList={productList}
      status={status}
      statusList={statusList}
      technicianList={technicianList}
    />
  )
}

const mapDispacthToProps = (dispatch) =>
  bindActionCreators({ clearValueOs }, dispatch)

const mapStateToProps = ({ osUpdateValue }) => ({ osUpdateValue })

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(UpdateOS)
