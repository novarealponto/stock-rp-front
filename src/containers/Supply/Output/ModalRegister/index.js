import React, { useState } from 'react'
import { Form, Input, InputNumber, Modal, Select } from 'antd'
import { map } from 'ramda'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const rules = [{ required: true }]

const ModalRegisterSupplyOutput = ({
  form,
  handleCancel,
  handleSubmit,
  productList,
  title,
  visible,
}) => {
  const [max, setMax] = useState(1)
  return (
    <Modal
      okText="Salvar"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title={title}
      visible={visible}
      width={650}
    >
      <Form {...layout} form={form} onFinish={handleSubmit}>
        <Form.Item label="Produto" name="productId" rules={rules}>
          <Select
            onChange={(_, { amount }) => setMax(amount)}
            placeholder="Selecione o produto"
          >
            {map(
              ({ id, name, amount }) => (
                <Option key={id} value={id} amount={amount}>
                  {name}
                </Option>
              ),
              productList
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Quantidade" name="quantity" rules={rules}>
          <InputNumber max={max} min={1} />
        </Form.Item>

        <Form.Item label="Solicitante" name="requester" rules={rules}>
          <Input placeholder="Digite o solicitante" />
        </Form.Item>

        <Form.Item label="Email solicitante" name="emailRequester" rules={rules}>
          <Input placeholder="Digite o email solicitante" />
        </Form.Item>

        <Form.Item label="Email responsável" name="emailResponsible">
          <Input placeholder="Digite o email responsável" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalRegisterSupplyOutput
