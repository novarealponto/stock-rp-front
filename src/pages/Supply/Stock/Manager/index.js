import React, { useCallback, useEffect, useState } from 'react'
import { map } from 'ramda'
import { Form } from 'antd'

import ManagerSupplyEntryContainer from '../../../../containers/Supply/Stock/Manager'
import { buildDataSouce } from './spec'
import { GetSupProduct } from '../../../../services/Suprimentos/product'

const ManagerSupplyEntry = () => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [formRegister] = Form.useForm()
  const [queryValues, setQueryValues] = useState({})
  const [total, setTotal] = useState(10)

  const getAllSupplyEntry = useCallback(() => {
    const { product, updatedAt } = queryValues

    const query = {
      filters: {
        supProduct: {
          specific: {
            name: product,
            updatedAt: updatedAt
              ? {
                  end: updatedAt[1]._d,
                  start: updatedAt[0]._d,
                }
              : undefined,
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

  const handleOnSearch = (searchValue) => {
    setQueryValues(searchValue)
    setCurrent(1)
  }

  useEffect(() => {
    getAllSupplyEntry()
  }, [getAllSupplyEntry])

  return (
    <ManagerSupplyEntryContainer
      dataSource={dataSource}
      formRegister={formRegister}
      handleOnChangeTable={({ current }) => setCurrent(current)}
      handleOnSearch={handleOnSearch}
      pagination={{ current, showSizeChanger: false, total }}
    />
  )
}

export default ManagerSupplyEntry
