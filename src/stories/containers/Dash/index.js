import React from 'react'
// import { action } from '@storybook/addon-actions'

import DashContainer from '../../../containers/Dash'

export default {
  title: 'Containers/Dash',
  component: DashContainer,
  args: {
    // onSubmit: action('Submit form to sign in')
  }
}

const Template = (args) => <DashContainer {...args} />

export const Default = Template.bind({})
