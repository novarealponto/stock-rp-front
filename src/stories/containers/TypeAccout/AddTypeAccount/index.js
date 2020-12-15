import React from 'react'

import AddTypeAccountContainer from '../../../../containers/TypeAccount/AddTypeAccount'
import PERMISSIONS from '../../../../utils/permissions';

export default {
  title: 'Containers/TypeAccount',
  component: AddTypeAccountContainer
}

const Template = (args) => <AddTypeAccountContainer permissions={PERMISSIONS} />

export const AddTypeAccount = Template.bind({})
