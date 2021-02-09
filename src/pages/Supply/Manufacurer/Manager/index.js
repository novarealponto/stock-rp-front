import React, { useCallback, useEffect, useState } from 'react'
import { map } from 'ramda'
import { message, Form } from 'antd'

import ManagerSupplyManufacturerContainer from '../../../../containers/Supply/Manufacturer/Manager'
import { buildDataSouce, buildSupplyManufacturer } from './spec'
import {
  GetManufacturer,
  NewManufacturer,
  UpdateManufacturer
} from '../../../../services/Suprimentos/product'

const ManagerSupplyManufacturer = () => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [formRegister] = Form.useForm()
  const [formUpdate] = Form.useForm()
  const [queryValues, setQueryValues] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)


  const getAllSupplyManufacturer = useCallback(() => {
    const { createdAt, manufacturer } = queryValues

    const query = {
      filters: {
        manufacturer: {
          specific: {
            name: manufacturer,
            createdAt: createdAt
              ? {
                  end: createdAt[1]._d,
                  start: createdAt[0]._d,
                }
              : undefined,
          },
        },
      },
      page: current,
      total: 10,
    }

    GetManufacturer(query).then(({ data: { rows, count } }) => {
      setDataSource(map(buildDataSouce, rows))
      setTotal(count)
    })
  }, [current, queryValues])

  const handleClickEditSupplyManufacturer = (row) => {
    formUpdate.setFieldsValue(row)
    setVisibleModalUpdate(true)
  }

  const handleClickOnCancel = (usage) => {
    return {
      register: () => {
        formRegister.resetFields()
        setVisibleModalRegister(false)
      },
      update: () => {
        formUpdate.resetFields()
        setVisibleModalUpdate(false)
      },
    }[usage]()
  }

  const handleOnSearch = (searchValue) => {
    setQueryValues(searchValue)
    setCurrent(1)
  }

  const handleSubmitRegister = async (formData) => {
    try {
      const { status } = await NewManufacturer(buildSupplyManufacturer(formData))

      if (status !== 200 && status !== 201) {
        throw new Error('422 Unprocessable Entity!')
      }

      getAllSupplyManufacturer()
      handleClickOnCancel('register')
      message.success('Cadastro efetuado')
    } catch (err) {
      message.error('Erro ao efetuar cadastro')
      console.log(err)
    }
  }

  const handleSubmitUpdate = async (formData) => {
    try {
      const { status } = await UpdateManufacturer(buildSupplyManufacturer(formData))

      if (status !== 200 && status !== 201) {
        throw new Error('422 Unprocessable Entity!')
      }

      getAllSupplyManufacturer()
      handleClickOnCancel('update')
      message.success('Fabricante atualizado')
    } catch (err) {
      message.error('Erro ao efetuar atualização')
      console.log(err)
    }
  }

  useEffect(() => {
    getAllSupplyManufacturer()
  }, [getAllSupplyManufacturer])

  return (
    <ManagerSupplyManufacturerContainer
      dataSource={dataSource}
      formRegister={formRegister}
      formUpdate={formUpdate}
      handleClickEditSupplyManufacturer={handleClickEditSupplyManufacturer}
      handleClickNewSupplyManufacturer={() => setVisibleModalRegister(true)}
      handleClickOnCancel={handleClickOnCancel}
      handleOnChangeTable={({ current }) => setCurrent(current)}
      handleOnSearch={handleOnSearch}
      handleSubmitRegister={handleSubmitRegister}
      handleSubmitUpdate={handleSubmitUpdate}
      pagination={{ current, showSizeChanger: false, total }}
      visibleModalRegister={visibleModalRegister}
      visibleModalUpdate={visibleModalUpdate}
    />
  )
}

export default ManagerSupplyManufacturer
