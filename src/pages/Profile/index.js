import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose, pathOr, omit, mergeRight } from 'ramda';
import { message, Form } from 'antd';

import PerfilContainer from '../../containers/Profile';
import { updateSenha } from '../../services/password';

const PerfilDash = ({ username, typeAccount }) => {
  const [editar, setEditar] = useState(false);
  const [form] = Form.useForm();

  const error = () => {
    message.error('Os dados do usuário não foram atualizados');
  };

  const handleCancel = () => {
    form.resetFields();
    setEditar(false);
  };
  
  const handleOnSubmit = async (formData) => {

    const resposta = await updateSenha(
      mergeRight(
        omit(['confirmPassword'], formData), 
        { username }
      ));

    if (resposta.status === 422) {
      error();
    }
    if (resposta.status === 200) {
      success();
      setEditar(false);
      form.resetFields();
    }
  };

  const showAlterPassword = () => {
    setEditar(!editar); 
  };
  
  const success = () => {
    message.success('Os dados do usuário foram atualizados');
  };

  return (
    <PerfilContainer
      editar={editar}
      form={form}
      handleCancel={handleCancel}
      handleOnSubmit={handleOnSubmit}
      showAlterPassword={showAlterPassword}
      typeAccount={typeAccount}
      username={username}
    />
  );
};

const mapStateToProps = ({ auth }) => {
  const typeAccount = pathOr('', ['typeAccount'], auth);
  const username = pathOr('', ['username'], auth);
  return {
    typeAccount,
    username,
  };
};

const enhanced = compose(connect(mapStateToProps));

export default enhanced(PerfilDash);
