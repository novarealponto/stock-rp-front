import React from 'react'
import { Button, Col, Input, Row, Typography } from 'antd'

import Table from '../../../components/Table'

const { Title } = Typography
const { Search } = Input

const columns = [
  {
    dataIndex: 'typeAccount',
    key: 'typeAccount',
    title: 'Tipo de conta',
  },
]

const Manager = ({ data,
  goToAddTypeAccount,
  handleSearch
}) => {
  return (
    <>
      <Row gutter={[20, 20]} justify="center">
        <Col>
          <Title level={3}>Tipos de conta</Title>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col flex="auto">
          <Search enterButton placeholder="Buscar ..." allowClear onSearch={handleSearch}/>
        </Col>

        <Col flex="180px">
          <Button onClick={goToAddTypeAccount}>Criar novo tipo de conta</Button>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Table
            columns={columns}
            data={data}
            pagination={{}}
            onChange={() => {}}
          />
        </Col>
      </Row>
    </>
  )
}

export default Manager
