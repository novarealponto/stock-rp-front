import React from 'react';
import { action } from '@storybook/addon-actions';

import ManagerContainer from '../../../../containers/User/Manager';

export default {
  title: 'Containers/User',
  component: ManagerContainer,
};

const Template = (args) => (
  <ManagerContainer {...args} />
);

export const Manager = Template.bind({});

Manager.args = {
  data: [{
    id: '1',
    key: '1',
    username: 'John Brown',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '2',
    key: '2',
    username: 'Jim Green',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '3',
    key: '3',
    username: 'Joe Black',
    typeName: 'Modulo',
    customized: false,
  }],
  goToAddUser: action('Go to add user!'),
  goToUpdateUser: action('Go to update user!'),
  handleSearch: action('On search!'),
  loading: false,
};
