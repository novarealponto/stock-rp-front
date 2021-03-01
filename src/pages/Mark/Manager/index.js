import React, { useCallback, useEffect, useState } from 'react'
import { applySpec, pathOr } from 'ramda'
import { Form, message } from 'antd'

import ManagerContainer from '../../../containers/Mark/Manager'
import {
  getMarca as getAllMarksService,
  newMarca as newMark,
} from '../../../services/produto'

const Manager = () => {
  const [current, setCurrent] = useState (1)
  const [dataSource, setDataSource] = useState([])
  const [formCreateMark] = Form.useForm()
  const [searchValue, setSearchValue] = useState('')
  const [visibleCreateMark, setVisibleCreateMark] = useState(false)
  const [total, setTotal] = useState(10)

  const getAllMarks = useCallback(() => {
    const query = {
      filters: {
        mark: {
          specific: {
            mark: searchValue,
          },
        },
      },
      total: 10,
      page: current,
    }

    getAllMarksService(query).then(({ data: { rows, count } }) => {
      setDataSource(rows)
      setTotal(count)
    })
  }, [current, searchValue])

  const handleCancelCreateMark = () => {
    formCreateMark.resetFields()
    setVisibleCreateMark(false)
  }

  const handleOkCreateMark = async (markFormData) => {
    const buildNewMark = applySpec({
      mark: pathOr('', ['mark']),
      responsibleUser: pathOr('modrp', ['responsibleUser']),
    })

    try {
      const { status } = await newMark(buildNewMark(markFormData))

      if (status !== 200 && status !== 201 && status !== 204) {
        throw new Error('422 Unprocessable Entity!')
      }
      message.success('Marca cadastrada com sucesso')
      handleCancelCreateMark()
      getAllMarks()
    } catch (err) {
      message.error('Erro ao cadastrar marca')
      console.log(err)
    }
  }

  const handleOnSearch = (searchValue) => {
    setCurrent(1)
    setSearchValue(searchValue)
  }

  useEffect(() => {
    getAllMarks()
  }, [getAllMarks])

  console.log(total);

  return (
    <ManagerContainer
      dataSource={dataSource}
      formCreateMark={formCreateMark}
      handleCancelCreateMark={handleCancelCreateMark}
      handleChangeTable={({ current }) => setCurrent(current)}
      handleOkCreateMark={handleOkCreateMark}
      handleOnClickNewMark={() => setVisibleCreateMark(true)}
      handleOnSearch={handleOnSearch}
      pagination={{ total , showSizeChanger: false, current }}
      visibleCreateMark={visibleCreateMark}
    />
  )
}

export default Manager
