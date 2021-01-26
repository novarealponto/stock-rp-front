import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import {
  applySpec,
  compose,
  dec,
  find,
  findIndex,
  forEach,
  inc,
  map,
  max,
  min,
  path,
  pipe,
  prop,
  propEq,
  toLower,
  toUpper,
} from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message, Form } from 'antd'

import MobileContainer from '../../../containers/Mobile'
import { getAllReservaTecnicoReturn as getAllReservaTecnicoReturnService } from '../../../services/reservaTecnico'
import {
  getTodasOs as getAllOsServise,
  associarEquipsParaOsPart,
} from '../../../services/reservaOs'
import { updateSenha } from '../../../services/password'
import { Logout } from '../../Login/LoginRedux/action'

const Mobile = ({ auth, Logout }) => {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [osList, setOsList] = useState([])
  const [osSelected, setOsSelected] = useState(null)
  const [products, setProducts] = useState([])
  const [productsSelected, setProductsSelected] = useState([])
  const [visibleDrawer, setVisibleDrawer] = useState(false)

  const getAllOs = useCallback(async () => {
    const query = {
      filters: {
        os: {
          specific: {
            date:
              path(['technicianId'], auth) !==
              '0c451d60-f837-4a9e-b8a6-cab41a788133'
                ? {
                    end: moment(),
                    start: moment(),
                  }
                : undefined,
          },
        },
        technician: {
          specific: {
            id: path(['technicianId'], auth),
          },
        },
        technicianReserve: {
          specific: {
            data: {
              end: moment(),
              start: moment(),
            },
          },
        },
      },
      paranoid: true,
    }

    const {
      data: { rows },
      status,
    } = await getAllOsServise(query)

    if (status === 200) {
      setOsList(rows)
    }
  }, [auth])

  const getAllReservaTecnicoReturn = useCallback(async () => {
    const query = {
      filters: {
        technician: {
          specific: {
            id: path(['technicianId'], auth),
          },
        },
        technicianReserve: {
          specific: {
            data:
              path(['technicianId'], auth) !==
              '0c451d60-f837-4a9e-b8a6-cab41a788133'
                ? {
                    end: moment(),
                    start: moment(),
                  }
                : undefined,
          },
        },
      },
      osPartsId: null,
    }

    const { data, status } = await getAllReservaTecnicoReturnService(query)

    if (status === 200) {
      let products = []
      forEach((item) => {
        const index = findIndex(propEq('produto', item.produto))(products)

        const osPart = find(propEq('name', item.produto))(
          find(propEq('id', osSelected))(osList).products
        )

        const { amount, missOut, output, return: returnValue } = osPart

        const max =
          parseInt(amount) -
          parseInt(missOut) -
          parseInt(output) -
          parseInt(returnValue)

        if (item.osPartId || !max) return

        if (index === -1) {
          if (!osPart) return
          products = [
            ...products,
            { ...item, amount: max, osPartId: osPart.id, product: osPart.name },
          ]
        } else {
          products[index] = {
            ...products[index],
            amount: products[index].amount + max,
            serialNumbers: [
              ...products[index].serialNumbers,
              ...item.serialNumbers,
            ],
          }
        }
      }, data)

      setProducts(products)
    }
  }, [auth, osList, osSelected])

  const handleClickAdvance = ({ add }) => {
    if (current === 0) {
      getAllReservaTecnicoReturn()
    } else if (current === 1) {
      forEach(
        ({ amount, id, osPartId, product, serial, serialNumbers }) =>
          add(
            {
              amount: 0,
              id,
              max: amount,
              osPartId,
              product,
              serial,
              serialNumbers: [],
              serialNumbersList: serialNumbers,
            },
            0
          ),
        productsSelected
      )
    } else if (current === 2) {
      form.submit()
    }

    setCurrent(min(inc(current), 2))
  }

  const handleClickBack = ({ remove, fields }) => {
    if (current === 1) {
      setProducts([])
      setProductsSelected([])
    }
    if (current === 2) {
      remove(map((field) => field.name, fields))
    }
    setCurrent(max(dec(current), 0))
  }

  const handleClickCardOs = setOsSelected

  const handleClickCardProducts = ({
    amount,
    id,
    osPartId,
    product,
    serial,
    serialNumbers,
  }) => {
    const index = findIndex(propEq('id', id))(productsSelected)
    const list = productsSelected

    if (index !== -1) {
      list.splice(index, 1)
      setProductsSelected([...list])
    } else {
      setProductsSelected([
        ...productsSelected,
        {
          amount,
          id,
          osPartId,
          product,
          serial,
          serialNumbers,
        },
      ])
    }
  }

  const handleSubmit = ({ products }) => {
    associarEquipsParaOsPart({
      osParts: products,
      technicianId: path(['technicianId'], auth),
    })
      .then(({ status }) => {
        if (status === 200) {
          form.resetFields()
          getAllOs()
          setCurrent(0)
          setOsList([])
          setOsSelected(null)
          setProducts([])
          setProductsSelected([])
          message.success('Sucesso')
        } else {
          message.error('Ocorreu um erro')
        }
      })
      .catch((error) => {
        message.error('Ocorreu um erro')
        console.error(error)
      })
  }

  const handleSubmitNewPassword = (formData) => {
    const buildValue = applySpec({
      newPassword: prop('newPassword'),
      oldPassword: prop('currentPassword'),
      username: pipe(prop('username'), toLower),
    })

    updateSenha(buildValue(formData)).then(({ status }) => {
      if (status === 200) {
        form.resetFields()
        message.success('Senha atualizada')
        setVisibleDrawer(false)
      } else {
        message.error('erro ao atualizar senha')
      }
    })
  }

  useEffect(() => {
    getAllOs()
  }, [getAllOs])

  return (
    <MobileContainer
      current={current}
      form={form}
      handleClickAdvance={handleClickAdvance}
      handleClickBack={handleClickBack}
      handleClickCardOs={handleClickCardOs}
      handleClickCardProducts={handleClickCardProducts}
      handleClickLogout={() => Logout(path(['token'], auth))}
      handleClickUserIcon={() => setVisibleDrawer(true)}
      handleCloseDrawer={() => setVisibleDrawer(false)}
      handleSubmit={handleSubmit}
      handleSubmitNewPassword={handleSubmitNewPassword}
      osList={osList}
      osSelected={osSelected}
      products={products}
      productsSelected={productsSelected}
      username={pipe(path(['username']), toUpper)(auth)}
      visibleDrawer={visibleDrawer}
    />
  )
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const mapDispacthToProps = (dispach) => bindActionCreators({ Logout }, dispach)

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps))

export default enhanced(Mobile)
