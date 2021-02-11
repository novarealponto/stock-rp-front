import React, { useCallback, useEffect, useState } from 'react'
import { map } from 'ramda'
import { message, Form } from 'antd'

import ManagerSupplyProductContainer from '../../../../containers/Supply/Product/Manager'
import { buildDataSouce, buildSupplyProduct } from './spec'
import {
  GetManufacturer,
  GetSupProduct,
  NewSupProduct,
  UpdateSupProduct,
} from '../../../../services/Suprimentos/product'

const ManagerSupplyProduct = () => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [formRegister] = Form.useForm()
  const [formUpdate] = Form.useForm()
  const [manufacturerList, setManufacturerList] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)

  const getAllManufaturer = useCallback(() => {
    GetManufacturer({ total: null }).then(({ data: { rows } }) =>
      setManufacturerList(rows)
    )
  }, [])

  const getAllSupplyProduct = useCallback(() => {
    const { code, createdAt, manufacturer, product } = queryValues

    const query = {
      filters: {
        manufacturer: {
          specific: {
            name: manufacturer,
          },
        },
        supProduct: {
          specific: {
            code,
            createdAt: createdAt
              ? {
                  end: createdAt[1]._d,
                  start: createdAt[0]._d,
                }
              : undefined,
            name: product,
          },
        },
      },
      page: current,
      total: 10,
    }

    GetSupProduct(query).then(({ data: { rows, count } }) => {
      setDataSource(map(buildDataSouce, rows))
      setTotal(count)
    })
  }, [current, queryValues])

  const handleClickEditSupplyProduct = (row) => {
    formUpdate.setFieldsValue(row)
    setVisibleModalUpdate(true)
  }

  const handleClickOnCancel = (usage) => {
    return {
      register: () => {
        formRegister.resetFields()
        setVisibleModalRegister(false)
      },
      update: () => {
        formUpdate.resetFields()
        setVisibleModalUpdate(false)
      },
    }[usage]()
  }

  const handleOnSearch = (searchValue) => {
    setQueryValues(searchValue)
    setCurrent(1)
  }

  const handleSubmitRegister = async (formData) => {
    try {
      const { status } = await NewSupProduct(buildSupplyProduct(formData))

      if (status !== 200 && status !== 201) {
        throw new Error('422 Unprocessable Entity!')
      }

      getAllSupplyProduct()
      handleClickOnCancel('register')
      message.success('Cadastro efetuado')
    } catch (err) {
      message.error('Erro ao efetuar cadastro')
      console.log(err)
    }
  }

  const handleSubmitUpdate = async (formData) => {
    try {
      const { status } = await UpdateSupProduct(buildSupplyProduct(formData))

      if (status !== 200 && status !== 201) {
        throw new Error('422 Unprocessable Entity!')
      }

      getAllSupplyProduct()
      handleClickOnCancel('update')
      message.success('Produto atualizado')
    } catch (err) {
      message.error('Erro ao efetuar atualização')
      console.log(err)
    }
  }

  useEffect(() => {
    getAllManufaturer()
  }, [getAllManufaturer])

  useEffect(() => {
    getAllSupplyProduct()
  }, [getAllSupplyProduct, getAllManufaturer])

  return (
    <ManagerSupplyProductContainer
      dataSource={dataSource}
      formRegister={formRegister}
      formUpdate={formUpdate}
      handleClickEditSupplyProduct={handleClickEditSupplyProduct}
      handleClickNewSupplyProduct={() => setVisibleModalRegister(true)}
      handleClickOnCancel={handleClickOnCancel}
      handleOnChangeTable={({ current }) => setCurrent(current)}
      handleOnSearch={handleOnSearch}
      handleSubmitRegister={handleSubmitRegister}
      handleSubmitUpdate={handleSubmitUpdate}
      manufacturerList={manufacturerList}
      pagination={{ current, showSizeChanger: false, total }}
      visibleModalRegister={visibleModalRegister}
      visibleModalUpdate={visibleModalUpdate}
    />
  )
}

export default ManagerSupplyProduct
