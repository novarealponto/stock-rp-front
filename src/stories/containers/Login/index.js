import React from 'react'
import { action } from '@storybook/addon-actions'

import LoginContainar from '../../../containers/Login'

export default {
  title: 'Containers/Login',
  component: LoginContainer,
  args: {
    onSubmit: action('Submit form to sign in')
  }
}

const Template = (args) => <LoginContainar {...args} />

export const Default = Template.bind({})
