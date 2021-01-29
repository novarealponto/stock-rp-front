import React, { useState } from 'react'
import { map } from 'ramda'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker
const { Title } = Typography

const formItemList = ({ technicianList }) => [
  {
    children: <Input allowClear placeholder="Filtrar produto" />,
    label: 'Produto',
    name: 'product',
    span: 10,
  },
  {
    children: <RangePicker allowClear style={{ width: '100%' }} />,
    label: 'Data',
    name: 'date',
    span: 6,
  },
  {
    children: (
      <Select allowClear placeholder="Filtrar técnico">
        {map(
          ({ id, name }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ),
          technicianList
        )}
      </Select>
    ),
    label: 'Técnico',
    name: 'technician',
    span: 6,
  },
  {
    children: (
      <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
    ),
    label: ' ',
    name: 'submit',
    span: 2,
  },
]

const renderFormItem = ({ children, label, name, span }) => (
  <Col key={name} span={span}>
    <Form.Item label={label} name={name}>
      {children}
    </Form.Item>
  </Col>
)
const Missout = ({
  dataSource,
  handleSubmitSearch,
  pagination,
  technicianList,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  const columns = [
    {
      dataIndex: 'product',
      title: 'Produto',
    },
    {
      dataIndex: 'quantity',
      title: 'Qntd.',
    },
    {
      dataIndex: 'technician',
      title: 'Técnico',
    },
    {
      dataIndex: 'date',
      title: 'Data',
    },
    {
      dataIndex: 'os',
      title: 'OS',
    },
  ]

  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Relatório perda</Title>
        </Col>
      </Row>

      <Row gutter={[0, 20]} justify="end">
        <Button onClick={() => setVisibleSearch(!visibleSearch)}>
          {visibleSearch ? 'Ocultar' : 'Filtrar'}
        </Button>
      </Row>

      {visibleSearch && (
        <Form layout="vertical" onFinish={handleSubmitSearch}>
          <Row gutter={20}>
            {map(renderFormItem, formItemList({ technicianList }))}
          </Row>
        </Form>
      )}

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      />
    </>
  )
}

export default Missout
