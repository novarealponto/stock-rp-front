import React from 'react';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
} from '@ant-design/icons';
import { Button, Row, Col, Input, Divider, Form } from 'antd';

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
  { title: 'Validade CNH', dataIndex: 'dueDateCnh', key: 'dueDateCnh' },
  {
    title: 'Ações',
    dataIndex: 'actions',
    key: 'actions',
    render: () => <EditTwoTone style={{ fontSize: 16 }} onClick={() => {}} />,
  },
];

const Technician = ({
  data,
  avancedSearch,
  handleClickAvancedSearch,
  onChange,
  query,
}) => {
  return (
    <div className={styles.container}>
      <Row justify="end" gutter={24}>
        <Col>
          <Button onClick={handleClickAvancedSearch}>Avançado</Button>
        </Col>
      </Row>

      {avancedSearch && (
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Técnico">
                <Input value={query.name} name="name" onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Placa">
                <Input value={query.plate} name="plate" onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Validade CNH">
                <Input
                  value={query.dueDateCnh}
                  name="dueDateCnh"
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}

      <Divider />

      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Technician;
