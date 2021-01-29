import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { applySpec, map, path, pipe, prop } from 'ramda'

import ReportSupplyContainer from '../../../containers/Report/Supply'
import { CreatePDFSuprimento } from '../../../services/Suprimentos/pdf'
import { GetSupProduct } from '../../../services/Suprimentos/product'

const ReportSupply = () => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [select, setSelect] = useState('ESTOQUE')
  const [total, setTotal] = useState(10)

  const getAllSupProduct = useCallback(() => {
    const { code, date, manufacturer, product, quantity } = queryValues

    const dateFormated = date
      ? {
          end: date[1]._d,
          start: date[0]._d,
        }
      : { start: '2019/01/01' }

    const query = {
      compra: select === 'COMPRAS',
      filters: {
        manufacturer: {
          specific: {
            name: manufacturer,
          },
        },
        supProduct: {
          specific: {
            amount:
              quantity && quantity[0] !== quantity[1]
                ? {
                    start: quantity[0],
                    end: quantity[1],
                  }
                : undefined,
            code,
            name: product,
            updatedAt: dateFormated,
          },
        },
      },
      page: current,
      total: 10,
    }

    const buildDataSource = applySpec({
      code: prop('code'),
      date: pipe(prop('updatedAt'), (date) =>
        date ? moment(date).format('L') : '-'
      ),
      key: prop('id'),
      manufacturer: path(['manufacturer', 'name']),
      product: prop('name'),
      quantity: prop('amount'),
      quantityMin: prop('minimumQuantity'),
    })

    GetSupProduct(query).then(({ data: { rows, count } }) => {
      setTotal(count)
      setDataSource(map(buildDataSource, rows))
    })
  }, [current, queryValues, select])

  const handleChangeSelect = (select) => {
    setCurrent(1)
    setSelect(select)
  }

  const handleClickPrinterIcon = async () => {
    const query = {
      compra: select === 'COMPRAS',
      filters: {},
      page: 1,
      total: null,
    }
    const {
      status,
      data: { rows },
    } = await GetSupProduct(query)
    if (status === 200) await CreatePDFSuprimento(select, rows)
  }

  const handleOnChangeTable = ({ current }) => {
    setCurrent(current)
  }

  const handleSubmitSearch = (formData) => {
    setCurrent(1)
    setQueryValues(formData)
  }

  useEffect(() => {
    getAllSupProduct()
  }, [getAllSupProduct])

  return (
    <ReportSupplyContainer
      dataSource={dataSource}
      handleChangeSelect={handleChangeSelect}
      handleClickPrinterIcon={handleClickPrinterIcon}
      handleOnChangeTable={handleOnChangeTable}
      handleSubmitSearch={handleSubmitSearch}
      pagination={{ current, showSizeChanger: false, total }}
      select={select}
    />
  )
}
export default ReportSupply
