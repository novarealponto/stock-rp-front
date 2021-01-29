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

const formItemList = [
  {
    children: <Input allowClear placeholder="Filtrar produto" />,
    label: 'Produto',
    name: 'product',
    span: 14,
  },
  {
    children: <RangePicker allowClear style={{ width: '100%' }} />,
    label: 'Data',
    name: 'date',
    span: 8,
  },
  {
    children: (
      <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
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
const Solds = ({ dataSource, handleSubmitSearch, onChangeTable, pagination }) => {
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
      dataIndex: 'date',
      title: 'Data atualização',
    },
  ]

  const expandedRowRender = ({ status }) => {
    const columns = [
      { dataIndex: 'status', title: 'Status' },
      { dataIndex: 'total', title: 'Total' },
      { dataIndex: 'lastDate', title: 'Última data' },
    ]

    return <Table columns={columns} dataSource={status} pagination={false} />
  }

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

export default Solds
