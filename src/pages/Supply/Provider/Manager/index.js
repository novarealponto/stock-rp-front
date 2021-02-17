import React, { useCallback, useEffect, useState } from 'react'
import { map } from 'ramda'

import { buildDataSource } from './specs'
import {
    GetProvider,
} from '../../../../services/Suprimentos/fornecedor'
import ManagerProviderContainer from '../../../../containers/Supply/Provider/Manager'

const ManagerProviderSupply = ({ history }) => {
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [queryProvider, setQueryProvider] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleSearch, setVisibleSearch] = useState()

  const getAllProvider = useCallback(() => {
    const { razaoSocial, cnpj, createdAt } = queryProvider
    const query = {
      filters: {
        supProvider: {
            specific: {
              razaoSocial,
              cnpj,
              createdAt: createdAt
              ? {
                  end: createdAt[1]._d,
                  start: createdAt[0]._d,
                }
              : undefined,
            }
          },
        },
      page,
      paranoid: true,
      required: true,
      total: 10,
    }
  

    GetProvider(query).then(({ data: { rows, count: total } }) => {
      setDataSource(map(buildDataSource, rows))
      setTotal(total)
    })
  }, [page, queryProvider])

  const handleOnChangeTable = ({ current }) => setPage(current)

  const handleOnClickEdit = (row) => {
    history.push(`edit/${row.id}`)
  }

  const handleOnClickNewProvider = () => {
    history.push('/logged/supply/provider/add')
  }

  const handleProviderSearch = (providerSearchFormData) => {
    setQueryProvider(providerSearchFormData)
  }

  useEffect(() => {
    getAllProvider()
  }, [getAllProvider])

  return (
    <ManagerProviderContainer
      dataSource={dataSource}
      handleOnChangeTable={handleOnChangeTable}
      handleOnClickCloseSearchForm={() => setVisibleSearch(false)}
      handleOnClickEdit={handleOnClickEdit}
      handleOnClickNewProvider={handleOnClickNewProvider}
      handleOnClickOpenSearchForm={() => setVisibleSearch(true)}
      handleOnSearch={handleProviderSearch}
      pagination={{ total }}
      visibleSearch={visibleSearch}
    />
  )
}

export default ManagerProviderSupply
