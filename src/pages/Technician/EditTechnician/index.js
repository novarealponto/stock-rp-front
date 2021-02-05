import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import { compose, length, pipe, pathOr, split } from 'ramda'
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

const EditTechnician = ({ history }) => {
  const [carList, setCarList] = useState([])
  const [form] = Form.useForm()
  const [rotation, setRotation] = useState('')

  useEffect(() => {
    const pathname = pipe(
      pathOr('', ['location', 'pathname']),
      split('/')
    )(window)

    const id = pathname[length(pathname) - 1]

    getTechnicianById(id).then(({ data }) => {
      const initialValue = buildInitialValueTechnician(data)
      form.setFieldsValue(initialValue)
      onChangeSelecCarList(initialValue.car)
    })
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
      const pathname = pipe(
        pathOr('', ['location', 'pathname']),
        split('/')
      )(window)

      const id = pathname[length(pathname) - 1]

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
      form={form}
      carList={carList}
      onChangeSelecCarList={onChangeSelecCarList}
      rotation={rotation}
      updateTechnician={handleSubmitUpadateTechnician}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(EditTechnician)
