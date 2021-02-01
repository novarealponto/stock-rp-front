import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { applySpec, map, pipe, prop } from 'ramda'

import ReportLoanContainer from '../../../containers/Report/Loan'
import { getEprestimoService } from '../../../services/emprestimo'

const ReportLoan = () => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [total, setTotal] = useState(10)

  const getAllMissout = useCallback(() => {
    const { date, razaoSocial, serialNumber } = queryValues

    const query = {
      filters: {
        emprestimo: {
          specific: {
            createdAt: date
              ? {
                  end: date[1]._d,
                  start: date[0]._d,
                }
              : undefined,
            razaoSocial,
          },
        },
        equip: {
          specific: {
            serialNumber,
          },
        },
      },
      page: current,
      paranoid: false,
      total: 10,
    }

    const buildDataSource = applySpec({
      date: pipe(prop('dateExpeditionNotFormatted'), (date) =>
        moment(date).format('L')
      ),
      key: prop('id'),
      razaoSocial: prop('razaoSocial'),
      return: pipe(prop('deletedAt'), (date) =>
        date ? moment(date).format('L') : '-'
      ),
      serialNumber: prop('serialNumber'),
      solicitation: pipe(prop('createdAtNotFormatted'), (date) =>
        moment(date).format('L')
      ),
    })
    getEprestimoService(query).then(({ data: { rows, count } }) => {
      setDataSource(map(buildDataSource, rows))
      setTotal(count)
    })
  }, [current, queryValues])

  useEffect(() => {
    getAllMissout()
  }, [getAllMissout])

  return (
    <ReportLoanContainer
      dataSource={dataSource}
      handleSubmitSearch={(formData) => {
        setCurrent(1)
        setQueryValues(formData)
      }}
      onChangeTable={({ current }) => setCurrent(current)}
      pagination={{ current, showSizeChanger: false, total }}
    />
  )
}

export default ReportLoan
