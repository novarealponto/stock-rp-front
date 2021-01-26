import React from 'react'
import { applySpec, filter, length, map, pathOr } from 'ramda'
import {
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd'

const { Text } = Typography
const { Option } = Select

const bodyStyle = (condition) =>
  condition
    ? {
        border: '1px solid #1890ff',
        backgroundColor: 'rgba(0, 14, 189, 0.05)',
        borderRadius: '5px',
      }
    : {}

const CurrentList = ({
  current,
  fields,
  handleClickCardOs,
  handleClickCardProducts,
  osList,
  osSelected,
  products,
  productsSelected,
}) => {
  return [
    <Row gutter={[0, 15]}>
      {map(
        ({ id, os, razaoSocial }) => (
          <Col span={24} key={id}>
            <Card
              bodyStyle={bodyStyle(osSelected === id)}
              onClick={() => handleClickCardOs(id)}
            >
              <Row>
                <Col span={4}>
                  <Text>{os}</Text>
                </Col>

                <Col span={20}>
                  <Text>{razaoSocial}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        ),
        osList
      )}
    </Row>,
    <Row gutter={[0, 15]}>
      {map(
        ({ amount, id, osPartId, product, serial, serialNumbers }) => (
          <Col span={24} key={id}>
            <Card
              bodyStyle={bodyStyle(
                length(filter((item) => item.id === id, productsSelected))
              )}
              onClick={() =>
                handleClickCardProducts({
                  amount,
                  id,
                  osPartId,
                  product,
                  serial,
                  serialNumbers,
                })
              }
            >
              <Row>
                <Col span={4}>
                  <Text>{amount}</Text>
                </Col>

                <Col span={20}>
                  <Text>{product}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        ),
        products
      )}
    </Row>,
    <Row gutter={[0, 15]}>
      {map(
        (field) => (
          <Col key={field.id} span={24}>
            <Card>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.products !== currentValues.products
                }
              >
                {({ getFieldValue }) => {
                  const row = applySpec({
                    max: pathOr(0, [field.name, 'max']),
                    product: pathOr('', [field.name, 'product']),
                    serial: pathOr(false, [field.name, 'serial']),
                    serialNumbersList: pathOr(
                      [],
                      [field.name, 'serialNumbersList']
                    ),
                  })(getFieldValue('products'))

                  return (
                    <Row>
                      <Col span={18}>{row.product}</Col>
                      <Col span={6}>
                        {row.serial ? (
                          <Form.Item
                            fieldKey={[field.name, 'serialNumbers']}
                            name={[field.name, 'serialNumbers']}
                            noStyle
                          >
                            <Select
                              style={{ width: '100%', minWidth: '100px' }}
                              mode="tags"
                              tokenSeparators={[',']}
                            >
                              {row.serialNumbersList.map((serialNumber) => (
                                <Option key={serialNumber} value={serialNumber}>
                                  {serialNumber}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        ) : (
                          <Row justify="end">
                            <Form.Item
                              fieldKey={[field.name, 'amount']}
                              name={[field.name, 'amount']}
                              noStyle
                            >
                              <InputNumber max={row.max} min={0} />
                            </Form.Item>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  )
                }}
              </Form.Item>
            </Card>
          </Col>
        ),
        fields
      )}
    </Row>,
  ][current]
}

export default CurrentList
