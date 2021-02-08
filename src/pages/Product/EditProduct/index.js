import React, { useEffect, useState, useCallback } from 'react'
import { Form, message } from 'antd'
import { length, pathOr, pipe } from 'ramda'

import { buildProduct, buildProductUpdate } from '../../../utils/productSpec'
import EditProductContainer from '../../../containers/Product/Edit'
import {
  getAllProductType,
  getMarca,
  updateProduto,
  getProductById,
} from '../../../services/produto'

const success = () => message.success('Produto foi atualizado')
const errorMessage = () => message.error('Houve um erro ao atualizar produto')

const EditProduct = ({ history }) => {
  const [form] = Form.useForm()
  const [marksList, setMarkList] = useState([])
  const [typesList, setTypesList] = useState([])

  const getAllMarca = useCallback(async () => {
    try {
      const { data, status } = await getMarca({})
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setMarkList(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getAllTipo = useCallback(async () => {
    try {
      const { data, status } = await getAllProductType()
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setTypesList(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const pathname = pipe(pathOr('', ['location', 'pathname']), (item) =>
      item.split('/')
    )(window)

    const id = pathname[length(pathname) - 1]

    getProductById(id).then(({ data }) => {
      form.setFieldsValue(buildProductUpdate(data))
    })

    getAllMarca()
    getAllTipo()
  }, [form, getAllMarca, getAllTipo])

  const handleSubmit = async (formData) => {
    const pathname = pipe(pathOr('', ['location', 'pathname']), (item) =>
      item.split('/')
    )(window)

    const id = pathname[length(pathname) - 1]

    try {
      await updateProduto(buildProduct({ ...formData, id }))
      history.push('/logged/product/manager')
      success()
    } catch (error) {
      errorMessage()
    }
  }

  return (
    <EditProductContainer
      form={form}
      handleSubmit={handleSubmit}
      marksList={marksList}
      typesList={typesList}
    />
  )
}

export default EditProduct
