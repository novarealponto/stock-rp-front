import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import EditTechinicianContainer from '../../../containers/Technician/EditTechinician'
import {
  getCars,
  updateTechnician,
  getTechnicianById,
} from '../../../services/tecnico'
import buildTechnician from '../../../utils/technicianSpec'
import buildInitialValueTechnician from './formTechnicianSpec'
import { getRotation } from '../../../utils'

const EditTechnician = ({ history, match }) => {
  const [carList, setCarList] = useState([])
  const [form] = Form.useForm()
  const [rotation, setRotation] = useState('')

  useEffect(() => {
    const { id } = match.params

    getTechnicianById(id).then(({ data }) => {
      const initialValue = buildInitialValueTechnician(data)
      form.setFieldsValue(initialValue)
      onChangeSelecCarList(initialValue.car)
    })
    getAllCars()
  }, [form, match])

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
      const { id } = match.params

      const { status } = await updateTechnician(
        buildTechnician({
          ...technicianFormData,
          id,
        })
      )

      if (status !== 200) throw new Error()

      messageSucess('Técnico cadastrado com sucesso')
      history.push('manager')
    } catch (error) {
      messageError('Houve um erro ao cadastrar técnico')
    }
  }

  return (
    <EditTechinicianContainer
      carList={carList}
      form={form}
      onChangeSelecCarList={onChangeSelecCarList}
      rotation={rotation}
      updateTechnician={handleSubmitUpadateTechnician}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(EditTechnician)
