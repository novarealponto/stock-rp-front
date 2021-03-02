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

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input
const formRequireRules = [
  {
    message: 'Este campo é obrigatório!',
    required: true,
  },
]

const EditProduct = ({
  form,
  handleSubmit,
  initialValues,
  marksList,
  typesList,
}) => (
  <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
    <Row justify="center">
      <Col>
        <Title level={3}>Atualizar Produto</Title>
      </Col>
    </Row>
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <Form.Item label="Produto" name="name" rules={formRequireRules}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Categoria" name="category" rules={formRequireRules}>
          <Select placeholder="Selecione a categoria">
            <Option value="acessorios">ACESSÓRIOS</Option>
            <Option value="equipamento">EQUIPAMENTO</Option>
            <Option value="peca">PEÇA</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Marca" name="mark" rules={formRequireRules}>
          <Select
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            optionFilterProp="children"
            placeholder="Selecione a marca"
            showSearch
          >
            {marksList &&
              marksList.map((item) => (
                <Option key={item.mark} value={item.mark}>
                  {item.mark}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Tipo" name="type" rules={formRequireRules}>
          <Select
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            optionFilterProp="children"
            placeholder="Selecione o tipo"
            showSearch
          >
            {typesList &&
              typesList.map((item) => (
                <Option key={item.type} value={item.type}>
                  {item.type}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label="Quant. min"
          name="minimumStock"
          rules={formRequireRules}
        >
          <InputNumber min={1} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label="Número de série:"
          name="serialNumber"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Descrição" name="description">
          <TextArea autosize={{ minRows: 2, maxRows: 4 }} rows={4} />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Corredor" name="corredor">
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Coluna" name="coluna">
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Prateleira" name="prateleira">
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Gaveta" name="gaveta">
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row justify="end">
      <Col>
        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ marginTop: '20px' }}>
            Atualizar
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
)

export default EditProduct
