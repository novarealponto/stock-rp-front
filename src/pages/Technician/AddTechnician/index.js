import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'

import AddTechinicianContainer from '../../../containers/Technician/AddTechinician'
import { getCars, newCar } from '../../../services/tecnico'
import buildCar from './carSpec'
import buildTechnician from './technicianSpec'
import { getRotation } from '../../../utils'
import { newTechnician } from '../../../services/tecnico'

const AddTechnician = () => {
  const [carList, setCarList] = useState([])
  const [form] = Form.useForm()
  const [formModal] = Form.useForm()
  const [rotation, setRotation] = useState('')
  const [shouldRequest, setShouldRequest] = useState(true)
  const [visibleModalNewCar, setVisibleModalNewCar] = useState(false)

  useEffect(() => {
    if (shouldRequest) {
      getAllCars()
    }
  }, [shouldRequest])

  const closeModalNewCar = () => {
    setVisibleModalNewCar(false)
    formModal.resetFields()
  }

  const getAllCars = async () => {
    const { data } = await getCars()
    setCarList(data)
    setShouldRequest(false)
  }

  const messageError = (value) => message.error(value)
  const messageSucess = (value) => message.success(value)

  const onChangeSelecCarList = (plate) => {
    const lastNumberPlate = plate && plate[plate.length - 1]
    setRotation(getRotation(lastNumberPlate))
  }

  const openModalNewCar = () => {
    setVisibleModalNewCar(true)
  }

  const registerNewCar = async (carFormData) => {
    try {
      const { data, status } = await newCar(buildCar(carFormData))

      if (status !== 200) throw new Error()

      messageSucess('Carro cadastrado com sucesso')
      setCarList([...carList, buildCar(data)])
      closeModalNewCar()
    } catch (error) {
      messageError('Houve um erro ao cadastrar carro')
      closeModalNewCar()
    }
  }

  const saveTechnician = async (technicianFormData) => {
    try {
      const { status } = await newTechnician(buildTechnician(technicianFormData))

      if (status !== 200) throw new Error()

      messageSucess('Técnico cadastrado com sucesso')
      form.resetFields()
    } catch (error) {
      messageError('Houve um erro ao cadastrar técnico')
    }
  }

  return (
    <AddTechinicianContainer
      form={form}
      formModal={formModal}
      carList={carList}
      closeModalNewCar={closeModalNewCar}
      onChangeSelecCarList={onChangeSelecCarList}
      openModalNewCar={openModalNewCar}
      rotation={rotation}
      saveModalCar={registerNewCar}
      saveTechnician={saveTechnician}
      visibleModalNewCar={visibleModalNewCar}
    />
  )
}

export default AddTechnician
