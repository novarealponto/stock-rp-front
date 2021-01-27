import React, { useState } from 'react'
import { Col, Form, Input, InputNumber, Modal, Row, Tabs, Typography } from 'antd'

const { TabPane } = Tabs
const { Text } = Typography
const { TextArea } = Input

const ModalAnalysis = ({
  formEntryStock,
  formSendToAnalyze,
  handleOnCancel,
  handleOnSubmitFormEntryStock,
  handleOnSubmitFormSendToAnalyze,
  onPressEnterTextAreaSerialNumber,
  row,
  visible,
}) => {
  const [current, setCurrent] = useState('1')
  const { analysis, manufacturer, preAnalysis, product } = row

  const handleOnOk = () => {
    if (current === '1') {
      formSendToAnalyze.submit()
    }
    if (current === '2') {
      formEntryStock.submit()
    }
  }

  return (
    <Modal
      onCancel={handleOnCancel}
      onOk={handleOnOk}
      visible={visible}
      width={650}
    >
      <Tabs activeKey={current} onTabClick={(current) => setCurrent(current)}>
        <TabPane key={1} tab="Enviar para análise">
          <Row>
            <Col span={18}>
              <Row gutter={[0, 20]}>
                <Col span={24}>
                  <Text strong>Produto: </Text>
                  <Text>{product}</Text>
                </Col>
              </Row>
              <Row gutter={[0, 20]}>
                <Col span={24}>
                  <Text strong>Fabricante: </Text>
                  <Text>{manufacturer}</Text>
                </Col>
              </Row>
            </Col>

            <Col span={6}>
              <Form
                form={formSendToAnalyze}
                initialValues={{ quantity: 0 }}
                onFinish={handleOnSubmitFormSendToAnalyze}
              >
                <Form.Item label="Quantidade" name="quantity">
                  <InputNumber min={0} max={preAnalysis} />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </TabPane>
        <TabPane key={2} tab="Entrada estoque">
          <Row gutter={[10, 20]}>
            <Col span={12}>
              <Text strong>Produto: </Text>
              <Text>{product}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Fabricante: </Text>
              <Text>{manufacturer}</Text>
            </Col>
          </Row>

          <Form
            form={formEntryStock}
            initialValues={{ quantity: 0, serialNumbers: '' }}
            layout="vertical"
            onFinish={handleOnSubmitFormEntryStock}
          >
            <Row gutter={20}>
              <Col span={18}>
                <Form.Item label="Números de série" name="serialNumbers">
                  <TextArea
                    onPressEnter={(event) =>
                      onPressEnterTextAreaSerialNumber({ ...event, analysis })
                    }
                    placeholder="Insíra os números de série"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Quantidade" name="quantity">
                  <InputNumber min={0} max={analysis} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default ModalAnalysis
