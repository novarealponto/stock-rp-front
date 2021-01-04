import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import EditTechinicianContainer from '../../../containers/Technician/EditTechinician'
import { getCars, updateTechnician } from '../../../services/tecnico'
import buildTechnician from '../../../utils/technicianSpec'
import buildInitialValueTechnician from './formTechnicianSpec'
import { clearValueTecnico } from '../../Gerenciar/Produto/ProdutoRedux/action'
import { getRotation } from '../../../utils'

const EditTechnician = ({ clearValueTecnico, history, tecnicoUpdateValue }) => {
  const [carList, setCarList] = useState([])
  const [form] = Form.useForm()
  const [rotation, setRotation] = useState('')

  useEffect(() => {
    const { plate } = tecnicoUpdateValue

    onChangeSelecCarList(plate)
    getAllCars()
  }, [])

  const getAllCars = async () => {
    const { data } = await getCars()
    setCarList(data)
  }

  const messageError = (value) => message.error(value)
  const messageSucess = (value) => message.success(value)

  const onChangeSelecCarList = (plate) => {
    const lastNumberPlate = plate && plate[plate.length - 1]
    setRotation(getRotation(lastNumberPlate))
  }

  const handleSubmitUpadateTechnician = async (technicianFormData) => {
    try {
      const { id } = tecnicoUpdateValue

      const { status } = await updateTechnician(
        buildTechnician({ ...technicianFormData, id })
      )

      if (status !== 200) throw new Error()

      messageSucess('Técnico cadastrado com sucesso')
      clearValueTecnico()
      history.push('manager')
    } catch (error) {
      messageError('Houve um erro ao cadastrar técnico')
    }
  }

  return (
    <EditTechinicianContainer
      form={form}
      carList={carList}
      formInitialValues={buildInitialValueTechnician(tecnicoUpdateValue)}
      onChangeSelecCarList={onChangeSelecCarList}
      rotation={rotation}
      updateTechnician={handleSubmitUpadateTechnician}
    />
  )
}

const mapStateToProps = ({ tecnicoUpdateValue }) => ({ tecnicoUpdateValue })

const mapDispacthToProps = (dispach) =>
  bindActionCreators({ clearValueTecnico }, dispach)

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(EditTechnician)
