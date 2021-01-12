import React, { useCallback, useEffect, useState } from 'react'
import { has, map } from 'ramda'
import { Form, message } from 'antd'

import AddReceptionContainer from '../../../containers/Reception/AddReception'
import { getProdutoByEstoque } from '../../../services/produto'
import { getTecnico } from '../../../services/tecnico'
import { newReservaInterno } from '../../../services/reservaOs'
import { validateSerialNumberForEntry } from '../../../utils/validators'
import { buildProduct, buildReception, buildTechnician } from './specs'

const AddReception = () => {
  const [form] = Form.useForm()
  const [productList, setProductList] = useState([])
  const [technicianList, setTechnicianList] = useState([])


  const getAllProdutoByEstoque = useCallback(() => {

    const query = {
      filters: {
        stockBase: {
          specific: {
            stockBase: 'ESTOQUE',
          },
        },
      },
      stockBaseId: 'ESTOQUE',
    }
    getProdutoByEstoque(query).then(({ data }) =>
      setProductList(map(buildProduct, data))
    )
  }, [])

  const handleSubmit = async (formData) => {
    try {
      const { status } = await newReservaInterno(buildReception(formData))
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

  const onPressEnterTextAreaSerialNumber = async ({ target, max }) => {
    const currentTargetValue = target.value

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue, {
        limit: max,
        reserve: true,
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

    getAllProdutoByEstoque()
  }, [getAllProdutoByEstoque])

  return (
    <AddReceptionContainer
      form={form}
      handleSubmit={handleSubmit}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      productList={productList}
      technicianList={technicianList}
    />
  )
}

export default AddReception
