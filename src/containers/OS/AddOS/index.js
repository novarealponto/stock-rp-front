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

import masks from '../../../utils/masks'
import { validateCNPJ } from '../../../utils/validators'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

const rules = [{ required: true }]

const AddOutput = ({
  form,
  handleSubmit,
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
  const [category, setCategory] = useState('')

  const handleChangeProduct = (_, { key, max, serial, category }) => {
    setMax(max)
    setProductBaseId(key)
    setVisibleTextArea(serial)
    setCategory(category)
  }

  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Saídas</Title>
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
        <Row gutter={10}>
          <Col span={16}>
            <Form.Item label="Razão Social" name="razaoSocial" rules={rules}>
              <Input placeholder="Digite a razão social" />
            </Form.Item>
          </Col>
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
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Código de rastreamento" name="trackId">
              <Input placeholder="Digite o código de rastreamento" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Data de atd." name="date" rules={rules}>
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
              <Select
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                placeholder="Selecione o técnico"
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
                placeholder="Selecione um produto"
              >
                {map(
                  ({ category, key, max, name, serial }) => (
                    <Option
                      key={key}
                      max={max}
                      serial={serial}
                      category={category}
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

        {((visibleTextArea &&
          (category === 'equipamento' ||
            status === 'ECOMMERCE' ||
            status === 'CORREIOS' ||
            status === 'RECEPÇÃO')) ||
          status === 'CONSERTO') && (
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
                            icon={<PlusOutlined />}
                            disabled={
                              !getFieldValue('product') ||
                              !getFieldValue('status')
                            }
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

export default AddOutput
