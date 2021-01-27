import React, { useEffect, useState } from 'react'
import { applySpec, map, pathOr } from 'ramda'

import ManagerContainer from '../../../containers/Entry/Manager'
import { getEntrada } from '../../../services/entrada'

const buildEntries = applySpec({
  date: pathOr('', ['createdAt']),
  key: pathOr('', ['id']),
  product: pathOr('', ['name']),
  quant: pathOr('', ['amountAdded']),
  username: pathOr('', ['responsibleUser']),
})

const buildQuery = ({ current, date, product, username }) => {
  return {
    filters: {
      entrance: {
        specific: {
          createdAt: date
            ? { start: date[0]._d, end: date[1]._d }
            : { start: '2019/01/01' },
          responsibleUser: username,
        },
      },
      product: {
        specific: {
          name: product,
        },
      },
    },
    page: current,
    total: 10,
  }
}

const Manager = () => {
  const [current, setCurrent] = useState(1)
  const [entries, setEntries] = useState([])
  const [queryState, setQueryState] = useState({})
  const [total, setTotal] = useState(0)

  const onChangeTable = ({ current }) => setCurrent(current)

  useEffect(() => {
    const getAllEntries = () => {
      const query = buildQuery({ ...queryState, current })

      getEntrada(query).then(({ data: { rows, count } }) => {
        setEntries(map(buildEntries, rows))
        setTotal(count)
      })
    }

    getAllEntries()
  }, [current, queryState])

  return (
    <ManagerContainer
      dataSource={entries}
      handleOnSearch={setQueryState}
      onChangeTable={onChangeTable}
      pagination={{ total }}
    />
  )
}

export default Manager
