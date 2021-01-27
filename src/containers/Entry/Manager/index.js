import React from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
  Typography,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker
const { Title } = Typography

const columns = [
  {
    title: 'Produto',
    dataIndex: 'product',
  },
  {
    title: 'Qntd.',
    dataIndex: 'quant',
  },
  {
    title: 'Usuário',
    dataIndex: 'username',
  },
  {
    title: 'Data fe lançamento',
    dataIndex: 'date',
  },
]

const Manager = ({ dataSource, handleOnSearch, onChangeTable, pagination }) => (
  <>
    <Row justify="center">
      <Title level={3}>Gerenciar Entradas</Title>
    </Row>

    <Form layout="vertical" onFinish={handleOnSearch}>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <Form.Item label="Produto" name="product">
            <Input allowClear placeholder="Digite o produto" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Usuário" name="username">
            <Input allowClear placeholder="Digite a usuário" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Data" name="date">
            <RangePicker format="DD/MM/YYYY" placeholder="Digite a data" />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Row justify="end">
            <Form.Item label=" ">
              <Button
                htmlType="submit"
                icon={<SearchOutlined />}
                type="primary"
              />
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>

    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChangeTable}
          pagination={pagination}
        />
      </Col>
    </Row>
  </>
)

export default Manager
