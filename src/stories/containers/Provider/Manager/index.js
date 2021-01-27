import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { address, company, name, phone } from 'faker'
import { forEach } from 'ramda'
import { generate as generateCNPJ } from '@fnando/cnpj'

import filterData from '../../../../utils/filterData'
import ManagerContainer from '../../../../containers/Provider/Manager'

export default {
  title: 'Containers/Providers',
  component: ManagerContainer,
}

const initialDataSource = []

for (let key = 0; key < 100; key++) {
  initialDataSource.push({
    cnpj: generateCNPJ(true),
    key,
    nameContact: name.findName(),
    razaoSocial: company.companyName(),
    state: address.stateAbbr(),
    telphone: phone.phoneNumberFormat(),
  })
}

const createObjSearchGlobal = (keys, value) => {
  const obj = {}
  forEach((key) => (obj[key] = value), keys)
  return obj
}

const handleOnSearchAction = action('Search')

const Template = (args) => {
  const [dataSource, setDataSource] = useState(initialDataSource)
  const [searching, setSearching] = useState(false)

  const handleSearch = async (searchValue) => {
    handleOnSearchAction(searchValue)
    setSearching(true)

    const query = createObjSearchGlobal(
      ['cnpj', 'nameContact','razaoSocial', 'state', 'telphone'],
      searchValue
    )

    setDataSource(filterData(query, initialDataSource))

    new Promise((resolve) => resolve()).then(
      setTimeout(() => {
        setSearching(false)
      }, 500)
    )
  }

  return (
    <ManagerContainer
      {...args}
      dataSource={dataSource}
      handleSearch={handleSearch}
      searching={searching}
    />
  )
}

export const Manager = Template.bind({})

Manager.args = {
  goToAddProvider: action('Go to page add provider'),
}
