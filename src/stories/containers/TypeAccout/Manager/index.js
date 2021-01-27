import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { name } from 'faker'

import filterData from  '../../../../utils/filterData'
import ManagerContainer from '../../../../containers/TypeAccount/Manager'

export default {
  title: 'Containers/TypeAccount',
  component: ManagerContainer,
}

const initialData = []

for (let key = 0; key < 100; key++) {
  initialData.push({
    key,
    typeName: name.firstName(),
  })
}

const goToAddTypeAccountAction = action('Go to add type account page')
const handleSearchAction = action('Search')

const Template = (args) => {
  const [data, setData] = useState(initialData)

  const goToAddTypeAccount = (eventClick) => goToAddTypeAccountAction(eventClick)

  const handleSearch = (searchValue) => {
    setData(filterData({ typeName: searchValue }, initialData))
    handleSearchAction(searchValue)
  }

  return (
    <ManagerContainer
      data={data}
      goToAddTypeAccount={goToAddTypeAccount}
      handleSearch={handleSearch}
    />
  )
}

export const Manager = Template.bind({})
