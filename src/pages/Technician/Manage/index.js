import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'

import styles from './style.module.css'
import ManageTechinicians from '../../../containers/Technician/Manage'
import { getAllTechnician as getAllTechnicianService } from '../../../services/tecnico'

const initialStateQuery = {
  name: '',
  plate: '',
  dueDateCnh: '',
}

function Manage() {
  const [avancedSearch, setAvancedSearch] = useState(false)
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState([])
  const [formQuery] = Form.useForm()
  const [stateQuery, setStateQuery] = useState(initialStateQuery)

  useEffect(() => {
    getAllTechnician()
  }, [current, stateQuery])

  const getAllTechnician = () => {
    const { name, CNH, plate } = stateQuery

    const query = {
      filters: {
        technician: {
          specific: {
            name,
            CNH,
          },
        },
        car: {
          specific: {
            plate,
          },
        },
      },
      page: current,
      total: 10,
    }

    getAllTechnicianService(query).then(({ data: { rows, count } }) => {
      setData(
        rows.map((row) => {
          return {
            ...row,
            key: row.id,
            dueDateCnh: row.CNH.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'),
          }
        })
      )
      setCount(count)
    })
  }

  const handleClickAvancedSearch = () => setAvancedSearch(!avancedSearch)

  const handleClickEditLine = () =>
    message.warning('Page para aditar o técino ainda não foi implementada', 5000)

  const handleOnChangeTable = ({ current }) => {
    setCurrent(current)
  }

  const handleSubmitFormQuery = async (queryFormData) => {
    const { name, dueDateCnh: CNH, plate } = queryFormData

    setStateQuery({ name, CNH, plate })
    setCurrent(0)
  }

  return (
    <div className={styles.container}>
      <ManageTechinicians
        avancedSearch={avancedSearch}
        data={data}
        formQuery={formQuery}
        handleClickAvancedSearch={handleClickAvancedSearch}
        handleClickEditLine={handleClickEditLine}
        handleSubmitFormQuery={handleSubmitFormQuery}
        onChangeTable={handleOnChangeTable}
        pagination={{ total: count }}
      />
    </div>
  )
}

export default Manage
