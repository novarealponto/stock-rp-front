import React, { useCallback, useEffect, useState } from 'react'
import { Form, message } from 'antd'
import { applySpec, has, map, pathOr } from 'ramda'

import buildECommerce from './EComerceSpec'
import AddECommerceContainer from '../../../containers/E-Commerce/Add'
import { getProdutoByEstoque } from '../../../services/produto'
import { validateSerialNumberForEntry } from '../../../utils/validators'
import { NewReservaML } from '../../../services/mercadoLivre'

const AddECommerce = () => {
  const [form] = Form.useForm()
  const [max, setMax] = useState(1)
  const [productBaseId, setProductBaseId] = useState('')
  const [productList, setProductList] = useState([])
  const [visibleTextArea, setVisibleTextArea] = useState(false)

  const getAllProdutoByEstoque = useCallback(() => {
    const buildProduct = applySpec({
      key: pathOr('', ['id']),
      max: pathOr(1, ['available']),
      name: pathOr('', ['name']),
      serial: pathOr(false, ['serial']),
    })

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

  const handleChangeProduct = (_, { key, max, serial }) => {
    setMax(max)
    setProductBaseId(key)
    setVisibleTextArea(!!serial)
  }

  const handleOnSubmit = async (formData) => {
    try {
      const { status } = await NewReservaML(buildECommerce(formData))

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
    getAllProdutoByEstoque()
  }, [getAllProdutoByEstoque])

  return (
    <AddECommerceContainer
    form={form}
    handleChangeProduct={handleChangeProduct}
    handleOnSubmit={handleOnSubmit}
    max={max}
    onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
    productBaseId={productBaseId}
    productList={productList}
    visibleTextArea={visibleTextArea}
    />
  )
}

export default AddECommerce
