import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, company, date, random } from 'faker'
import { Form } from 'antd'
import moment from 'moment'

import ManagerSupplyManufacturerContainer from '../../../../../containers/Supply/Manufacturer/Manager'

export default {
  title: 'Containers/Supply/Manufacturer',
  component: ManagerSupplyManufacturerContainer,
}

const dataSource = []
const manufacturerList = []

for (let key = 0; key < 30; key++) {
  dataSource.push({
    code: key,
    createdAt: moment(date.past()).format('L'),
    key,
    manufacturer: company.companyName(),
    manufacturerId: key,
  })

  manufacturerList.push({
    id: key,
    name: company.companyName(),
  })
}

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
