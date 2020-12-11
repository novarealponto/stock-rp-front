import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Form } from 'antd'
import moment from 'moment'

import EditTechinician from '../../../../containers/Technician/EditTechinician'
import { getRotation } from '../../../../utils'

export default {
  title: 'Containers/Technician',
  component: EditTechinician,
}

const initialValues = {
  name: 'Jessi',
  dueDateCnh: moment(),
  car: 'AAA1231',
  external: true,
}

const UpdateAction = action('Update technician')

const Template = (args) => {
  const [form] = Form.useForm()
  const [rotation, setRotation] = useState('Segunda-feira')

  const onChangeSelecCarList = (plate) => {
    const lastNumberPlate = !!plate && plate[plate.length - 1]
    setRotation(getRotation(lastNumberPlate))
  }

  const saveTechnician = (technicianFormData) => UpdateAction(technicianFormData)

  return (
    <EditTechinician
      {...args}
      form={form}
      onChangeSelecCarList={onChangeSelecCarList}
      rotation={rotation}
      saveTechnician={saveTechnician}
    />
  )
}

export const Edit = Template.bind({})

Edit.args = {
  carList: [
    { model: 'name 1', plate: 'AAA-1231' },
    { model: 'name 2', plate: 'AAA-1232' },
    { model: 'name 3', plate: 'AAA-1233' },
    { model: 'name 4', plate: 'AAA-1234' },
  ],
  formInitialValues: initialValues,
}
