import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { compose, length, filter, match } from 'ramda'

import ManagerContainer from '../../../containers/ProductType/Manager'
import { getAllProductType } from '../../../services/produto'
import { message } from 'antd'

const Manager = ({ history }) => {
  const [dataSource, setDataSource] = useState([])
  const [initialDataSource, setInitialDataSource] = useState([])

  useEffect(() => {
    getAllProductType().then(({ data: dataSource }) => {
      setDataSource(dataSource)
      setInitialDataSource(dataSource)
    })
  }, [])

  const applyMatch = (key, object, value) =>
    match(createRegex(value), object[key])

  const createRegex = (pattern) => new RegExp(`${pattern}`, 'gi')

  const filterData = (searchValue) => {
    const callback = (item) => {
      return length(applyMatch('type', item, searchValue)) > 0
    }
    return filter(callback, initialDataSource)
  }

  const goToAddProductType = () => history.push('add')

  const goToUpdateProductType = () =>
    message.warning('Editar tipo de produto ainda não foi implementado')

  const handleSearch = (searchValue) => setDataSource(filterData(searchValue))

  return (
    <ManagerContainer
      dataSource={dataSource}
      goToAddProductType={goToAddProductType}
      goToUpdateProductType={goToUpdateProductType}
      handleSearch={handleSearch}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Manager)
