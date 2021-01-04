import React from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { map } from 'ramda'

import {
  validateCEP,
  validateCNPJ,
  validateEmail,
} from '../../../utils/validators'
import masks from '../../../utils/masks'

const { Title } = Typography

const renderFormItem = (form) => ({ key, label, name, rules, span }) => (
  <Col key={key} span={span}>
    <Form.Item label={label} name={name} rules={rules}>
      <Input onChange={({ target: { value } }) => masks(form, name, value)} />
    </Form.Item>
  </Col>
)

const fieldsForm = (form) => [
  {
    key: 'cnpj',
    label: 'CNPJ',
    name: 'cnpj',
    rules: [
      { required: true },
      { validator: (_, value) => validateCNPJ(form, value) },
    ],
    span: 8,
  },
  {
    key: 'razaoSocial',
    label: 'Razão social',
    name: 'razaoSocial',
    rules: [{ required: true }],
    span: 16,
  },
  {
    key: 'zipCode',
    label: 'CEP',
    name: 'zipCode',
    rules: [
      { required: true },
      { validator: async (_, value) => await validateCEP(form, value) },
    ],
    span: 5,
  },
  {
    key: 'state',
    label: 'UF',
    name: 'state',
    rules: [{ required: true }, { len: 2 }],
    span: 3,
  },
  {
    key: 'city',
    label: 'Cidade',
    name: 'city',
    rules: [{ required: true }],
    span: 16,
  },
  {
    key: 'neighborhood',
    label: 'Bairro',
    name: 'neighborhood',
    rules: [{ required: true }],
    span: 8,
  },
  {
    key: 'street',
    label: 'Logradouro',
    name: 'street',
    rules: [{ required: true }],
    span: 12,
  },
  {
    key: 'number',
    label: 'Número',
    name: 'number',
    rules: [{ required: true }],
    span: 4,
  },
  {
    key: 'complement',
    label: 'Complemento',
    name: 'complement',
    rules: [],
    span: 12,
  },
  {
    key: 'referencePoint',
    label: 'Ponto de referência',
    name: 'referencePoint',
    rules: [],
    span: 12,
  },
  {
    key: 'nameContact',
    label: 'Nome',
    name: 'nameContact',
    rules: [{ required: true }],
    span: 8,
  },
  {
    key: 'email',
    label: 'Email',
    name: 'email',
    rules: [
      { required: true },
      { validator: async (_, value) => await validateEmail(value) },
    ],
    span: 8,
  },
  {
    key: 'telphone',
    label: 'Telefone',
    name: 'telphone',
    rules: [{ required: true }],
    span: 8,
  },
]

const AddProvider = ({ form, handleSubmit }) => {
  return (
    <>
      <Row justify="center">
        <Col>
          <Title>Fornecedor</Title>
        </Col>
      </Row>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        validateTrigger="onBlur"
      >
        <Row gutter={[20, 8]}>{map(renderFormItem(form), fieldsForm(form))}</Row>

        <Row justify="end">
          <Col>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Salvar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default AddProvider
