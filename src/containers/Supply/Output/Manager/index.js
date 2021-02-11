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

import ModalRegisterSupplyOutput from '../ModalRegister'

const { Title } = Typography

const columns = [
  {
    dataIndex: 'createdAt',
    title: 'Criado em',
  },
  {
    dataIndex: 'quantity',
    title: 'Quantidade',
  },
  {
    dataIndex: 'product',
    title: 'Produto',
  },
  {
    dataIndex: 'requester',
    title: 'Solicitante',
  },
  {
    dataIndex: 'user',
    title: 'Usuário',
  },
]

const expandedRowRender = (record) => {
  const columns = [
    { dataIndex: 'emailRequester', title: 'Email solicitante' },
    { dataIndex: 'emailResponsible', title: 'Email responsável' },
  ]

  return <Table columns={columns} dataSource={[record]} pagination={false} />
}

const ManagerSupplyOutput = ({
  dataSource,
  formRegister,
  handleClickNewSupplyOutput,
  handleClickOnCancel,
  handleOnChangeTable,
  handleOnSearch,
  handleSubmitRegister,
  pagination,
  productList,
  visibleModalRegister,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  return (
    <>
      <Row gutter={[0, 20]} justify="center">
        <Col>
          <Title level={3}>Gerenciamento de saída (Suprimentos)</Title>
        </Col>
      </Row>

      <Row gutter={[0, 10]} justify="end">
        <Col>
          <Button onClick={() => setVisibleSearch(!visibleSearch)}>
            {visibleSearch ? 'Ocultar' : 'Filtrar'}
          </Button>
          <Button
            onClick={handleClickNewSupplyOutput}
            style={{ marginLeft: '5px' }}
          >
            Cadastrar nova saída
          </Button>
        </Col>
      </Row>

      {visibleSearch && (
        <Form layout="vertical" onFinish={handleOnSearch}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="Produto" name="product">
                <Input allowClear placeholder="Buscar por produto" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Usuário" name="username">
                <Input allowClear placeholder="Buscar por usuário" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Criado em" name="createdAt">
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

      <ModalRegisterSupplyOutput
        form={formRegister}
        handleCancel={handleClickOnCancel}
        handleSubmit={handleSubmitRegister}
        productList={productList}
        title="Cadatro saída (Suprimentos)"
        visible={visibleModalRegister}
      />

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
export default ManagerSupplyOutput
