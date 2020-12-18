import React from 'react'
import { Button, Col, Input, Row, Table, Typography } from 'antd'
import { EditTwoTone } from '@ant-design/icons'

const { Search } = Input
const { Title } = Typography

const columns = (goToUpdateProvider) => [
  {
    dataIndex: 'cnpj',
    title: 'CNPJ',
  },
  {
    dataIndex: 'razaoSocial',
    title: 'Razão Social',
  },
  {
    dataIndex: 'state',
    title: 'UF',
  },
  {
    dataIndex: 'nameContact',
    title: 'Nome',
  },
  {
    dataIndex: 'telphone',
    title: 'Telefone',
  },
  {
    dataIndex: 'action',
    title: 'Ação',
    render: (_, provider) => (
      <EditTwoTone
        onClick={() => goToUpdateProvider(provider)}
        style={{ fontSize: 16 }}
      />
    ),
  },
]

const Manager = ({
  dataSource,
  goToAddProvider,
  goToUpdateProvider,
  handleSearch,
  onChangeTable,
  pagination,
  searching,
}) => {
  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Fornecedores</Title>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col flex="auto">
          <Search
            allowClear
            enterButton
            loading={searching}
            onSearch={handleSearch}
            placeholder="Buscar ..."
          />
        </Col>
        <Col flex="165px">
          <Button onClick={goToAddProvider}>Cadastrar fornecedor</Button>
        </Col>
      </Row>
      <Table
        columns={columns(goToUpdateProvider)}
        dataSource={dataSource}
        loading={searching}
        onChange={onChangeTable}
        pagination={pagination}
      />
    </>
  )
}

export default Manager
