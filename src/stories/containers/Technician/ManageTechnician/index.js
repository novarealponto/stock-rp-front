import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { filter, length, match } from 'ramda'
import { Form, message } from 'antd'
import { name, random } from 'faker'

import ManageTechinicians from '../../../../containers/Technician/Manage'

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
  title: 'Containers/Technician/Manage',
  component: ManageTechinicians,
}

const onChangeTable = action('Change current pagination of table')
const onClickButtonAvancedSearh = action('Show/Hide inputs search form')
const onClickButtonSearh = action('Submit search form')
const onClickEditLine = action('Send message warning')

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

  const handleClickEditLine = (eventOnClick) => {
    onClickEditLine(eventOnClick)
    message.warning('Page para aditar o técino ainda não foi implementada')
  }

  const handleOnChangeTable = ({ current }) => {
    onChangeTable(current)
  }

  const handleSubmitFormQuery = (queryFormData) => {
    onClickButtonSearh(queryFormData)
    setData(filterData(queryFormData))
  }

  return (
    <ManageTechinicians
      {...args}
      avancedSearch={avancedSearch}
      data={data}
      formQuery={formQuery}
      handleClickAvancedSearch={handleClickAvancedSearch}
      handleClickEditLine={handleClickEditLine}
      handleSubmitFormQuery={handleSubmitFormQuery}
      onChangeTable={handleOnChangeTable}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  pagination: {},
}
