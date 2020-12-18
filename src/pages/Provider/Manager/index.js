import React, { useEffect, useState } from 'react'
import { map } from 'ramda'

import ManagerContainer from '../../../containers/Provider/Manager'
import { getAllFornecedor } from '../../../services/fornecedores'

const insertKey = (array, key) => {
  return map((item) => {
    return { ...item, key: item[key] }
  }, array)
}

const Manager = () => {
  const [allProviders, setAllProviders] = useState([])
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searching, setSearching] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    getAllProviders()
  }, [page, pageSize, searchValue])

  const handleSearch = (searchValue) => {
    setPage(1)
    setSearchValue(searchValue)
  }

  const getAllProviders = () => {
    setSearching(true)
    const query = {
      filters: {
        company: {
          global: {
            fields: ['razaoSocial', 'nameContact', 'cnpj', 'state', 'telphone'],
            value: searchValue,
          },
        },
      },
      page,
      total: pageSize,
    }

    getAllFornecedor(query).then(
      ({ data: { rows: allProvidersResponse, count: total } }) => {
        setPagination({ total })
        setAllProviders(insertKey(allProvidersResponse, 'id'))
        setSearching(false)
      }
    )
  }

  const onChangeTable = ({ current, pageSize }) => {
    setPage(current)
    setPageSize(pageSize)
  }

  return (
    <ManagerContainer
      dataSource={allProviders}
      handleSearch={handleSearch}
      onChangeTable={onChangeTable}
      pagination={pagination}
      searching={searching}
    />
  )
}

export default Manager
