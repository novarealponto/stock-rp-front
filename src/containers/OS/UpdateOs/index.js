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
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'

import masks from '../../../utils/masks'
import { validateCNPJ } from '../../../utils/validators'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

const rules = [{ required: true }]

const UpdateOs = ({
  allowChanges,
  form,
  goBack,
  handleSubmit,
  initialValues,
  onChangeStatus,
  onPressEnterTextAreaSerialNumber,
  productList,
  status,
  statusList,
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
      <ArrowLeftOutlined onClick={goBack} />

      <Row justify="center">
        <Col>
          <Title level={3}>Reserva Externo</Title>
        </Col>
      </Row>

      <Form
        form={form}
        initialValues={{ ...initialValues, quantity: 1 }}
        layout="vertical"
        onFinish={(formData) => {
          handleSubmit(formData)
          setMax(1)
          setProductBaseId('')
          setVisibleTextArea(false)
        }}
        validateTrigger="onBlur"
      >
        <Row gutter={10}>
          <Col span={4}>
            <Form.Item label="O.S." name="os">
              <Input placeholder="OS" readOnly />
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item label="Razão Social" name="razaoSocial" rules={rules}>
              <Input placeholder="Digite a razão social" readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item
              label="CNPJ"
              name="cnpj"
              rules={[
                { required: true },
                { validator: (_, value) => validateCNPJ(form, value) },
              ]}
            >
              <Input
                onChange={({ target: { value } }) => masks(form, 'cnpj', value)}
                placeholder="Digite o CNPJ"
                readOnly
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Data de atd." name="date" rules={rules}>
              <DatePicker
                disabled={!allowChanges}
                disabledDate={(current) =>
                  current && current < moment().subtract(1, 'day')
                }
                placeholder="Selecione a Data"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Técnico" name="technician" rules={rules}>
              <Select
                disabled={!allowChanges}
                filterOption={(input, option) =>
                  option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                placeholder="Selecione o Técnico"
                showSearch
              >
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
              <Select onChange={onChangeStatus} placeholder="Selecione um status">
                {map(
                  ({ key, status }) => (
                    <Option key={key} value={status}>
                      {status}
                    </Option>
                  ),
                  statusList
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="Produto" name="product">
              <Select
                onChange={handleChangeProduct}
                placeholder="selecione um produto"
              >
                {map(
                  ({ category, key, max, name, serial }) => (
                    <Option
                      key={key}
                      max={max}
                      serial={category === 'equipamento' ? serial : undefined}
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
          <Col span={2}>
            <Form.Item label="Qtd." name="quantity">
              <InputNumber max={max} min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        {(visibleTextArea || status === 'CONSERTO') && (
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
                      prevValues.quantity !== currentValues.quantity ||
                      prevValues.status !== currentValues.status
                    }
                  >
                    {({ getFieldValue }) => {
                      return (
                        <Form.Item>
                          <Button
                            disabled={
                              !getFieldValue('product') ||
                              !getFieldValue('status')
                            }
                            icon={<PlusOutlined />}
                            style={{ width: '155px' }}
                            onClick={() => {
                              add(
                                {
                                  product: form.getFieldValue('product'),
                                  productBaseId,
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

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.products !== currentValues.products
                }
              >
                {({ getFieldValue }) => {
                  const products = getFieldValue('products')

                  return fields.map((field, idx) => (
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
                          <Form.Item
                            fieldKey={[field.fieldKey, 'technicianReserve']}
                            name={[field.name, 'technicianReserve']}
                            noStyle
                          >
                            {!products[idx].technicianReserve && (
                              <MinusCircleOutlined
                                className={styles.deleteButton}
                                onClick={() => remove(field.name)}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  ))
                }}
              </Form.Item>
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

export default UpdateOs
