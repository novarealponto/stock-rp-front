import React from 'react'
import {
  Button,
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Tooltip,
  Typography,
} from 'antd'
import { map } from 'ramda'
import {
  AlertOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'

const { Text } = Typography

const ModalSemNumeroSerie = ({ handleCancel, handleSubimt, list, visible }) => {
  const renderChildren = ({
    amount,
    missOut,
    osPartId,
    os,
    output,
    razaoSocial,
    return: returnValue,
  }) => {
    const [form] = Form.useForm()

    return (
      <Row key={os}>
        <Col span={24}>
          <Row gutter={[10, 5]}>
            <Col span={2}>
              <Tooltip title={razaoSocial}>
                <Text strong>OS</Text>
              </Tooltip>
            </Col>
            <Col span={3}>
              <Text strong>Total</Text>
            </Col>
            <Col span={3}>
              <Text strong>Saída</Text>
            </Col>
            <Col span={3}>
              <Text strong>Retorno</Text>
            </Col>
            <Col span={3}>
              <Text strong>Perda</Text>
            </Col>
            <Col span={4}>
              <Text strong>Qntd.</Text>
            </Col>
            <Col span={6}></Col>
          </Row>

          <Form
            form={form}
            initialValues={{ osPartId, quantity: 0 }}
            onFinish={(dataForm) => {
              handleSubimt(dataForm)
              form.resetFields()
            }}
          >
            <Row gutter={10}>
              <Col span={2}>{os}</Col>
              <Col span={3}>{amount}</Col>
              <Col span={3}>{output}</Col>
              <Col span={3}>{returnValue}</Col>
              <Col span={3}>{missOut}</Col>
              <Col span={4}>
                <Form.Item name="osPartId" noStyle />
                <Form.Item name="key" noStyle />
                <Form.Item name="quantity">
                  <InputNumber
                    max={amount - output - returnValue - missOut}
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8}>
                    <Tooltip placement="top" title="Retornar">
                      <Button
                        onClick={() => {
                          form.setFieldsValue({ key: 'return' })
                          form.submit()
                        }}
                      >
                        <ArrowLeftOutlined />
                      </Button>
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Tooltip placement="top" title="Liberar">
                      <Button
                        onClick={() => {
                          form.setFieldsValue({ key: 'output' })
                          form.submit()
                        }}
                        type="primary"
                      >
                        <ArrowRightOutlined />
                      </Button>
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Tooltip placement="top" title="Perda">
                      <Button
                        danger
                        onClick={() => {
                          form.setFieldsValue({ key: 'missOut' })
                          form.submit()
                        }}
                        type="primary"
                      >
                        <AlertOutlined />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }

  return (
    <Modal
      footer={null}
      onCancel={handleCancel}
      title="Liberar"
      visible={visible}
      width={700}
    >
      {map(renderChildren, list)}
    </Modal>
  )
}

export default ModalSemNumeroSerie
