import React from 'react'
import { Button, Form, Input, Row, Typography } from 'antd'

import CardPermissions from '../../../components/CardPermissions'

const { Title } = Typography

const AddTypeAccount = ({ permissions, form , handleSubmit }) => {
  return (
    <Row justify="center">
      <Title level={3}>Novo tipo de conta</Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Tipo de conta: "
          name="typeName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Digite o nome do tipo de conta" />
        </Form.Item>

        <CardPermissions permissions={permissions} />

        <Row justify="end" style={{ marginTop: '20px' }}>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Salvar
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Row>
  )
}

export default AddTypeAccount
