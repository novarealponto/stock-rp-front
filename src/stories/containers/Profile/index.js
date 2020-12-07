import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import PerfilContainer from '../../../containers/Profile';

export default {
  title: 'Containers/Perfil',
  component: PerfilContainer,
};

const handleCancelAction = action('CANCEL ACTION');
const handleOnSubmitAction = action('SUBMIT ACTION');
const setEditarAction = action('SET EDITAR ACTION');

const Template = (args) => {
  const [editar, setEditar] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setEditar(false);
    handleCancelAction(true);
  };

  const handleOnSubmit = (formData) => {
    handleOnSubmitAction(formData);
  };
  
  const showAlterPassword = () => {
    setEditar(!editar);
    setEditarAction(true);
  };
  
  return (
    <PerfilContainer
      {...args}
      editar={editar}
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
