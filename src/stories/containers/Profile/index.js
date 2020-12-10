import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import ProfileContainer from '../../../containers/Profile';

export default {
  title: 'Containers/Perfil',
  component: ProfileContainer,
};

const handleCancelAction = action('CANCEL ACTION');
const handleOnSubmitAction = action('SUBMIT ACTION');
const setEditAction = action('SET EDITAR ACTION');

const Template = (args) => {
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setEdit(false);
    handleCancelAction(true);
  };

  const handleOnSubmit = (formData) => {
    handleOnSubmitAction(formData);
  };
  
  const showAlterPassword = () => {
    setEdit(!edit);
    setEditAction(true);
  };
  
  return (
    <ProfileContainer
      {...args}
      edit={edit}
      form={form}
      handleCancel={handleCancel}
      handleOnSubmit={handleOnSubmit}
      showAlterPassword={showAlterPassword}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  typeAccount: 'MOD',
  username: 'GuilhermeStain',
};
