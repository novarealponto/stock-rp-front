import React from 'react'
import { Form, Input, InputNumber, Modal, Switch } from 'antd'

const rules = [{ required: true }]

const ModalRegisterSupplyManufacturer = ({
  form,
  handleCancel,
  handleSubmit,
  title,
  visible,
}) => {
  return (
    <Modal
      okText="Salvar"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title={title}
      visible={visible}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="id" noStyle />
        <Form.Item label="Fabricante" name="manufacturer" rules={rules}>
          <Input placeholder="Digite o fabricante" />
        </Form.Item>
        </Form>
    </Modal>
  )
}

export default ModalRegisterSupplyManufacturer
