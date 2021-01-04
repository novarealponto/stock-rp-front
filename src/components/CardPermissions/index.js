import React from 'react'
import { Card, Checkbox, Col, Form, Row } from 'antd'

const CardPermissions = ({ permissions, disabled }) => {
  const renderCheckbox = ({ label, name, value }) => (
    <Col style={{ height: '40px' }} span={12} key={name}>
      <Form.Item name={name} valuePropName="checked">
        <Checkbox disabled={disabled} checked={value}>
          {label}
        </Checkbox>
      </Form.Item>
    </Col>
  )

  return (
    <Card>
      <Row>{permissions && permissions.map(renderCheckbox)}</Row>
    </Card>
  )
}

export default CardPermissions
