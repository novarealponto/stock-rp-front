import React from 'react'
import { Button, Col, Form, Input, Row, Table, Typography, Select } from 'antd'
import {
  EditTwoTone,
  SearchOutlined,
} from '@ant-design/icons'

const { Option } = Select;
const { Title } = Typography

const columns = ({ handleOnClickEdit }) => [
  {
    dataIndex: 'sku',
    title: 'SKU',
  },
  {
    dataIndex: 'product',
    title: 'Produto',
  },
  {
    dataIndex: 'category',
    title: 'Categoria',
  },
  {
    dataIndex: 'brand',
    title: 'Marca',
  },
  {
    dataIndex: 'type',
    title: 'Tipo',
  },
  {
    dataIndex: 'delete',
    render: (_, row) => (
      <Row>
        <Col span={12}>
          <EditTwoTone
            onClick={() => handleOnClickEdit(row)}
            style={{ fontSize: 18 }}
          />
        </Col>
      </Row>
    ),
  },
]

const ManageProducts = ({
  dataSource,
  handleOnChangeTable,
  handleOnClickCloseSearchForm,
  handleOnClickEdit,
  handleOnClickOpenSearchForm,
  handleOnSearch,
  pagination,
  visibleSearch,
}) => (
  <>
    <Row justify="center">
      <Col>
        <Title level={3}>Gerenciar Produtos</Title>
      </Col>
    </Row>

    <Row justify="end" gutter={[0, 10]}>
      <Col>
        {visibleSearch ? (
          <Button onClick={handleOnClickCloseSearchForm} type="primary">
            Ocultar
          </Button>
        ) : (
          <Button onClick={handleOnClickOpenSearchForm} type="primary">
            Avançado
          </Button>
        )}
      </Col>
    </Row>

    {visibleSearch && (
      <Form onFinish={handleOnSearch}>
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="SKU" name="sku">
              <Input allowClear readOnly placeholder="Buscar por SKU" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Produto" name="product">
              <Input allowClear placeholder="Buscar por produto" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Categoria" name="category">
            <Select
              allowClear
              placeholder="Selecione a categoria"
            >
              <Option value="acessorios">ACESSÓRIOS</Option>
              <Option value="equipamento">EQUIPAMENTO</Option>
              <Option value="peca">PEÇA</Option>
            </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Marca" name="brand">
              <Input allowClear placeholder="Buscar por marca" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Tipo" name="type">      
              <Input allowClear placeholder="Buscar por tipo" />
            </Form.Item>
          </Col>

          <Col span={2}>
            <Button htmlType="submit" icon={<SearchOutlined />}type="primary" />
          </Col>
        </Row>
      </Form>
    )}

    <Table
      columns={columns({ handleOnClickEdit })}
      dataSource={dataSource}
      onChange={handleOnChangeTable}
      pagination={{ ...pagination, showSizeChanger: false }}
    />
  </>
)

export default ManageProducts
