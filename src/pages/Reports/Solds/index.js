import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { applySpec, map, pipe, prop } from 'ramda'

import ReportSoldsContainer from '../../../containers/Report/Solds'
import { GetRelatVendas } from '../../../services/produto'

const ReportSolds = () => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [total, setTotal] = useState(10)

  const getAllSolds = useCallback(() => {
    const { date, product } = queryValues

    const dataFormat = date
      ? {
          end: date[1]._d,
          start: date[0]._d,
        }
      : { start: '2019/01/01' }

    const query = {
      filters: {
        freeMarketParts: {
          specific: {
            createdAt: dataFormat,
          },
        },
        kitOut: {
          specific: {
            updatedAt: dataFormat,
          },
        },
        osParts: {
          specific: {
            deletedAt: dataFormat,
          },
        },
        product: {
          specific: {
            name: product,
          },
        },
        technicianReserveParts: {
          specific: {
            createdAt: dataFormat,
          },
        },
      },
      page: current,
      total: 10,
    }

    const buildDataSource = applySpec({
      date: pipe(prop('updatedAt'), (date) =>
        date ? moment(date).format('L') : '-'
      ),
      key: prop('id'),
      product: prop('name'),
      quantity: prop('quantidadeSaidaTotal'),
      status: (item) => {
        return [
          {
            key: 1,
            lastDate: pipe(prop('createdAtEComerce'), (date) =>
              date ? moment(date).format('LL') : '-'
            )(item),
            status: 'E-Commerce',
            total: prop('saidaEComerce', item),
          },
          {
            key: 2,
            lastDate: pipe(prop('createdAtOs'), (date) =>
              date ? moment(date).format('LL') : '-'
            )(item),
            status: 'OS',
            total: prop('saidaOs', item),
          },
          {
            key: 3,
            lastDate: '-',
            status: 'Interno',
            total: prop('saidaInterno', item),
          },
          {
            key: 4,
            lastDate: pipe(prop('createdAtKit'), (date) =>
              date ? moment(date).format('LL') : '-'
            )(item),
            status: 'Kit',
            total: prop('saidaKit', item),
          },
        ]
      },
    })

    GetRelatVendas(query).then(({ data: { rows, count } }) => {
      setDataSource(map(buildDataSource, rows))
      setTotal(count)
    })
  }, [current, queryValues])

  useEffect(() => {
    getAllSolds()
  }, [getAllSolds])

  return (
    <ReportSoldsContainer
      dataSource={dataSource}
      handleSubmitSearch={(formData) => {
        setQueryValues(formData)
        setCurrent(1)
      }}
      onChangeTable={({ current }) => setCurrent(current)}
      pagination={{ current, showSizeChanger: false, total }}
    />
  )
}

export default ReportSolds
