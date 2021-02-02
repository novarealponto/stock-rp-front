import React from 'react';
import { Form, Button, Input, Card, Avatar, Row, Col, Typography } from 'antd';

import styles from './style.module.css';

const { Title } = Typography;

const Profile = ({
  edit,
  form,
  handleCancel,
  handleOnSubmit,
  showAlterPassword,
  typeAccount,
  username,
}) => {
  const validatorPassword = (passwordPropName, shouldBeEqual = false) => ({ getFieldValue }) => {
    const validator = (rule, value) => {
      if (shouldBeEqual) {
        if (!value || getFieldValue(passwordPropName) === value) {
          return Promise.resolve();
        }
        return Promise.reject('Senhas não coincidem!');
      }

      if (value && getFieldValue(passwordPropName) === value) {
        return Promise.reject('A sua nova senha deve ser diferente da sua senha antiga!');
      }
      return Promise.resolve();
    };

    return { validator };
  };

  return (
    <>
      <Row>
        <Col span={12} offset={6} align="center">
        <Title level={3}>Perfil</Title>

          <Card className={styles.cardPerfil}>
            <Avatar size={170} style={{ fontSize: '70px' }}>
              {username.substr(0, 1).toUpperCase()}
            </Avatar>
          </Card>
          <Button
            type="primary"
            onClick={showAlterPassword}
            style={{ width: '220px', marginBottom: '20px' }}
          >
            Alterar senha
          </Button>

          <Form
            form={form}
            layout="vertical"
            className={styles.formPerfil}
            onFinish={handleOnSubmit}
            size={100}
          >
            <Form.Item label="Usuário:">
              <Input readOnly value={username} />
            </Form.Item>
            <Form.Item label="Tipo de conta:">
              <Input readOnly value={typeAccount} />
            </Form.Item>
            {edit && (
              <>
                <Form.Item
                  label="Senha atual:"
                  name="oldPassword"
                  rules={[{ required: true, message: 'Campo obrigatório!' }]}
                >
                  <Input.Password placeholder="Digite a senha" />
                </Form.Item>
                <Form.Item
                  label="Nova senha:"
                  name="newPassword"
                  rules={[
                    validatorPassword('oldPassword'),
                    { required: true, message: 'Campo obrigatório!' },
                  ]}
                >
                  <Input.Password placeholder="Digite a nova senha" />
                </Form.Item>
                <Form.Item
                  label="Confirmar senha:"
                  name="confirmPassword"
                  rules={[
                    validatorPassword('newPassword', true),
                    { required: true, message: 'Campo obrigatório!' },
                  ]}
                >
                  <Input.Password placeholder="Confirme a senha" />
                </Form.Item>
                <Form.Item>
                  <div className={styles.divBtn}>
                    <Button type="danger" className={styles.actionBtn} onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Salvar
                    </Button>
                  </div>
                </Form.Item>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
