import React, { useState, useEffect } from 'react'
import { map } from 'ramda'
import { Form, message } from 'antd'

import buildProductType from '../../../utils/productTypeSpec'
import filterData from '../../../utils/filterData'
import ManagerContainer from '../../../containers/ProductType/Manager'
import { getAllProductType } from '../../../services/produto'
import { newProductType } from '../../../services/produto'

const Manager = () => {
  const [dataSource, setDataSource] = useState([])
  const [formAddProductType] = Form.useForm()
  const [initialDataSource, setInitialDataSource] = useState([])
  const [searching, setSearching] = useState(false)
  const [visibleModalAddProductType, setVisibleModalAddProductType] = useState(
    false
  )

  useEffect(() => {
    getAllProductType().then(({ data: dataSource }) => {
      setInitialDataSource(addKey(dataSource, 'type'))
      setSearching(false)
    })
  }, [searching])

  useEffect(() => {
    getAllProductType().then(({ data: dataSource }) => {
      setDataSource(addKey(dataSource, 'type'))
    })
  }, [visibleModalAddProductType])

  const addKey = (array, key) => {
    return map((data) => {
      return { ...data, key: data[key] }
    }, array)
  }

  const closeModalAddProductType = () => {
    setVisibleModalAddProductType(false)
    formAddProductType.resetFields()
  }

  const handleAddProductType = async (addProductTypeFormData) => {
    setSearching(true)
    try {
      const { status } = await newProductType(
        buildProductType(addProductTypeFormData)
      )

      if (status !== 200 && status !== 201) {
        throw new Error()
      }

      setVisibleModalAddProductType(false)
      formAddProductType.resetFields()
      message.success('Tipo de produto cadastro com sucesso')
    } catch (err) {
      message.error('Erro ao casdastrar tipo de produto')
      console.log(err)
    }
  }

  const handleSearch = (searchValue) => {
    setDataSource(filterData({ type: searchValue }, initialDataSource))
    setSearching(true)
  }

  const openModalAddProductType = () => setVisibleModalAddProductType(true)

  return (
    <ManagerContainer
      closeModalAddProductType={closeModalAddProductType}
      dataSource={dataSource}
      formAddProductType={formAddProductType}
      handleAddProductType={handleAddProductType}
      handleSearch={handleSearch}
      openModalAddProductType={openModalAddProductType}
      searching={searching}
      visibleModalAddProductType={visibleModalAddProductType}
    />
  )
}

export default Manager
