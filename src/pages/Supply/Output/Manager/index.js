import React, { useCallback, useEffect, useState } from 'react'
import { compose, map, merge } from 'ramda'
import { message, Form } from 'antd'
import { connect } from 'react-redux'

import ManagerSupplyOutputContainer from '../../../../containers/Supply/Output/Manager'
import { buildDataSouce, buildSupplyOutput } from './spec'
import { GetOut, NovaSaida } from '../../../../services/Suprimentos/saida'
import { GetSupProduct } from '../../../../services/Suprimentos/product'

const ManagerSupplyOutput = ({ auth }) => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [formRegister] = Form.useForm()
  const [productList, setProductList] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)

  const getAllSupplyOutput = useCallback(() => {
    const { createdAt, product, username } = queryValues

    const query = {
      filters: {
        supOut: {
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

    GetOut(query).then(({ data: { rows, count } }) => {
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
      const { status } = await NovaSaida(buildSupplyOutput(merge(formData, auth)))
      if (status !== 200 && status !== 201) {
        throw new Error('422 Unprocessable Entity!')
      }
      getAllSupplyOutput()
      handleClickOnCancel()
      message.success('Cadastro efetuado')
    } catch (err) {
      message.error('Erro ao efetuar cadastro')
      console.log(err)
    }
  }

  useEffect(() => {
    getAllSupplyOutput()
  }, [getAllSupplyOutput])

  useEffect(() => {
    GetSupProduct({
      total: null,
    }).then(({ data: { rows } }) => setProductList(rows))
  }, [])

  return (
    <ManagerSupplyOutputContainer
      dataSource={dataSource}
      formRegister={formRegister}
      handleClickNewSupplyOutput={() => setVisibleModalRegister(true)}
      handleClickOnCancel={handleClickOnCancel}
      handleOnChangeTable={({ current }) => setCurrent(current)}
      handleOnSearch={handleOnSearch}
      handleSubmitRegister={handleSubmitRegister}
      pagination={{ current, showSizeChanger: false, total }}
      productList={productList}
      visibleModalRegister={visibleModalRegister}
    />
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

const enhanced = compose(connect(mapStateToProps))

export default enhanced(ManagerSupplyOutput)
