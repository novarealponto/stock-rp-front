import React from 'react';
import { Button, Modal } from 'antd';
import styles from './style.module.css'

const ModalNewQuotation = ({
  visible,
  handleOk,
  handleCancel,
}) => (
  <Modal visible={visible} footer={null} onFinish={handleOk} closable={false}>
    <h1>Criar cotação</h1>
    <h4>Não existe nenhuma cotação criada, deseja criar uma cotação para este item?</h4>

    <h2>Display Prisma Super Fácil</h2>

    <div className={styles.divBtn}>
      <Button type="danger" className={styles.actionBtn} onClick={handleCancel}>Cancelar</Button>
      <Button type="primary" htmlType="submit">Criar</Button>
    </div>
  </Modal>
);

export default ModalNewQuotation;
