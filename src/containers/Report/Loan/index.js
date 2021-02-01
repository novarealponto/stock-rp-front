import React, { useState } from 'react'
import { map } from 'ramda'
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

const expandedRowRender = ({ product, observation }) => {
  const columns = [
    { dataIndex: 'product', title: 'Produto' },
    { dataIndex: 'observation', title: 'Observação' },
  ]

  return (
    <Table
      columns={columns}
      dataSource={[{ product, observation }]}
      pagination={false}
    />
  )
}

const formItemList = [
  {
    children: <Input allowClear placeholder="Filtrar razão social" />,
    label: 'Razão social',
    name: 'razaoSocial',
    span: 10,
  },
  {
    children: <Input allowClear placeholder="Filtrar técnico" />,
    label: 'Número de série',
    name: 'serialNumber',
    span: 6,
  },
  {
    children: <RangePicker allowClear style={{ width: '100%' }} />,
    label: 'Data',
    name: 'date',
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
const Loan = ({ dataSource, handleSubmitSearch, onChangeTable, pagination }) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  const columns = [
    {
      dataIndex: 'razaoSocial',
      title: 'Razão social',
    },
    {
      dataIndex: 'serialNumber',
      title: 'Número de série',
    },
    {
      dataIndex: 'solicitation',
      title: 'Solicitação',
    },
    {
      dataIndex: 'date',
      title: 'Atendimento',
    },
    {
      dataIndex: 'return',
      title: 'Retorno',
    },
  ]

  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Relatório empréstimo</Title>
        </Col>
      </Row>

      <Row gutter={[0, 20]} justify="end">
        <Button onClick={() => setVisibleSearch(!visibleSearch)}>
          {visibleSearch ? 'Ocultar' : 'Filtrar'}
        </Button>
      </Row>

      {visibleSearch && (
        <Form layout="vertical" onFinish={handleSubmitSearch}>
          <Row gutter={20}>{map(renderFormItem, formItemList)}</Row>
        </Form>
      )}

      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{ expandedRowRender }}
        onChange={onChangeTable}
        pagination={pagination}
      />
    </>
  )
}

export default Loan
