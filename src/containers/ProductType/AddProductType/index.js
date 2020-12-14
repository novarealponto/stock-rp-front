import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'

const AddProductType = ({ form, handleSubmit }) => {
  return (
    <Form
      form={form}
      name="add productType"
      onFinish={handleSubmit}
      style={{ width: '100%' }}
    >
      <Row gutter={24} justify="space-between">
        <Col flex="auto">
          <Form.Item
            label="Tipo de produto:"
            name="productType"
            rules={[{ required: true }]}
          >
            <Input placeholder="Digite o tipo de produto" />
          </Form.Item>
        </Col>
        <Col flex="80px">
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Salvar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default AddProductType
