import React, { useCallback, useEffect, useState } from 'react'
import { compose, map, merge } from 'ramda'
import { message, Form } from 'antd'
import { connect } from 'react-redux'

import ManagerSupplyEntryContainer from '../../../../containers/Supply/Entry/Manager'
import { buildDataSouce, buildSupplyEntry } from './spec'
import {
  GetEntrance,
  NovaEntrada,
} from '../../../../services/Suprimentos/entrada'
import { GetProvider } from '../../../../services/Suprimentos/fornecedor'
import { GetSupProduct } from '../../../../services/Suprimentos/product'

const ManagerSupplyEntry = ({ auth }) => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [formRegister] = Form.useForm()
  const [productList, setProductList] = useState([])
  const [providerList, setProviderList] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)

  const getAllSupplyEntry = useCallback(() => {
    const { createdAt, product, username } = queryValues

    const query = {
      filters: {
        supEntrance: {
          specific: {
            createdAt: createdAt
            ? {
              end: createdAt[1]._d,
              start: createdAt[0]._d,
            }
            : undefined,
            responsibleUser: username,
          },
        },
        supProduct: {
          specific: {
            name: product,
          },
        },
      },
      page: current,
      total: 10,
    }

    GetEntrance(query).then(({ data: { rows, count } }) => {
      setDataSource(map(buildDataSouce, rows))
      setTotal(count)
    })
  }, [current, queryValues])


  const handleClickOnCancel = () => {
    formRegister.resetFields()
    setVisibleModalRegister(false)
  }

  const handleOnSearch = (searchValue) => {
    setQueryValues(searchValue)
    setCurrent(1)
  }

  const handleSubmitRegister = async (formData) => {
    try {
      const { status } = await NovaEntrada(
        buildSupplyEntry(merge(formData, auth))
      )
      if (status !== 200 && status !== 201) {
        throw new Error('422 Unprocessable Entity!')
      }
      getAllSupplyEntry()
      handleClickOnCancel()
      message.success('Cadastro efetuado')
    } catch (err) {
      message.error('Erro ao efetuar cadastro')
      console.log(err)
    }
  }

  useEffect(() => {
    getAllSupplyEntry()
  }, [getAllSupplyEntry])

  useEffect(() => {
    GetSupProduct({
      total: null,
    }).then(({ data: { rows } }) => setProductList(rows))
    GetProvider({
      total: null,
    }).then(({ data: { rows } }) => setProviderList(rows))
  }, [])

  return (
    <ManagerSupplyEntryContainer
      dataSource={dataSource}
      formRegister={formRegister}
      handleClickNewSupplyEntry={() => setVisibleModalRegister(true)}
      handleClickOnCancel={handleClickOnCancel}
      handleOnChangeTable={({ current }) => setCurrent(current)}
      handleOnSearch={handleOnSearch}
      handleSubmitRegister={handleSubmitRegister}
      pagination={{ current, showSizeChanger: false, total }}
      productList={productList}
      providerList={providerList}
      visibleModalRegister={visibleModalRegister}
    />
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

const enhanced = compose(connect(mapStateToProps))

export default enhanced(ManagerSupplyEntry)
