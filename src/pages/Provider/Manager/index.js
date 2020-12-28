import React, { useEffect, useState } from 'react'
import { compose, map } from 'ramda'
import { withRouter } from 'react-router-dom'

import ManagerContainer from '../../../containers/Provider/Manager'
import { getAllFornecedor } from '../../../services/fornecedores'

const insertKey = (array, key) => {
  return map((item) => {
    return { ...item, key: item[key] }
  }, array)
}

const Manager = ({ history }) => {
  const [allProviders, setAllProviders] = useState([])
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searching, setSearching] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
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

    getAllProviders()
  }, [page, pageSize, searchValue])

  const goToAddProvider = () => history.push('add')

  const handleSearch = (searchValue) => {
    setPage(1)
    setSearchValue(searchValue)
  }

  const onChangeTable = ({ current, pageSize }) => {
    setPage(current)
    setPageSize(pageSize)
  }

  return (
    <ManagerContainer
      dataSource={allProviders}
      goToAddProvider={goToAddProvider}
      handleSearch={handleSearch}
      onChangeTable={onChangeTable}
      pagination={pagination}
      searching={searching}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Manager)
