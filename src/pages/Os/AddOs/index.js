import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import {
  applySpec,
  equals,
  filter,
  has,
  ifElse,
  map,
  pathOr,
  pipe,
  split,
} from 'ramda'
import { Form, message } from 'antd'

import AddOsContainer from '../../../containers/OS/AddOS'
import { getAllStatusExpedition } from '../../../services/statusExpedition'
import { getProdutoByEstoque } from '../../../services/produto'
import { getTecnico } from '../../../services/tecnico'
import { newReservaOs } from '../../../services/reservaOs'
import { validateSerialNumberForEntry } from '../../../utils/validators'

const buildOs = applySpec({
  cnpj: pathOr('', ['cnpj']),
  date: pathOr(moment(), ['date']),
  osParts: pipe(
    pathOr([], ['products']),
    map(
      applySpec({
        amount: pathOr(0, ['quantity']),
        productBaseId: pathOr('', ['productBaseId']),
        serialNumberArray: pipe(
          pathOr('', ['serialNumbers']),
          split('\n'),
          filter((item) => item)
        ),
        serialNumbers: pipe(
          pathOr('', ['serialNumbers']),
          split('\n'),
          filter((item) => item)
        ),
        status: pathOr('', ['status']),
        stockBase: ifElse(
          pipe(pathOr('', ['status']), equals('CONSERTO')),
          () => undefined,
          () => 'ESTOQUE'
        ),
      })
    )
  ),
  razaoSocial: pathOr('', ['razaoSocial']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  technicianId: pathOr('', ['technician']),
})

const buildStatus = applySpec({
  key: pathOr('', ['id']),
  status: pathOr('', ['status']),
})

const buildTechnician = applySpec({
  key: pathOr('', ['id']),
  name: pathOr('', ['name']),
})

const AddOs = () => {
  const [form] = Form.useForm()
  const [productList, setProductList] = useState([])
  const [status, setStatus] = useState('')
  const [statusList, setStatusList] = useState([])
  const [technicianList, setTechnicianList] = useState([])

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
        stockBase: {
          specific: {
            stockBase: status === 'CONSERTO' ? null : 'ESTOQUE',
          },
        },
        productBase: {
          specific: {
            stockBaseId: status === 'CONSERTO' ? null : undefined,
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
      const { status } = await newReservaOs(buildOs(formData))
      getAllProdutoByEstoque()

      if (status === 422 || status === 401 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      form.resetFields()
      message.success('Reserva efetuada com sucesso')
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
    getTecnico({ total: 100 }).then(({ data }) =>
      setTechnicianList(map(buildTechnician, data))
    )
    getAllStatusExpedition().then(({ data }) =>
      setStatusList(map(buildStatus, data))
    )

    getAllProdutoByEstoque()
  }, [getAllProdutoByEstoque])

  return (
    <AddOsContainer
      form={form}
      handleSubmit={handleSubmit}
      onChangeStatus={onChangeStatus}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      productList={productList}
      statusList={statusList}
      status={status}
      technicianList={technicianList}
    />
  )
}

export default AddOs
