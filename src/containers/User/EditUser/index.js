import React from 'react'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const { Title } = Typography
const { Option } = Select
const requiredMessage = 'Este campo é obrigatório!'

const formRequireRules = [
  {
    message: requiredMessage,
    required: true,
  },
]

const EditUser = ({
  allowCustomPermissions,
  allowUpdatePassword,
  form,
  handleAllowSetCustomPermissions,
  handleOnTypeAccountChange,
  handleSubmit,
  permissions,
  typeAccounts,
}) => {
  const renderCheckbox = ({ label, name, value }) => (
    <Col className={styles.checkBoxheight} span={12} key={name}>
      <Form.Item name={name} valuePropName="checked">
        <Checkbox disabled={!allowCustomPermissions} checked={value}>
          {label}
        </Checkbox>
      </Form.Item>
    </Col>
  )

  const renderTypeAccountOptions = (typeAccountItem, index) => (
    <Option key={index} value={typeAccountItem.typeName}>
      {typeAccountItem.typeName}
    </Option>
  )

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row justify="center">
        <Col>
          <Title level={3}>Alterar usuário</Title>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item label="Usuário" name="userName" rules={formRequireRules}>
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Row gutter={[8, 8]}>
            <Col flex="1 1 200px">
              <Form.Item
                label="Tipo de conta"
                name="typeAccount"
                rules={formRequireRules}
              >
                <Select
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  onChange={handleOnTypeAccountChange}
                  optionFilterProp="children"
                  placeholder="Selecione o tipo de conta!"
                  showSearch
                >
                  {typeAccounts && typeAccounts.map(renderTypeAccountOptions)}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            label="Habilitar customização:"
            name="allowCustomPermissions"
            valuePropName="checked"
          >
            <Switch onChange={handleAllowSetCustomPermissions} />
          </Form.Item>
        </Col>

        {allowUpdatePassword && (
          <Col span={12}>
            <Form.Item label="Atualizar senha:" name="password">
              <Input.Password placeholder="Nova senha" />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Card>
        <Row>{permissions && permissions.map(renderCheckbox)}</Row>
      </Card>
      <Row justify="end">
        <Col>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginTop: '20px' }}
            >
              Salvar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

EditUser.propTypes = {
  allowCustomPermissions: PropTypes.bool.isRequired,
  form: PropTypes.shape({}).isRequired,
  handleAllowSetCustomPermissions: PropTypes.func.isRequired,
  handleOnTypeAccountChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  typeAccounts: PropTypes.arrayOf(
    PropTypes.shape({
      typeName: PropTypes.string.isRequired,
    }).isRequired
  ),
}

export default EditUser
