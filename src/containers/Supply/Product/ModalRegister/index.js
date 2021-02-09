import React from 'react'
import { Form, Input, InputNumber, Modal, Select, Switch } from 'antd'
import { map } from 'ramda'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const unitList = [
  {
    value: 'UNID',
    children: 'Unidade',
  },
  {
    value: 'PÇ',
    children: 'Peça',
  },
  {
    value: 'CX',
    children: 'Caixa',
  },
  {
    value: 'LT',
    children: 'Litro',
  },
]

const rules = [{ required: true }]

const ModalRegisterSupplyProduct = ({
  form,
  handleCancel,
  handleSubmit,
  manufacturerList,
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
      <Form {...layout} form={form} onFinish={handleSubmit}>
        <Form.Item name="id" noStyle />
        <Form.Item label="Produto" name="product" rules={rules}>
          <Input placeholder="Digite o produto" />
        </Form.Item>
        <Form.Item label="Unidade" name="unit" rules={rules}>
          <Select placeholder="Selecione a unidade de medida">
            {map(
              ({ children, value }) => (
                <Option key={value} value={value}>
                  {children}
                </Option>
              ),
              unitList
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Fabricante" name="manufacturerId" rules={rules}>
          <Select placeholder="Selecione o fabricante">
            {map(
              ({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ),
              manufacturerList
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Qntd. min." name="minimumQuantity" rules={rules}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="Exporádico" name="exporadic" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalRegisterSupplyProduct
