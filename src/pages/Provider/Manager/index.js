import React, { useEffect, useState } from 'react'
import { compose, map } from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import ManagerContainer from '../../../containers/Provider/Manager'
import { getAllFornecedor } from '../../../services/fornecedores'
import { setValueFornecedor } from '../../../store/Actions/fornecedor'

const insertKey = (array, key) => {
  return map((item) => {
    return { ...item, key: item[key] }
  }, array)
}

const Manager = ({ history, setValueFornecedor }) => {
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

  const goToUpdateProvider = (provider) => {
    setValueFornecedor(provider)
    history.push('update')
  }

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
      goToUpdateProvider={goToUpdateProvider}
      handleSearch={handleSearch}
      onChangeTable={onChangeTable}
      pagination={pagination}
      searching={searching}
    />
  )
}

const mapStateToProps = () => ({})

const mapDispacthToProps = (dispatch) =>
  bindActionCreators({ setValueFornecedor }, dispatch)

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(Manager)
