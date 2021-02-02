import React, { useState } from 'react'
import moment from 'moment'
import styles from './style.module.css'
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd'
import { map } from 'ramda'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

const rules = [{ required: true }]

const AddReception = ({
  form,
  handleSubmit,
  onPressEnterTextAreaSerialNumber,
  productList,
  technicianList,
}) => {
  const [max, setMax] = useState(1)
  const [productBaseId, setProductBaseId] = useState('')
  const [visibleTextArea, setVisibleTextArea] = useState(false)

  const handleChangeProduct = (_, { key, max, serial }) => {
    setMax(max)
    setProductBaseId(key)
    setVisibleTextArea(serial)
  }

  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Reserva recepção</Title>
        </Col>
      </Row>

      <Form
        form={form}
        initialValues={{ quantity: 1 }}
        layout="vertical"
        onFinish={(formData) => {
          handleSubmit(formData)
          setMax(1)
          setProductBaseId('')
          setVisibleTextArea(false)
        }}
        validateTrigger="onBlur"
      >
        <Row>
          <Col span={24}>
            <Form.Item label="Razão Social" name="razaoSocial" rules={rules}>
              <Input placeholder="Digite a razão social" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10} justify="space-between">
          <Col span={8}>
            <Form.Item label="Data de atendimento" name="date" rules={rules}>
              <DatePicker
                disabledDate={(current) =>
                  current && current < moment().subtract(1, 'day')
                }
                placeholder="Selecione a data"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Técnico" name="technician" rules={rules}>
              <Select placeholder="Selecione o técnico">
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
          <Col span={20}>
            <Form.Item label="Produto" name="product">
              <Select
                onChange={handleChangeProduct}
                placeholder="Selecione um produto"
              >
                {map(
                  ({ key, max, name, serial }) => (
                    <Option
                      key={key}
                      max={max}
                      serial={serial ? 'true' : undefined}
                      value={name}
                    >
                      {name}
                    </Option>
                  ),
                  productList
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Qtd." name="quantity">
              <InputNumber max={max} min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        {visibleTextArea && (
          <Form.Item label="Números de série" name="serialNumbers">
            <TextArea
              onPressEnter={(event) =>
                onPressEnterTextAreaSerialNumber({ ...event, max })
              }
              rows={3}
            />
          </Form.Item>
        )}
        <Form.List
          name="products"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error('Insira ao menos um item'))
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <Row justify="end">
                <Col>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.product !== currentValues.product ||
                      prevValues.quantity !== currentValues.quantity
                    }
                  >
                    {({ getFieldValue }) => {
                      return (
                        <Form.Item>
                          <Button
                            icon={<PlusOutlined />}
                            disabled={!getFieldValue('product')}
                            style={{ width: '155px' }}
                            onClick={() => {
                              add(
                                {
                                  product: form.getFieldValue('product'),
                                  productBaseId,
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
                              })
                            }}
                            type="primary"
                          >
                            Adicionar
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      )
                    }}
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              {fields.map((field) => (
                <Form.Item key={field.key} required={false}>
                  <Row>
                    <Col flex="auto">
                      <Row gutter={10}>
                        <Col span={21}>
                          <Form.Item
                            fieldKey={[field.fieldKey, 'product']}
                            name={[field.name, 'product']}
                            noStyle
                          >
                            <Input placeholder="produto" readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={3}>
                          <Form.Item
                            fieldKey={[field.fieldKey, 'quantity']}
                            name={[field.name, 'quantity']}
                            noStyle
                          >
                            <InputNumber placeholder="quantidade" readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col flex="50px">
                      <MinusCircleOutlined
                        className={styles.deleteButton}
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>

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

export default AddReception
