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
import { PlusOutlined } from '@ant-design/icons'

import styles from './style.module.css'
import Modal from '../../../components/Modal'
import { validatePlate } from '../../../utils/validators'

const { Title } = Typography

const ModalNewCar = ({ closeModal, form, saveModal, title, visible }) => {
  return (
    <Modal
      closeModal={closeModal}
      saveModal={() => form.submit()}
      title={title}
      visible={visible}
    >
      <Form form={form} name="newCar" layout="vertical" onFinish={saveModal}>
        <Form.Item name="model" label="Modelo" rules={[{ required: true }]}>
          <Input placeholder="Digite o modelo do carro" />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="year" label="Ano" rules={[{ required: true }]}>
              <DatePicker
                className={styles.datePicker}
                picker="year"
                placeholder="Selecione o ano"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Placa"
              name="plate"
              rules={[
                { required: true },
                { max: 7 },
                { validator: async (prop, value) => await validatePlate(value) },
              ]}
            >
              <Input placeholder="ABC1234/ABC1D23" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

const AddTechinician = ({
  carList,
  closeModalNewCar,
  form,
  formModal,
  onChangeSelecCarList,
  openModalNewCar,
  rotation,
  saveModalCar,
  saveTechnician,
  visibleModalNewCar,
}) => {
  return (
    <div className={styles.container}>
      <Title level={3}>Técnico</Title>
      <Form
        form={form}
        layout="vertical"
        name="newTechnician"
        onFinish={saveTechnician}
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
            <div className={styles.divWrapperCar}>
              <Form.Item
                style={{ width: 'calc(100% - 42px)' }}
                name="car"
                label="Carro"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  onChange={onChangeSelecCarList}
                  optionFilterProp="children"
                  placeholder="Selecione um carro"
                  showSearch
                >
                  {carList.map((car) => (
                    <Select.Option key={car.plate} value={car.plate}>
                      {`${car.model} (${car.plate})`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Button
                icon={<PlusOutlined />}
                onClick={openModalNewCar}
                type="primary"
              />
            </div>
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
                Salvar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <ModalNewCar
        closeModal={closeModalNewCar}
        form={formModal}
        saveModal={saveModalCar}
        title="Criar Carro"
        visible={visibleModalNewCar}
      />
    </div>
  )
}

export default AddTechinician
