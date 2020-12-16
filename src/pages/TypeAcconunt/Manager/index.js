import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { map, compose } from 'ramda'

import filterData from '../../../utils/filterData'
import ManagerContainer from '../../../containers/TypeAccount/Manager'
import { getTypeAccount } from '../../../services/typeAccount'

const Manager = ({ history }) => {
  const [data, setData] = useState([])
  const [allTypeAccount, setAllTypeAccount] = useState([])

  useEffect(() => {
    getTypeAccount().then(({ data: { rows: data } }) => {
      setData(addKey(data, 'typeName'))
      setAllTypeAccount(addKey(data, 'typeName'))
    })
  }, [])

  const addKey = (array, key) => {
    return map((data) => {
      return { ...data, key: data[key] }
    }, array)
  }

  const goToAddTypeAccount = () => history.push('add')

  const handleSearch = (searchValue) =>
    setData(filterData({ typeName: searchValue }, allTypeAccount))

  return (
    <ManagerContainer
      data={data}
      goToAddTypeAccount={goToAddTypeAccount}
      handleSearch={handleSearch}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Manager)
