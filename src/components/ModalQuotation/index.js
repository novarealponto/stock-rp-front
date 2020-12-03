import React from 'react';
import { Button, Modal, Form, Input } from 'antd'
import styles from './style.module.css'

const ModalQuotation = ({
  visible,
  handleOk,
  handleCancel,
  form
}) => (
  <Modal
    visible={visible}
    footer={null}
    closable={false}
  >
    <h1>Vincular a uma cotação</h1>
    <h4>Existe 3 cotações criadas, deseja vincular esse item para alguma cotação?</h4>

    <Form
      form={form}
      layout="vertical"
      onFinish={handleOk}
    >
      <Form.Item
        label="Cotação:"
        required name="cotacao"
      >
        <Input placeholder="Digite a cotação" />
      </Form.Item>

      <h2>Display Prisma Super Fácil</h2>

      <div className={styles.divBtn}>
        <Button
          type="danger"
          className={styles.actionBtn}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          htmlType="submit"
        >
          Vincular
        </Button>
      </div>
    </Form>
  </Modal>
);

export default ModalQuotation;
