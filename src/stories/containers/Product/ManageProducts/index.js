import React from 'react'

import ManageProducts from '../../../../containers/Product/Manage'

export default {
  title: 'Containers/Products/ManageProducts',
  component: ManageProducts
}

const Template = (args) => <ManageProducts {...args} />

export const Default = Template.bind({})
