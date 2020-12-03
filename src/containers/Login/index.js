import React from 'react';

import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import styles from './style.module.css';

const { Password } = Input;
const { Item: ItemForm } = Form;

const roleRequired = (message) => {
  return{
    required: true,
    message,
  }
}

const LoginContainer = ({ onSubmit }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Estoque - RP</h1>
        <img src="../../retina.png" />
        <Form name="signIn" onFinish={onSubmit} onFinishFailed={() => {}}>
          <ItemForm
            name="username"
            rules={[roleRequired('insira seu username')]}
          >
            <Input
              placeholder="Digite seu username"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </ItemForm>

          <ItemForm name="password"
            rules={[roleRequired('insira sua senha')]}
            >
            <Password
              placeholder="Digite a senha"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </ItemForm>

          <ItemForm name="password">
            <Button htmlType="submit" type="primary">
              Login
            </Button>
          </ItemForm>
        </Form>
      </div>
    </div>
  );
};

export default LoginContainer;
