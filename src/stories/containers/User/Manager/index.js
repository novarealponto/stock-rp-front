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
  },
  {
    id: '4',
    key: '4',
    username: 'Joe Doe',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '5',
    key: '5',
    username: 'Jim Bean',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '6',
    key: '6',
    username: 'Jorge Black',
    typeName: 'Modulo',
    customized: false,
  },
  {
    id: '7',
    key: '7',
    username: 'Jack Brown',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '8',
    key: '8',
    username: 'Jim Yellor',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '9',
    key: '9',
    username: 'Joe Red',
    typeName: 'Modulo',
    customized: false,
  },
  {
    id: '10',
    key: '10',
    username: 'John Goldman',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '11',
    key: '11',
    username: 'Jim Gray',
    typeName: 'Modulo',
    customized: true,
  },
  {
    id: '12',
    key: '12',
    username: 'Joe Black II',
    typeName: 'Modulo',
    customized: false,
  }],
  goToAddUser: () => action('Go to add user!'),
  goToUpdateUser: () => action('Go to update user!'),
  handlePaginations: () => action('Pagination action!'),
  handleSearch: action('On search!'),
  loading: false,
};
