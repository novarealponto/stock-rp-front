import React from 'react'
import { Form, InputNumber, Modal, Select } from 'antd'
import { map } from 'ramda'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const rules = [{ required: true }]

const ModalRegisterSupplyEntry = ({
  form,
  handleCancel,
  handleSubmit,
  productList,
  providerList,
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
        <Form.Item label="Produto" name="productId" rules={rules}>
          <Select
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            optionFilterProp="children"
            placeholder="Selecione o produto"
            showSearch
          >
            {map(
              ({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ),
              productList
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Fornecedor" name="providerId" rules={rules}>
          <Select placeholder="Selecione o fornecedor">
            {map(
              ({ id, razaoSocial }) => (
                <Option key={id} value={id}>
                  {razaoSocial}
                </Option>
              ),
              providerList
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Quantidade" name="quantity" rules={rules}>
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label="Preço" name="price" rules={rules}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Desconto" name="discount" rules={rules}>
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalRegisterSupplyEntry
