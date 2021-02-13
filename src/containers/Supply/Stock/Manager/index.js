import React, { useState } from 'react'
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

const { Title } = Typography

const columns = [
  {
    dataIndex: 'product',
    title: 'Produto',
  },
  {
    dataIndex: 'quantity',
    title: 'Quantidade',
  },
  {
    dataIndex: 'updatedAt',
    title: 'Atualizado em',
  },
]

const expandedRowRender = ({ outputs }) => {
  const columns = [
    { dataIndex: 'razaoSocial', title: 'Razão social' },
    { dataIndex: 'quantity', title: 'Qntd.' },
    { dataIndex: 'date', title: 'Data' },
  ]

  return <Table columns={columns} dataSource={outputs} pagination={false} />
}

const ManagerSupplyStock = ({
  dataSource,
  handleOnChangeTable,
  handleOnSearch,
  pagination,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  return (
    <>
      <Row gutter={[0, 20]} justify="center">
        <Col>
          <Title level={3}>Gerenciamento de estoque (Suprimentos)</Title>
        </Col>
      </Row>

      <Row gutter={[0, 10]} justify="end">
        <Col>
          <Button onClick={() => setVisibleSearch(!visibleSearch)}>
            {visibleSearch ? 'Ocultar' : 'Filtrar'}
          </Button>
        </Col>
      </Row>

      {visibleSearch && (
        <Form layout="vertical" onFinish={handleOnSearch}>
          <Row gutter={20}>
            <Col span={14}>
              <Form.Item label="Produto" name="product">
                <Input allowClear placeholder="Buscar por produto" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Atualizado em" name="updatedAt">
                <DatePicker.RangePicker />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item label=" ">
                <Button
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{ expandedRowRender }}
        onChange={handleOnChangeTable}
        pagination={pagination}
      />
    </>
  )
}
export default ManagerSupplyStock
