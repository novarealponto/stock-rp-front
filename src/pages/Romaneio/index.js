import React, { useCallback, useEffect, useState } from 'react'
import {
  addIndex,
  and,
  applySpec,
  equals,
  filter,
  find,
  findIndex,
  forEach,
  map,
  not,
  path,
  pathOr,
  propEq,
} from 'ramda'
import { message } from 'antd'

import RomaneioContainer from '../../containers/Romaneio'
import {
  associarEquipParaOsPart,
  baixaReservaOs,
  checkout,
  getAllOsParts,
  getAllOsPartsByParams,
  getAllOsPartsByParamsForReturn,
  retornarBaixaReservaOs,
} from '../../services/reservaOs'
import { getAllEquipBySerialNumber } from '../../services/equip'
import {
  getAllReservaTecnico,
  getAllReservaTecnicoReturn,
  newReservaTecnico,
} from '../../services/reservaTecnico'
import { getTecnico } from '../../services/tecnico'

const buildTechnicianList = (technicianList) => {
  return map(
    applySpec({
      key: pathOr('', ['id']),
      id: pathOr('', ['id']),
      name: pathOr('', ['name']),
    }),
    technicianList
  )
}

const Romaneio = () => {
  const [osList, setOsList] = useState([])
  const [osPartsArrayReturn, setOsPartsArrayReturn] = useState([])
  const [productsForExpedition, setProductsForExpedition] = useState([])
  const [productsWaitingExpedition, setProductsWaitingExpedition] = useState([])
  const [productsWaitingReturn, setProductsWaitingReturn] = useState([])
  const [productSearch, setProductSearch] = useState('')
  const [rowSelected, setRowSelected] = useState({})
  const [search, setSearch] = useState({})
  const [serialNumberSearch, setSerialNumberSearch] = useState('')
  const [technicianList, setTechnicianList] = useState([])
  const [
    visibleModalExpeditionProducts,
    setVisibleModalExpeditionProducts,
  ] = useState(false)
  const [
    visibleModalExpeditionSerialNumber,
    setVisibleModalExpeditionSerialNumber,
  ] = useState(false)

  const getOsPartsArrayReturn = useCallback(
    async ({ produto }) => {
      const { technician, date } = search

      if (produto) setProductSearch(produto)

      const query = {
        filters: {
          os: {
            specific: {
              date:
                technician === 'LABORATORIO'
                  ? { start: '01/01/2019' }
                  : {
                      start: date,
                      end: date,
                    },
            },
          },
          product: {
            specific: {
              name: produto || productSearch,
            },
          },
          technician: {
            specific: {
              name: technician,
            },
          },
        },
        paranoid: true,
      }

      const {
        status,
        data: { rows },
      } = await getAllOsParts(query)

      if (status === 200) setOsPartsArrayReturn(rows)
    },
    [productSearch, search]
  )

  const handleCancelModalExpeditionSerialNumber = () =>
    setVisibleModalExpeditionSerialNumber(false)

  const handleCancelProductReturn = () => {
    handleSubmitFormSearch(search)
    setVisibleModalExpeditionProducts(false)
  }

  const handleClickArrow = (row) => {
    const rowAdd = find(propEq('id', row.id))(productsForExpedition)

    setProductsWaitingExpedition(
      filter(({ id }) => id !== row.id, productsWaitingExpedition)
    )
    setProductsForExpedition(
      rowAdd
        ? [
            ...filter(({ id }) => id !== row.id, productsForExpedition),
            {
              ...rowAdd,
              amount: rowAdd.amount + row.amount,
            },
          ]
        : [...productsForExpedition, { ...row, serialNumbers: [] }]
    )
  }

  const handleClickIconExpeditionSerialNumber = async (row) => {
    setRowSelected(row)
    const query = {
      filters: {
        os: {
          specific: {
            date: search.date
              ? {
                  start: search.date,
                  end: search.date,
                }
              : undefined,
          },
        },
        product: {
          specific: {
            name: row.produto,
          },
        },
        technician: {
          specific: {
            name: row.tecnico,
          },
        },
      },
    }

    const {
      status,
      data: { rows },
    } = await getAllOsPartsByParamsForReturn(query)

    if (status === 200) setOsList(rows)

    setVisibleModalExpeditionSerialNumber(true)
  }

  const handleClickPlusIcon = ({ produto }) => {
    getOsPartsArrayReturn({ produto })
    setVisibleModalExpeditionProducts(true)
  }

  const handleOkModalExpeditionSerialNumber = async ({
    oId,
    prevAction,
    serialNumber,
    technicianReserveId,
  }) => {
    const { technician } = search

    if (!oId) return message.error('Selecione uma Os')

    const { status } = await associarEquipParaOsPart({
      oId,
      prevAction,
      serialNumber,
      technicianReserveId,
      tecnico: technician,
    })

    if (status === 200) {
      handleSubmitFormSearch(search)
      message.success('Sucesso')
    } else {
      message.error('Erro')
    }
    setVisibleModalExpeditionSerialNumber(false)
  }

  const handleOnChangeSerialNumberSearch = ({ target }) =>
    setSerialNumberSearch(target.value)

  const handleSearchEquip = async (serialNumber) => {
    const { status, data } = await getAllEquipBySerialNumber({
      serialNumber,
    })

    if (status === 200 && data) {
      let index = -1
      let reserved = and(
        data.reserved || data.deletedAt,
        equals('peca', path(['productBase', 'product', 'category'], data))
      )

      const linhaUnica = and(
        not(equals('peca', path(['productBase', 'product', 'category'], data))),
        pathOr(false, ['productBase', 'product', 'serial', data])
      )

      if (linhaUnica) {
        index = findIndex(propEq('serialNumber', serialNumber))(
          productsWaitingExpedition
        )
      } else {
        index = findIndex(
          propEq('produto', path(['productBase', 'product', 'name'], data))
        )(productsWaitingExpedition)
      }

      forEach(({ serialNumbers }) => {
        if (findIndex(propEq('serialNumber', serialNumber))(serialNumbers) !== -1)
          reserved = true
      }, productsForExpedition)

      if (reserved) {
        setSerialNumberSearch('')
        return message.error('Este equipamento está reservado')
      }

      if (index !== -1) {
        const row = productsWaitingExpedition[index]

        const idx = findIndex(propEq('id', row.id))(productsForExpedition)
        if (idx === -1) {
          setProductsWaitingExpedition(
            filter((item) => !(item.id === row.id && item.amount === 0), [
              ...filter(
                (item) => {
                  if (linhaUnica) {
                    return item.serialNumber !== serialNumber
                  } else {
                    return item.id !== row.id
                  }
                },

                productsWaitingExpedition
              ),
              {
                ...row,
                amount: row.amount - 1,
              },
            ])
          )
          setProductsForExpedition([
            ...productsForExpedition,
            {
              ...row,
              amount: 1,
              serialNumbers: [{ serialNumber }],
            },
          ])
        } else {
          if (linhaUnica) {
            setProductsWaitingExpedition(
              filter((item) => !(item.id === row.id && item.amount === 0), [
                ...filter(
                  (item) => item.serialNumber !== serialNumber,
                  productsWaitingExpedition
                ),
                {
                  ...row,
                  amount: row.amount - 1,
                },
              ])
            )
            setProductsForExpedition([
              ...productsForExpedition,
              {
                ...row,
                amount: 1,
                serialNumbers: [{ serialNumber }],
              },
            ])
          } else {
            setProductsWaitingExpedition(
              filter((item) => !(item.id === row.id && item.amount === 0), [
                ...filter(
                  (item) => item.id !== row.id,
                  productsWaitingExpedition
                ),
                {
                  ...row,
                  amount: row.amount - 1,
                },
              ])
            )
            setProductsForExpedition([
              ...filter(
                (item) => item.id !== productsForExpedition[idx].id,
                productsForExpedition
              ),
              {
                ...productsForExpedition[idx],
                amount: productsForExpedition[idx].amount + 1,
                serialNumbers: [
                  ...productsForExpedition[idx].serialNumbers,
                  { serialNumber },
                ],
              },
            ])
          }
        }

        message.success(
          `${data.productBase.product.name} reservado(a) cujo número de série é ${serialNumber}`
        )
      } else {
        message.error(
          'Este técnico não possui nenhuma OS neste dia onde este equipamento foi reservado'
        )
      }
    } else {
      message.error('Este equipamento está reservado')
    }
    setSerialNumberSearch('')
  }

  const handleSubmitCheckList = async (checkList) => {
    const { status } = await checkout(checkList)

    if (status === 200) {
      message.success('Sucesso')
      handleSubmitFormSearch(search)
    }
  }

  const handleSubmitFormSearch = async ({ serviço, technician, date }) => {
    const query = {
      filters: {
        os: {
          specific: {
            date:
              technician === 'LABORATORIO'
                ? { start: '01/01/2019' }
                : { start: date, end: date },
          },
        },
        osParts: {
          specific: {
            data:
              technician !== 'LABORATORIO' ? { start: date, end: date } : null,
          },
        },
        technician: {
          specific: {
            name: technician,
          },
        },
        technicianReserve: {
          specific: {
            data:
              technician !== 'LABORATORIO'
                ? { start: date, end: date }
                : undefined,
          },
        },
      },
    }

    setSearch({ serviço, technician, date })

    if (serviço === 'saida') {
      const {
        status,
        data: { rows },
      } = await getAllOsPartsByParams(query)

      const response = await getAllReservaTecnico(query)

      if (status === 200 && response.status === 200) {
        if (rows.length === 0 && response.data.length === 0) {
          message.error('Não há reserva para esta técnico nesta data')
        } else {
          setProductsWaitingExpedition(
            filter(
              ({ amount }) => amount > 0,
              addIndex(map)((item, idx) => {
                return { ...item, key: idx }
              }, rows)
            )
          )
          setProductsForExpedition([])
        }
      }
    }

    if (serviço === 'retorno') {
      const { status, data } = await getAllReservaTecnicoReturn(query)
      if (status === 200) {
        setProductsWaitingReturn(
          addIndex(map)((item, idx) => {
            return { ...item, key: idx }
          }, data)
        )
      }
    }
  }

  const handleSubmitNewReservaTecnico = async ({ type, accesscode }) => {
    const { technician, date } = search

    const { status } = await newReservaTecnico({
      type,
      accesscode,
      technician,
      rows: productsForExpedition,
      data: date ? date : null,
    })

    if (status === 200) {
      setSearch({})
      setProductsWaitingExpedition([])
      setProductsForExpedition([])
    }
  }

  const handleSubimtProductReturn = async ({ osPartId, key, quantity }) => {
    const value = {
      add: {
        [key]: quantity,
      },
      osPartId,
      serialNumberArray: null,
    }

    const { status } = await baixaReservaOs(value)

    if (status === 200) {
      message.success('')
    } else {
      message.error('Ocorreu um erro')
    }

    getOsPartsArrayReturn({})
  }

  const returnForAssociation = async (row) => {
    const { status } = await retornarBaixaReservaOs(row)
    if (status === 200) handleSubmitFormSearch(search)
  }

  useEffect(() => {
    getTecnico().then(({ data }) => setTechnicianList(buildTechnicianList(data)))
  }, [])

  return (
    <RomaneioContainer
      handleCancelModalExpeditionSerialNumber={
        handleCancelModalExpeditionSerialNumber
      }
      handleCancelProductReturn={handleCancelProductReturn}
      handleClickArrow={handleClickArrow}
      handleClickIconExpeditionSerialNumber={
        handleClickIconExpeditionSerialNumber
      }
      handleClickPlusIcon={handleClickPlusIcon}
      handleOkModalExpeditionSerialNumber={handleOkModalExpeditionSerialNumber}
      handleOnChangeSerialNumberSearch={handleOnChangeSerialNumberSearch}
      handleSearchEquip={handleSearchEquip}
      handleSubmitCheckList={handleSubmitCheckList}
      handleSubmitFormSearch={handleSubmitFormSearch}
      handleSubmitNewReservaTecnico={handleSubmitNewReservaTecnico}
      handleSubimtProductReturn={handleSubimtProductReturn}
      osList={osList}
      osPartsArrayReturn={osPartsArrayReturn}
      productsForExpedition={productsForExpedition}
      productsWaitingExpedition={productsWaitingExpedition}
      productsWaitingReturn={productsWaitingReturn}
      returnForAssociation={returnForAssociation}
      rowSelected={rowSelected}
      serialNumberSearch={serialNumberSearch}
      serviço={search.serviço}
      technicianList={technicianList}
      visibleModalExpeditionProducts={visibleModalExpeditionProducts}
      visibleModalExpeditionSerialNumber={visibleModalExpeditionSerialNumber}
    />
  )
}

export default Romaneio
