import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { applySpec, map, pipe, prop } from 'ramda'

import ReportOSContainer from '../../../containers/Report/Os'
import { getAllStatusExpedition } from '../../../services/statusExpedition'
import { getTecnico } from '../../../services/tecnico'
import { getTodasOs } from '../../../services/reservaOs'

const ReportOS = () => {
  const [current, setCurrent] = useState(1)
  const [osList, setOsList] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [statusList, setStatusList] = useState([])
  const [technicianList, setTechnicianList] = useState([])
  const [total, setTotal] = useState(10)

  const getAllOs = useCallback(() => {
    const { date, os, product, razaoSocial, status, technician } = queryValues

    const query = {
      filters: {
        os: {
          specific: {
            date: date
              ? {
                  start: date[0]._d,
                  end: date[1]._d,
                }
              : undefined,
            deletedAt: { start: '2019/01/01' },
            os,
            razaoSocial,
          },
        },
        osParts: {
          specific: {
            statusExpeditionId: status,
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
      order: {
        field: 'deletedAt',
        acendent: true,
      },
      page: current,
      paranoid: false,
      required: false,
      total: 10,
    }

    const buildOsList = applySpec({
      date: pipe(prop('date'), (date) => moment(date).format('L')),
      key: prop('id'),
      os: prop('os'),
      products: pipe(
        prop('products'),
        map(
          applySpec({
            key: prop('id'),
            missout: prop('missOut'),
            output: prop('output'),
            product: prop('name'),
            reserve: prop('amount'),
            return: prop('return'),
            status: prop('status'),
          })
        )
      ),
      razaoSocial: prop('razaoSocial'),
      technician: prop('technician'),
    })

    getTodasOs(query).then(({ data: { rows, count } }) => {
      setOsList(map(buildOsList, rows))
      setTotal(count)
    })
  }, [current, queryValues])

  useEffect(() => {
    getAllStatusExpedition().then(({ data }) => setStatusList(data))
    getTecnico().then(({ data }) => setTechnicianList(data))
  }, [])

  useEffect(() => {
    getAllOs()
  }, [getAllOs])

  return (
    <ReportOSContainer
      handleSubmitSearch={setQueryValues}
      onChangeTable={({ current }) => setCurrent(current)}
      osList={osList}
      pagination={{ current, showSizeChanger: false, total }}
      statusList={statusList}
      technicianList={technicianList}
    />
  )
}

export default ReportOS
