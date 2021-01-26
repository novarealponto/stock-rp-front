import React, { useState } from 'react'
import { Button, Drawer, Form, Input, Row } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

import {
  validateConfirmPassword,
  validateNewPassword,
} from '../../utils/validators'

const DrawerChangePassword = ({
  form,
  handleClickLogout,
  handleSubmit,
  initialValues,
  onClose,
  visible,
}) => {
  const [fields, setFields] = useState([])

  const Title = () => (
    <>
      Sair{' '}
      <LogoutOutlined
        size="large"
        onClick={handleClickLogout}
        style={{ cursor: 'pointer' }}
      />
    </>
  )

  return (
    <Drawer
      onClose={onClose}
      placement="right"
      style={{ maxWidth: '500px' }}
      title={<Title />}
      visible={visible}
      width={'100%'}
    >
      <Form
        form={form}
        initialValues={initialValues}
        fields={fields}
        layout="vertical"
        onFinish={handleSubmit}
        validateTrigger="onBlur"
      >
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.currentPassword !== currentValues.currentPassword
          }
        >
          {({ getFieldValue }) => (
            <>
              <Form.Item name="username">
                <Input readOnly />
              </Form.Item>
              <Form.Item
                label="Senha atual"
                name="currentPassword"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Senha atual" type="password" />
              </Form.Item>
              <Form.Item
                label="Nova senha"
                name="newPassword"
                rules={[
                  { required: true },
                  {
                    validator: validateNewPassword({ getFieldValue, setFields }),
                  },
                ]}
              >
                <Input.Password placeholder="Nova senha" type="password" />
              </Form.Item>
              <Form.Item
                label="Confirmar senha"
                name="confirmPassword"
                rules={[
                  { required: true },
                  {
                    validator: validateConfirmPassword({ getFieldValue }),
                  },
                ]}
              >
                <Input.Password placeholder="Confirmar senha" type="password" />
              </Form.Item>
            </>
          )}
        </Form.Item>
        <Row justify="end">
          <Form.Item>
            <Button htmlType="submit">Salvar</Button>
          </Form.Item>
        </Row>
      </Form>
    </Drawer>
  )
}

export default DrawerChangePassword
