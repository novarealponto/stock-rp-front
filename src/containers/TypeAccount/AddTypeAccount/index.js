import React from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'

import CardPermissions from '../../../components/CardPermissions'

const { Title } = Typography

const AddTypeAccount = ({ permissions }) => {
  return (
    <Row justify="center">
      <Col>
        <Title level={3}>Novo tipo de conta</Title>
      </Col>
      <Form>
        <Col span={24}>
          <Form.Item
            label="Tipo de conta: "
            name="type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <CardPermissions permissions={permissions} />
        </Col>
        <Row justify="end" style={{ marginTop: '20px'}}>
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
