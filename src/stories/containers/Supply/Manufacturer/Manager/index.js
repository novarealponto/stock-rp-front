import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { company, date } from 'faker'
import { Form } from 'antd'
import moment from 'moment'

import ManagerSupplyManufacturerContainer from '../../../../../containers/Supply/Manufacturer/Manager'

export default {
  title: 'Containers/Supply/Manufacturer',
  component: ManagerSupplyManufacturerContainer,
}

const dataSource = new Array(30).fill(null).map((_, key) => ({
  code: key,
  createdAt: moment(date.past()).format('L'),
  key,
  manufacturer: company.companyName(),
  manufacturerId: key,
}))

const Template = (args) => {
  const [formRegister] = Form.useForm()
  const [formUpdate] = Form.useForm()
  const [visibleModalRegister, setVisibleModalRegister] = useState(false)
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)

  const handleClickOnCancel = () => {
    setVisibleModalRegister(false)
    setVisibleModalUpdate(false)
    formRegister.resetFields()
    formUpdate.resetFields()
  }

  const handleClickEditSupplyManufacturer = (row) => {
    formUpdate.setFieldsValue(row)
    setVisibleModalUpdate(true)
  }

  const handleClickNewSupplyManufacturer = () => setVisibleModalRegister(true)

  return (
    <ManagerSupplyManufacturerContainer
      {...args}
      formRegister={formRegister}
      formUpdate={formUpdate}
      handleClickEditSupplyManufacturer={handleClickEditSupplyManufacturer}
      handleClickNewSupplyManufacturer={handleClickNewSupplyManufacturer}
      handleClickOnCancel={handleClickOnCancel}
      visibleModalRegister={visibleModalRegister}
      visibleModalUpdate={visibleModalUpdate}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  dataSource,
  handleOnChangeTable: action('handle Change Table'),
  handleOnSearch: action('handle On Search'),
  handleSubmitRegister: action('handle Submit Register'),
  handleSubmitUpdate: action('handle Submit Update'),
  pagination: { showSizeChanger: false },
}
