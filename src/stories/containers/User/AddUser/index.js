import React, { useState } from 'react';
import { Form } from 'antd';
import { action } from '@storybook/addon-actions';

import buildUser from '../../../../pages/User/AddUser/userSpec';
import AddUser from '../../../../containers/User/AddUser';
import PERMISSIONS from '../../../../utils/permissions';

export default {
  title: 'Containers/User',
  component: AddUser,
};

const goToAddTypeAccount = action('Go to add type account!');
const handleOnTypeAccountChangeAction = action('On change type account form!');
const handleSubmitAction = action('On submit user form!');

const Template = (args) => {
  const [allowCustomPermissions, setAllowCustomPermissions] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = formData => {
    handleSubmitAction(buildUser(formData));
  }

  const handleAllowSetCustomPermissions = () => (
    setAllowCustomPermissions(!allowCustomPermissions)
  );

  const handleOnTypeAccountChange = typeAccount => {
    handleOnTypeAccountChangeAction({ typeAccount })
    return form.setFieldsValue({ typeAccount })
  };

  return (
    <AddUser
      {...args}
      allowCustomPermissions={allowCustomPermissions}
      form={form}
      goToAddTypeAccount={goToAddTypeAccount}
      handleAllowSetCustomPermissions={handleAllowSetCustomPermissions}
      handleOnTypeAccountChange={handleOnTypeAccountChange}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
    />
  );
};

export const AddNewUser = Template.bind({});

AddNewUser.args = {
  allowAddTypeAccount: true,
  typeAccounts: [
    { typeName: 'Módulo' },
    { typeName: 'Técnico' },
    { typeName: 'Laboratório' },
  ],
};
