import React from 'react';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
} from '@ant-design/icons';
import { Button, Row, Col, Input, Divider } from 'antd';

import styles from './style.module.css';
import TableComponent from '../../../components/Table';

const columns = [
  { title: 'Técnico', dataIndex: 'name', key: 'name' },
  {
    title: 'Externo',
    dataIndex: 'external',
    key: 'external',
    render: (external) =>
      external ? (
        <CheckCircleTwoTone style={{ fontSize: 16 }} twoToneColor="#52c41a" />
      ) : (
        <CloseCircleTwoTone style={{ fontSize: 16 }} twoToneColor="#f21f1f" />
      ),
  },
  { title: 'Placa', dataIndex: 'plate', key: 'plate' },
  { title: 'Validade CNH', dataIndex: 'cnh', key: 'cnh' },
  {
    title: 'Ações',
    dataIndex: 'actions',
    key: 'actions',
    render: () => <EditTwoTone style={{ fontSize: 16 }} onClick={() => {}} />,
  },
];

const Technician = ({ data, avancedSearch, handleClickAvancedSearch }) => {
  return (
    <div className={styles.container}>
      <Row justify="end" gutter={24}>
        <Col>
          <Button onClick={handleClickAvancedSearch}>Avançado</Button>
        </Col>
      </Row>

      {avancedSearch && (
        <Row gutter={24}>
          <Col span={8}>
            <Input />
          </Col>
          <Col span={8}>
            <Input />
          </Col>
          <Col span={8}>
            <Input />
          </Col>
        </Row>
      )}

      <Divider />

      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Technician;
