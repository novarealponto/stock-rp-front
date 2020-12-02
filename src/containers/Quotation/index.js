import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Table, Form } from 'antd';
import styles from './style.module.css';

import ModalNewQuotation from '../../components/ModalNewQuotation';

const columns = [
  {
    title: 'Produtos',
    dataIndex: 'product',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quant',
  },
  {
    title: 'Solicitante',
    dataIndex: 'solicitante',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Data',
    dataIndex: 'date',
  },
];

const Quotation = ({ data, handleOk }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onBlur = () => {
    console.log('blur');
  };

  const onFocus = () => {
    console.log('focus');
  };

  const onSearch = (val) => {
    console.log('search:', val);
  };

  return (
    <div>
      <h1>Cotação</h1>
      <div className={styles.divDireita}>
        <Button type="primary" onClick={showModal}>
          Criar cotação
        </Button>
      </div>
      <ModalNewQuotation
        form={form}
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visible}
        onChange={onChange}
        onBlur={onBlur}
        onSearch={onSearch}
        onFocus={onFocus}
      />
      <Table columns={columns} dataSource={data} size="middle" />
    </div>
  );
};

export default Quotation;
