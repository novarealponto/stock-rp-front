import React, { useState, useEffect } from 'react'
import { Form } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'ramda'

import ManagerContainer from '../../../containers/Technician/Manage'
import { getAllTechnician as getAllTechnicianService } from '../../../services/tecnico'
import { redirectValueTecnico } from '../../Gerenciar/Produto/ProdutoRedux/action'

const initialStateQuery = {
  name: '',
  plate: '',
  dueDateCnh: '',
}

const Manager = ({ redirectValueTecnico, history }) => {
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

  const goAddTechnician = () => history.push('add')

  const goToUpdateTechnician = (technicianForUpdate) => {
    redirectValueTecnico(technicianForUpdate)
    history.push('edit')
  }

  const handleClickAvancedSearch = () => setAvancedSearch(!avancedSearch)

  const handleOnChangeTable = ({ current }) => {
    setCurrent(current)
  }

  const handleSubmitFormQuery = async (queryFormData) => {
    const { name, dueDateCnh: CNH, plate } = queryFormData

    setStateQuery({ name, CNH, plate })
    setCurrent(0)
  }

  return (
    <ManagerContainer
      avancedSearch={avancedSearch}
      data={data}
      formQuery={formQuery}
      goToUpdateTechnician={goToUpdateTechnician}
      goAddTechnician={goAddTechnician}
      handleClickAvancedSearch={handleClickAvancedSearch}
      handleSubmitFormQuery={handleSubmitFormQuery}
      onChangeTable={handleOnChangeTable}
      pagination={{ total: count }}
    />
  )
}

const mapStateToProps = () => {}

const mapDispacthToProps = (dispach) =>
  bindActionCreators({ redirectValueTecnico }, dispach)

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(Manager)
