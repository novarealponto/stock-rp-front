import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { applySpec, map, pipe, prop } from 'ramda'

import ReportMissoutContainer from '../../../containers/Report/Missout'
import { getRelatorioPerda } from '../../../services/realatorioPerda'
import { getTecnico } from '../../../services/tecnico'

const ReportMissout = () => {
  const [dataSource, setDataSource] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [technicianList, setTechnicianList] = useState([])

  const getAllMissout = useCallback(() => {
    const { date, product, technician } = queryValues

    const query = {
      filters: {
        kitOut: {
          specific: {
            action: 'perda',
            createdAt: date
              ? {
                  end: date[1]._d,
                  start: date[0]._d,
                }
              : undefined,
          },
        },
        osParts: {
          specific: {
            createdAt: date
              ? {
                  end: date[1]._d,
                  start: date[0]._d,
                }
              : undefined,
          },
        },
        product: {
          specific: {
            name: product,
          },
        },
        technician: {
          specific: {
            id: technician,
          },
        },
      },
    }
    const buildDataSource = applySpec({
      date: pipe(prop('date'), (date) => moment(date).format('L')),
      key: prop('os'),
      os: prop('os'),
      product: prop('name'),
      quantity: prop('amount'),
      technician: prop('technician'),
    })
    getRelatorioPerda(query).then(({ data: { rows } }) => {
      setDataSource(map(buildDataSource, rows))
    })
  }, [queryValues])

  useEffect(() => {
    getTecnico().then(({ data }) => setTechnicianList(data))
  }, [])

  useEffect(() => {
    getAllMissout()
  }, [getAllMissout])

  return (
    <ReportMissoutContainer
      dataSource={dataSource}
      handleSubmitSearch={setQueryValues}
      pagination={{ showSizeChanger: false }}
      technicianList={technicianList}
    />
  )
}

export default ReportMissout
