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

import ModalRegisterSupplyManufacturer from '../ModalRegister'

const { Title } = Typography

const columns = ({ handleClickEditSupplyManufacturer }) => [
  {
    dataIndex: 'manufacturer',
    title: 'Fabricante',
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
            onClick={() => handleClickEditSupplyManufacturer(row)}
            style={{ fontSize: 18 }}
          />
        </Col>
      </Row>
    ),
  },
]

const ManagerSupplyManufacturer = ({
  dataSource,
  formRegister,
  formUpdate,
  handleClickEditSupplyManufacturer,
  handleClickNewSupplyManufacturer,
  handleClickOnCancel,
  handleOnChangeTable,
  handleOnSearch,
  handleSubmitRegister,
  handleSubmitUpdate,
  pagination,
  visibleModalRegister,
  visibleModalUpdate,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false)

  return (
    <>
      <Row gutter={[0, 20]} justify="center">
        <Col>
          <Title level={3}>Gerenciamento de fabricante (Suprimentos)</Title>
        </Col>
      </Row>

      <Row  gutter={[0, 10]} justify="end">
        <Col>
          <Button onClick={() => setVisibleSearch(!visibleSearch)}>
            {visibleSearch ? 'Ocultar' : 'Filtrar'}
          </Button>
          <Button
            onClick={handleClickNewSupplyManufacturer}
            style={{ marginLeft: '5px' }}
          >
            Cadastrar novo fabricante
          </Button>
        </Col>
      </Row>

      {visibleSearch && (
        <Form layout="vertical" onFinish={handleOnSearch}>
          <Row gutter={20}>
            <Col span={14}>
              <Form.Item label="Fabricante" name="manufacturer">
                <Input allowClear placeholder="Buscar por marca" />
              </Form.Item>
            </Col>
            <Col span={8}>
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

      <ModalRegisterSupplyManufacturer
        form={formRegister}
        handleCancel={() => handleClickOnCancel('register')}
        handleSubmit={handleSubmitRegister}
        title="Cadatro fabricante (Suprimentos)"
        visible={visibleModalRegister}
      />

      <ModalRegisterSupplyManufacturer
        form={formUpdate}
        handleCancel={() => handleClickOnCancel('update')}
        handleSubmit={handleSubmitUpdate}
        title="Atualizar fabricante (Suprimentos)"
        visible={visibleModalUpdate}
      />

      <Table
        columns={columns({ handleClickEditSupplyManufacturer })}
        dataSource={dataSource}
        onChange={handleOnChangeTable}
        pagination={pagination}
      />
    </>
  )
}
export default ManagerSupplyManufacturer
