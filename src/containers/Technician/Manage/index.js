import React from 'react'
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, Row } from 'antd'

import styles from './style.module.css'
import TableComponent from '../../../components/Table'

const Technician = ({
  avancedSearch,
  data,
  formQuery,
  goToUpdateTechnician,
  goAddTechnician,
  handleClickAvancedSearch,
  handleSubmitFormQuery,
  pagination,
  onChangeTable,
}) => {
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Técnico',
    },
    {
      dataIndex: 'external',
      key: 'external',
      render: (external) =>
        external ? (
          <CheckCircleTwoTone style={{ fontSize: 16 }} twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone style={{ fontSize: 16 }} twoToneColor="#f21f1f" />
        ),
      title: 'Externo',
    },
    {
      dataIndex: 'plate',
      key: 'plate',
      title: 'Placa',
    },
    {
      dataIndex: 'dueDateCnh',
      key: 'dueDateCnh',
      title: 'Validade CNH',
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      render: (_, technician) => {
        return (
          <EditTwoTone
            style={{ fontSize: 16 }}
            onClick={() => goToUpdateTechnician(technician)}
          />
        )
      },
      title: 'Ações',
    },
  ]

  return (
    <div className={styles.container}>
      <Row justify="end" gutter={24}>
        <Col>
          <Button onClick={handleClickAvancedSearch}>Filtrar</Button>
          <Button type="primary" onClick={goAddTechnician}>
            Cadastrar um novo Técnico
          </Button>
        </Col>
      </Row>

      {avancedSearch && (
        <Form
          form={formQuery}
          initialValues={{
            name: '',
            dueDateCnh: '',
            plate: '',
          }}
          layout="vertical"
          onFinish={handleSubmitFormQuery}
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item label="Técnico" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Placa" name="plate">
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Validade CNH" name="dueDateCnh">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label=" ">
                <Button
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ width: '100%' }}
                  type="primary"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}

      <Divider />

      <TableComponent
        columns={columns}
        data={data}
        onChange={onChangeTable}
        pagination={pagination}
      />
    </div>
  )
}

export default Technician
