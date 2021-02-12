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
import { EditTwoTone, SearchOutlined } from '@ant-design/icons'

import ModalRegisterSupplyProduct from '../ModalRegister'

const { Title } = Typography

const columns = ({ handleClickEditSupplyProduct }) => [
  {
    dataIndex: 'code',
    title: 'Código',
  },
  {
    dataIndex: 'product',
    title: 'Produto',
  },
  {
    dataIndex: 'manufacturer',
    title: 'Fabricante',
  },
  {
    dataIndex: 'minimumQuantity',
    title: 'Qntd. min',
  },
  {
    dataIndex: 'createdAt',
    title: 'Criado em',
  },
  {
    dataIndex: 'edit',
    render: (_, row) => (
      <Row>
        <Col span={12}>
          <EditTwoTone
            onClick={() => handleClickEditSupplyProduct(row)}
            style={{ fontSize: 18 }}
          />
        </Col>
      </Row>
    ),
  },
]

const ManagerSupplyProduct = ({
  dataSource,
  formRegister,
  formUpdate,
  handleClickEditSupplyProduct,
  handleClickNewSupplyProduct,
  handleClickOnCancel,
  handleOnChangeTable,
  handleOnSearch,
  handleSubmitRegister,
  handleSubmitUpdate,
  manufacturerList,
  pagination,
  visibleModalRegister,
  visibleModalUpdate,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  return (
    <>
      <Row gutter={[0, 20]} justify="center">
        <Col>
          <Title level={3}>Gerenciamento de produto (Suprimentos)</Title>
        </Col>
      </Row>

      <Row  gutter={[0, 10]} justify="end">
        <Col>
          <Button onClick={() => setVisibleSearch(!visibleSearch)}>
            {visibleSearch ? 'Ocultar' : 'Filtrar'}
          </Button>
          <Button
            onClick={handleClickNewSupplyProduct}
            style={{ marginLeft: '5px' }}
          >
            Cadastrar novo produto
          </Button>
        </Col>
      </Row>

      {visibleSearch && (
        <Form layout="vertical" onFinish={handleOnSearch}>
          <Row gutter={20}>
            <Col span={4}>
              <Form.Item label="Código" name="code">
                <Input allowClear placeholder="Buscar por SKU" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Produto" name="product">
                <Input allowClear placeholder="Buscar por produto" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Fabricante" name="manufacturer">
                <Input allowClear placeholder="Buscar por marca" />
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

      <ModalRegisterSupplyProduct
        form={formRegister}
        handleCancel={() => handleClickOnCancel('register')}
        handleSubmit={handleSubmitRegister}
        manufacturerList={manufacturerList}
        title="Cadatro produto (Suprimentos)"
        visible={visibleModalRegister}
      />

      <ModalRegisterSupplyProduct
        form={formUpdate}
        handleCancel={() => handleClickOnCancel('update')}
        handleSubmit={handleSubmitUpdate}
        manufacturerList={manufacturerList}
        title="Atualizar produto (Suprimentos)"
        visible={visibleModalUpdate}
      />

      <Table
        columns={columns({ handleClickEditSupplyProduct })}
        dataSource={dataSource}
        onChange={handleOnChangeTable}
        pagination={pagination}
      />
    </>
  )
}
export default ManagerSupplyProduct
