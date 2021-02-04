import React from 'react'
import { Button, Col, Form, Input, Modal, Row, Table, Typography } from 'antd'

const { Search } = Input
const { Title } = Typography

const columns = [
  {
    dataIndex: 'type',
    key: 'type',
    title: 'Tipo',
  },
]

const ModalNewProductType = ({ closeModal, form, saveModal, visible }) => {
  return (
    <Modal
      onCancel={closeModal}
      onOk={() => form.submit()}
      title="Cadastro de tipo de produto"
      visible={visible}
    >
      <Form form={form} layout="vertical" onFinish={saveModal}>
        <Form.Item
          label="Tipo de produto:"
          name="productType"
          rules={[{ required: true }]}
        >
          <Input placeholder="Digite o tipo de produto" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const Manager = ({
  dataSource,
  closeModalAddProductType,
  formAddProductType,
  handleAddProductType,
  handleSearch,
  onChangeTable,
  openModalAddProductType,
  pagination,
  searching,
  visibleModalAddProductType,
}) => {
  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Tipos de produto</Title>
        </Col>
      </Row>
      <Row gutter={[8, 18]}>
      <ModalNewProductType
        closeModal={closeModalAddProductType}
        form={formAddProductType}
        saveModal={handleAddProductType}
        visible={visibleModalAddProductType}
      />

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
        <Button onClick={openModalAddProductType}>
          Adicionar tipo de produto
        </Button>
      </Col>

      <Col style={{ marginTop: '20px' }} span={24}>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={searching}
          onChange={onChangeTable}
          pagination={pagination}
        />
      </Col>
    </Row>
    </>
  )
}

export default Manager
