import React from 'react';
import { Button, Form, Select, Modal, Input, Checkbox, Tooltip } from 'antd';
import styles from './style.module.css'

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const ModalNewSolicitation = ({
  visible,
  handleOk,
  handleCancel,
  form,
  onChange,
  onBlur,
  onFocus,
  onSearch,
}) => (
  <Modal visible={visible} footer={null} closable={false}>
    <h1>Solicitação de compra</h1>
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
      <Form.Item label="Quantidade:" required name="quant">
        <Input placeholder="Digite a quantidade" />
      </Form.Item>
      <Form.Item
        label="Solicitante:"
        name="solicitante"
        required
        tooltip="This is a required field"
      >
        <Select
          showSearch
          placeholder="Selecione o solicitante"
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
      <Form.Item>
        <Checkbox onChange={onChange}>Eu mesmo</Checkbox>
        <Tooltip placement="bottom" title={'Caso seja você o solicitante, habilite esta opção.'}>
          <ExclamationCircleOutlined />
        </Tooltip>
      </Form.Item>
      <Form.Item>
        <div className={styles.divBtn}>
          <Button type="danger" className={styles.actionBtn} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </div>
      </Form.Item>
    </Form>
  </Modal>
);

export default ModalNewSolicitation;
