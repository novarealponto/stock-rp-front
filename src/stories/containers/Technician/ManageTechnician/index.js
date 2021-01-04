import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { filter, length, match } from 'ramda'
import { Form } from 'antd'
import { name, random } from 'faker'

import ManagerContainer from '../../../../containers/Technician/Manage'

const initialData = []

for (let i = 0; i < 100; i++) {
  initialData.push({
    key: i,
    name: name.findName(),
    external: random.boolean(),
    plate: `AAA12${i}`,
    dueDateCnh: '01010101',
  })
}

export default {
  title: 'Containers/Technician',
  component: ManagerContainer,
}

const goToAddTechnicianAction = action('Redirect to create technician page')
const goToUpdateTechnicianAction = action('Redirect to edit technician page')
const onChangeTable = action('Change current pagination of table')
const onClickButtonAvancedSearh = action('Show/Hide inputs search form')
const onClickButtonSearh = action('Submit search form')

const Template = (args) => {
  const [avancedSearch, setAvancedSearch] = useState(false)
  const [data, setData] = useState(initialData)
  const [formQuery] = Form.useForm()

  const applyMatch = (key, object, query) =>
    match(createRegex(query[key]), object[key])

  const createRegex = (pattern) => new RegExp(`${pattern}`, 'gi')

  const filterData = (query) => {
    const callback = (item) => {
      return (
        length(applyMatch('name', item, query)) > 0 &&
        length(applyMatch('plate', item, query)) > 0 &&
        length(applyMatch('dueDateCnh', item, query)) > 0
      )
    }
    return filter(callback, initialData)
  }

  const handleClickAvancedSearch = (eventOnClick) => {
    onClickButtonAvancedSearh(eventOnClick)
    setAvancedSearch(!avancedSearch)
  }

  const handleOnChangeTable = ({ current }) => onChangeTable(current)

  const goAddTechnician = (eventOnClick) => goToAddTechnicianAction(eventOnClick)

  const goToUpdateTechnician = (technicianLineClicked) =>
    goToUpdateTechnicianAction(technicianLineClicked)

  const handleSubmitFormQuery = (queryFormData) => {
    onClickButtonSearh(queryFormData)
    setData(filterData(queryFormData))
  }

  return (
    <ManagerContainer
      {...args}
      avancedSearch={avancedSearch}
      data={data}
      formQuery={formQuery}
      goToUpdateTechnician={goToUpdateTechnician}
      goAddTechnician={goAddTechnician}
      handleClickAvancedSearch={handleClickAvancedSearch}
      handleSubmitFormQuery={handleSubmitFormQuery}
      onChangeTable={handleOnChangeTable}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  pagination: {},
}
