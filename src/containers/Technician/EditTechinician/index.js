import React from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd'

import styles from './style.module.css'

const { Title } = Typography

const EditTechinician = ({
  carList,
  form,
  formInitialValues,
  onChangeSelecCarList,
  rotation,
  updateTechnician,
}) => {
  return (
    <div className={styles.container}>
      <Title>Técnico</Title>
      <Form
        form={form}
        layout="vertical"
        name="newTechnician"
        onFinish={updateTechnician}
        initialValues={formInitialValues}
      >
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
              <Input placeholder="Digite o nome do técnico" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Validade CNH"
              name="dueDateCnh"
              rules={[{ required: true }]}
            >
              <DatePicker
                className={styles.datePicker}
                placeholder="DD/MM/AAAA"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={10}>
            <Form.Item
              style={{ width: 'calc(100% - 42px)' }}
              name="car"
              label="Carro"
              rules={[{ required: true }]}
            >
              <Select
                allowClear
                onChange={onChangeSelecCarList}
                placeholder="Selecione um carro"
              >
                {carList.map((car) => (
                  <Select.Option key={car.plate} value={car.plate}>
                    {car.model} ({car.plate})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label=" ">
              <strong>Rodízio: </strong>
              <label>{rotation}</label>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item name="external" label="Externo" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label=" " className={styles.formItemButtonSave}>
              <Button type="primary" loading={false} htmlType="submit">
                Atualizar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default EditTechinician
