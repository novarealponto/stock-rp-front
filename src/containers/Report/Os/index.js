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

const columns = [
  {
    dataIndex: 'os',
    title: 'OS',
  },
  {
    dataIndex: 'razaoSocial',
    title: 'Razão social',
  },
  {
    dataIndex: 'technician',
    title: 'Técnico',
  },
  {
    dataIndex: 'date',
    title: 'Data',
  },
]

const expandedRowRender = ({ products }) => {
  const columns = [
    { dataIndex: 'product', title: 'Produto' },
    { dataIndex: 'status', title: 'Status' },
    { dataIndex: 'reserve', title: 'Reserva' },
    { dataIndex: 'missout', title: 'Perda' },
    { dataIndex: 'output', title: 'Saída' },
    { dataIndex: 'missout', title: 'Retorno' },
  ]

  return <Table columns={columns} dataSource={products} pagination={false} />
}

const formItemList = ({ statusList, technicianList }) => [
  {
    children: <Input allowClear placeholder="Filtrar os" />,
    label: 'OS',
    name: 'os',
    span: 4,
  },
  {
    children: <Input allowClear placeholder="Filtrar razão social" />,
    label: 'Razão social',
    name: 'razaoSocial',
    span: 10,
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
    span: 10,
  },
  {
    children: <Input allowClear placeholder="Filtrar produto" />,
    label: 'Produto',
    name: 'product',
    span: 8,
  },
  {
    children: <RangePicker allowClear style={{ width: '100%' }} />,
    label: 'Data',
    name: 'date',
    span: 7,
  },
  {
    children: (
      <Select allowClear placeholder="Filtrar status">
        {map(
          ({ id, status }) => (
            <Option key={id} value={id}>
              {status}
            </Option>
          ),
          statusList
        )}
      </Select>
    ),
    label: 'Status',
    name: 'status',
    span: 7,
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

const ReportOS = ({
  handleSubmitSearch,
  onChangeTable,
  osList,
  statusList,
  technicianList,
  pagination,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Relatório Os</Title>
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
            {map(renderFormItem, formItemList({ statusList, technicianList }))}
          </Row>
        </Form>
      )}

      <Table
        columns={columns}
        dataSource={osList}
        expandable={{ expandedRowRender }}
        onChange={onChangeTable}
        pagination={pagination}
      />
    </>
  )
}

export default ReportOS
