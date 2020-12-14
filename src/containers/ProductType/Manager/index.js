import React from 'react'
import { Button, Col, Input, Row, Table, Typography } from 'antd'
import { EditTwoTone } from '@ant-design/icons'

const { Search } = Input
const { Title } = Typography

const columns = (goToUpdateProductType) => [
  {
    dataIndex: 'type',
    key: 'type',
    title: 'Type',
  },
  {
    render: updateUserButton(goToUpdateProductType),
    title: 'Ações',
  },
]

const updateUserButton = (goToUpdateProductType) => (_, productType) => (
  <EditTwoTone
    onClick={() => goToUpdateProductType(productType)}
    style={{ fontSize: '20px', color: '#08c' }}
  />
)

const Manager = ({
  dataSource,
  goToAddProductType,
  goToUpdateProductType,
  handleSearch,
  onChangeTable,
  pagination,
  searching,
}) => {
  return (
    <Row gutter={20}>
      <Col span={24}>
        <Title>Tipos de produto</Title>
      </Col>

      <Col flex="auto">
        <Search
          allowClear
          enterButton
          loading={searching}
          onSearch={handleSearch}
          placeholder="Buscar ..."
        />
      </Col>

      <Col flex="90px">
        <Button onClick={goToAddProductType}>Adicionar tipo de produto</Button>
      </Col>

      <Col style={{ marginTop: '20px' }} span={24}>
        <Table
          columns={columns(goToUpdateProductType)}
          dataSource={dataSource}
          loading={searching}
          onChange={onChangeTable}
          pagination={pagination}
        />
      </Col>
    </Row>
  )
}

export default Manager
