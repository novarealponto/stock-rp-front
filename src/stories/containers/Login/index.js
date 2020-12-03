import React from 'react'
import LoginContainar from '../../../containers/Login'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Containers/Login',
  component: LoginContainer,
  args: {
    onSubmit: action('Submit form to sign in')
  }
}

const Template = (args) => <LoginContainar {...args} />

export const Default = Template.bind({})
