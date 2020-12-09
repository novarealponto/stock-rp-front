import React, { useState } from 'react';
import { Form } from 'antd';
import { action } from '@storybook/addon-actions';
import { path } from 'ramda'
import buildUser from '../../../../utils/userSpec';
import EditUser from '../../../../containers/User/EditUser';
import PERMISSIONS from '../../../../utils/permissions';

export default {
  title: 'Containers/User',
  component: EditUser,
};

const handleOnTypeAccountChangeAction = action('On change type account form!');
const handleSubmitAction = action('On submit user form!');

const Template = (args) => {
  const [allowCustomPermissions, setAllowCustomPermissions] = useState(false);
  const [form] = Form.useForm();
  form.setFieldsValue({
    ...args.userData.resource,
    allowCustomPermissions: path(['userData', 'customized'], args),
    userName: path(['userData', 'username'], args),
    typeAccount: path(['userData', 'typeName'], args),
  })

  const handleSubmit = formData => {
    handleSubmitAction({
      id: path(['userData', 'id'], args),
      ...buildUser(formData),
    });
  }

  const handleAllowSetCustomPermissions = () => (
    setAllowCustomPermissions(!allowCustomPermissions)
  );

  const handleOnTypeAccountChange = typeAccount => {
    handleOnTypeAccountChangeAction({ typeAccount })
    return form.setFieldsValue({ typeAccount })
  };

  return (
    <EditUser
      {...args}
      allowCustomPermissions={allowCustomPermissions}
      form={form}
      handleAllowSetCustomPermissions={handleAllowSetCustomPermissions}
      handleOnTypeAccountChange={handleOnTypeAccountChange}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
    />
  );
};

export const EditAnUser = Template.bind({});

EditAnUser.args = {
  userData: {
    customized: false,
    id: '3f119bb4-622e-4b3e-8fab-30f8d6278286',
    resource: {
      addCar: true,
      addEntr: true,
      addFonr: true,
      addKit: true,
      addKitOut: true,
      addMark: true,
      addOutPut: true,
      addProd: true,
      addRML: true,
      addROs: true,
      addStatus: true,
      addTec: true,
      addType: true,
      addTypeAccount: true,
      addUser: true,
      delROs: true,
      deletedAt: null,
      gerROs: true,
      suprimento: true,
      updateRos: true,
    },
    typeName: 'Padrão',
    username: 'alexandre.soares',
  },
  typeAccounts: [
    { typeName: 'Padrão' },
    { typeName: 'Técnico' },
    { typeName: 'Laboratório' },
  ],
};
