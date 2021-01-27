import React from 'react'
import { Divider, Form, Input, List, Modal, Typography } from 'antd'

const { Search } = Input
const { Text } = Typography

const ModalSerialNumbers = ({
  dataSource,
  formSearch,
  handleOnCancel,
  handleOnSearch,
  visible,
}) => {
  const renderItem = ({ inClient, reserved, serialNumber }) => (
    <List.Item>
      <Text type={(inClient || reserved) && 'danger'}>{serialNumber}</Text>
    </List.Item>
  )

  return (
    <Modal
      footer={null}
      onCancel={handleOnCancel}
      title="Números de série"
      visible={visible}
      width={300}
    >
      <Form form={formSearch}>
        <Form.Item name="searchValue">
          <Search
            allowClear
            onSearch={handleOnSearch}
            placeholder="Número de série"
          />
        </Form.Item>
      </Form>
      <Divider />
      <div style={{ height: '250px', overflow: 'auto' }}>
        <List
          dataSource={dataSource}
          grid={{ gutter: 0, column: 1 }}
          itemLayout="vertical"
          renderItem={renderItem}
        />
      </div>
    </Modal>
  )
}

export default ModalSerialNumbers
