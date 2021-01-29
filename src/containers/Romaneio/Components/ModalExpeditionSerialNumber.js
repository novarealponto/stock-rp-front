import React, { useState } from 'react'
import { map } from 'ramda'
import { Col, Modal, Row, Select } from 'antd'

const { Option } = Select

const ModalExpeditionSerialNumber = ({
  handleCancel,
  handleOk,
  osList,
  rowSelected,
  visible,
}) => {
  const [oId, setOId] = useState()

  return (
    <Modal
      onCancel={() => {
        setOId()
        handleCancel()
      }}
      onOk={() => {
        handleOk({ ...rowSelected, oId })
        setOId()
      }}
      title="Liberar"
      visible={visible}
    >
      <Row gutter={20}>
        <Col span={6}>
          <Select
            onChange={(oId) => setOId(oId)}
            placeholder="os"
            style={{ width: '100%' }}
            value={oId}
          >
            {map(
              ({ os, oId }) => (
                <Option key={oId} value={oId}>
                  {os}
                </Option>
              ),
              osList
            )}
          </Select>
        </Col>
        <Col span={18}>
          <Select
            onChange={(oId) => setOId(oId)}
            placeholder="razão social"
            style={{ width: '100%' }}
            value={oId}
          >
            {map(
              ({ oId, razaoSocial }) => (
                <Option key={oId} value={oId}>
                  {razaoSocial}
                </Option>
              ),
              osList
            )}
          </Select>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalExpeditionSerialNumber
