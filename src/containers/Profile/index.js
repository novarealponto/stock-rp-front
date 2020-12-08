import React from 'react';
import { 
  Form,
  Button,
  Input, 
  Card, 
  Avatar 
} from 'antd';

import styles from './style.module.css';

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
    <div className={styles.divCard}>
        <h1 className={styles.h1Perfil}>Perfil</h1>
      <div className={styles.divLinhaCardPerfil}>
          <Card className={styles.cardPerfil}>
            <div className={styles.bgWrapperPerfil}>
              <Avatar size={170}>USER</Avatar>
            </div>
          </Card>
          <Button type="primary" onClick={showAlterPassword} style={{ width: '220px', marginBottom: '20px' }}>
            Alterar senha
          </Button>

        <div className={styles.divInputs}>
          <label className={styles.labelInputs}>Usuário:</label>
          <Input className={styles.perfilInputs} readOnly value={username} />

          <label className={styles.labelInputs}>Tipo de conta:</label>
          <Input className={styles.perfilInputs} readOnly value={typeAccount} />
        </div>
        {edit && (
          <Form
            form={form}
            layout="vertical"
            className={styles.formPerfil}
            onFinish={handleOnSubmit}
          >
            <Form.Item label="Senha atual:" name="oldPassword" rules={[{required: true, message: 'Campo obrigatório!'}]}>
              <Input.Password placeholder="Digite a senha" />
            </Form.Item>
            <Form.Item
              label="Nova senha:"
              name="newPassword"
              rules={[validatorPassword('oldPassword'), {required: true, message: 'Campo obrigatório!'}]}
            >
              <Input.Password placeholder="Digite a nova senha" />
            </Form.Item>
            <Form.Item
              label="Confirmar senha:"
              name="confirmPassword"
              rules={[validatorPassword('newPassword'), {required: true, message: 'Campo obrigatório!'}]}
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
          </Form>
        )}
      </div>
    </div>
  );
};

export default Profile;
