import React from 'react';
import { Button, Modal, Form, Select } from 'antd';
import styles from './style.module.css'

const { Option } = Select;

const ModalNewQuotation = ({
  visible,
  handleOk,
  handleCancel,
  onChange,
  onFocus,
  onBlur,
  onSearch,
  form
}) => (
  <Modal visible={visible} footer={null} onFinish={handleOk} closable={false}>
    <h1>Criar nova cotação</h1>
    <Form form={form} layout="vertical" onFinish={handleOk}>
      <Form.Item
        label="Nome do produto:"
        name="productName"
        required
        tooltip="This is a required field"
      >
        <Select
          showSearch
          placeholder="Selecione o produto"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>
      </Form>
      <div className={styles.divBtn}>
          <Button type="danger" className={styles.actionBtn} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Criar
          </Button>
        </div>
  </Modal>
);

export default ModalNewQuotation;
