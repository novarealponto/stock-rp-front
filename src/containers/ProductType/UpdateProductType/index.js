import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'

const UpdateProductType = ({ form, handleSubmit, initialValues }) => {
  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="add productType"
      onFinish={handleSubmit}
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
              Atualizar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default UpdateProductType
