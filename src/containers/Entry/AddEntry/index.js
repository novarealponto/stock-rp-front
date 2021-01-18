import React from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd'
import { map } from 'ramda'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

const renderOption = ({ children, key, value }) => (element) => {
  return (
    <Option key={element[key]} props={element} value={element[value]}>
      {element[children]}
    </Option>
  )
}

const AddEntry = ({
  alllowInsertSerialNumber,
  baseList,
  form,
  handleSubmit,
  onChange,
  onPressEnterTextAreaSerialNumber,
  onSearchProduct,
  onSearchProvider,
  productList,
  providerList,
}) => (
  <>
    <Row justify="center">
      <Title>Nova entrada</Title>
    </Row>

    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={20}>
        <Col span={16}>
          <Form.Item
            label="Produto"
            name="productId"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(_, { props: { serial } }) => onChange(serial)}
              onSearch={onSearchProduct}
              optionFilterProp="children"
              placeholder="Selecione o produto"
              showSearch
            >
              {map(
                renderOption({
                  children: 'name',
                  key: 'id',
                  value: 'id',
                }),
                productList
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Estoque"
            name="stockBase"
            rules={[{ required: true }]}
          >
            <Select placeholder="Selecione a base de estoque">
              {map(
                renderOption({
                  children: 'name',
                  key: 'name',
                  value: 'name ',
                }),
                baseList
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={16}>
          <Form.Item
            label="Fornecedor"
            name="companyId"
            rules={[{ required: true }]}
          >
            <Select
              optionFilterProp="children"
              onSearch={onSearchProvider}
              placeholder="Selecione o Fornecedor"
              showSearch
            >
              {map(
                renderOption({
                  children: 'razaoSocial',
                  key: 'id',
                  value: 'id',
                }),
                providerList
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Quantidade"
            name="amountAdded"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} placeholder="-" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Aguard. análise"
            name="analysis"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.analysis !== currentValues.analysis ||
              prevValues.productId !== currentValues.productId
            }
          >
            {({ getFieldValue }) => {
              return (
                !getFieldValue('analysis') &&
                alllowInsertSerialNumber && (
                  <Form.Item label="Números de série" name="serialNumbers">
                    <TextArea
                      onPressEnter={onPressEnterTextAreaSerialNumber}
                      rows={4}
                    />
                  </Form.Item>
                )
              )
            }}
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Button htmlType="submit" type="primary">
            Salvar
          </Button>
        </Col>
      </Row>
    </Form>
  </>
)

export default AddEntry
