import React from 'react'
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Form,
  Row,
  Select,
  Space,
  InputNumber,
  Typography,
} from 'antd'
import { map } from 'ramda'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
}

const Manager = ({
  technicianList,
  statusList,
  productList,
  visibleTextArea,
  handleChangeProduct,
}) => {
  const [form] = Form.useForm()
  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Reserva Externo</Title>
        </Col>
      </Row>

      <Form
        layout="vertical"
        form={form}
        initialValues={{ quantity: 1 }}
        onFinish={console.log}
      >
        <Row>
          <Col span={24}>
            <Form.Item label="Razão Social">
              <Input placeholder="Digite a razão social" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="CNPJ">
              <Input placeholder="Digite o CNPJ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Data de atd.">
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Selecione a Data"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Técnico">
              <Select placeholder="Selecione o Técnico">
                {map(
                  ({ key, name }) => (
                    <Option key={key} value={key}>
                      {name}
                    </Option>
                  ),
                  technicianList
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row justify="center">
          <Col>
            <Title level={4}>Reservar peça</Title>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={8}>
            <Form.Item label="Status" name="status">
              <Select placeholder="Selecione/digite um status">
                {map(
                  ({ key, status }) => (
                    <Option key={key} value={key}>
                      {status}
                    </Option>
                  ),
                  statusList
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name="product" label="Nome do produto">
              <Select
                placeholder="selecione um produto"
                onChange={handleChangeProduct}
              >
                {map(
                  ({ key, name, serial }) => (
                    <Option key={key} value={name} serial={serial}>
                      {name}
                    </Option>
                  ),
                  productList
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Qtd." name="quantity">
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        {visibleTextArea && (
          <Form.Item label="Números de série" name="serialNumbers">
            <TextArea rows={4} />
          </Form.Item>
        )}

        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              <Row justify="end">
                <Col>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.product !== currentValues.product ||
                      prevValues.quantity !== currentValues.quantity ||
                      prevValues.status !== currentValues.status
                    }
                  >
                    {({ getFieldValue }) => {
                      return (
                        !!getFieldValue('product') &&
                        !!getFieldValue('status') && (
                          <Form.Item>
                            <Button
                              type="primary"
                              onClick={() => {
                                add(
                                  {
                                    product: form.getFieldValue('product'),
                                    status: form.getFieldValue('status'),
                                    quantity: form.getFieldValue('quantity'),
                                    serialNumbers: form.getFieldValue(
                                      'serialNumbers'
                                    ),
                                  },
                                  0
                                )
                                form.setFieldsValue({
                                  product: undefined,
                                  quantity: 1,
                                  serialNumbers: undefined,
                                  status: undefined,
                                })
                              }}
                              icon={<PlusOutlined />}
                            >
                              Adicionar
                            </Button>
                          </Form.Item>
                        )
                      )
                    }}
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              {fields.map((field, index) => (
                <Form.Item required={false} key={field.key}>
                  <Row>
                    <Col flex="auto">
                      <Row gutter={10}>
                        <Col span={20}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'product']}
                            fieldKey={[field.fieldKey, 'product']}
                            noStyle
                          >
                            <Input placeholder="produto" readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'quantity']}
                            fieldKey={[field.fieldKey, 'quantity']}
                            noStyle
                          >
                            <InputNumber placeholder="quantidade" readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col flex="50px">
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                  <Form.Item
                    {...field}
                    name={[field.name, 'serialNumbers']}
                    fieldKey={[field.fieldKey, 'serialNumbers']}
                    noStyle
                  />
                  <Form.Item
                    {...field}
                    name={[field.name, 'status']}
                    fieldKey={[field.fieldKey, 'status']}
                    noStyle
                  />
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Manager
