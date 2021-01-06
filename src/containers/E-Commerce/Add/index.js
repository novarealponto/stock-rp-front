import React from 'react'
import {
  Button,
  Col,
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
import styles from './style.module.css'
import { validateCPFOrCNPJ } from '../../../utils/validators'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

const renderListProducts = (remove) => (field) => {
  return (
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
  )
}

const ECommerce = ({
  form,
  handleChangeProduct,
  hanldeOnSubmit,
  max,
  onPressEnterTextAreaSerialNumber,
  productBaseId,
  productList,
  visibleTextArea,
}) => {
  return (
    <>
      <Row gutter={[0, 20]} justify="center">
        <Col>
          <Title level={3}>Reserva E-Commerce</Title>
        </Col>
      </Row>

      <Form
        form={form}
        initialValues={{ quantity: 1 }}
        layout="vertical"
        onFinish={hanldeOnSubmit}
        validateTrigger="onBlur"
      >
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item
              label="Código de rastreio"
              name="trackingCode"
              rules={[{ required: true }]}
            >
              <Input placeholder="digite o código de rastreio" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nome ou razão social"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="digite o nome ou a razao social" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="CPF ou CNPJ"
              name="cnpjOrCpf"
              rules={[
                { required: true },
                { validator: (_, value) => validateCPFOrCNPJ(form, value) },
              ]}
            >
              <Input
                onChange={({ target: { value } }) =>
                  masks(form, 'cnpjOrCpf', value)
                }
                placeholder="digite o CPF ou CNPJ"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row justify="center">
          <Col>
            <Title level={4}>Reservar item</Title>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={21}>
            <Form.Item label="Nome do produto" name="product">
              <Select
                onChange={handleChangeProduct}
                placeholder="selecione um produto"
              >
                {map(
                  ({ key, max, name, serial }) => (
                    <Option key={key} max={max} serial={serial} value={name}>
                      {name}
                    </Option>
                  ),
                  productList
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
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
                            disabled={!getFieldValue('product')}
                            icon={<PlusOutlined />}
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

              {map(renderListProducts(remove), fields)}
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

export default ECommerce
