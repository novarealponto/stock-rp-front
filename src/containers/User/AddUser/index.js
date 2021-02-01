import React from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import styles from './style.module.css'
import CardPermissions from '../../../components/CardPermissions'

const { Title } = Typography
const { Option } = Select
const requiredMessage = 'Este campo é obrigatório!'

const formRequireRules = [
  {
    message: requiredMessage,
    required: true,
  },
]

const AddUser = ({
  allowAddTypeAccount,
  allowCustomPermissions,
  form,
  goToAddTypeAccount,
  handleAllowSetCustomPermissions,
  handleOnTypeAccountChange,
  handleSubmit,
  permissions,
  typeAccounts,
}) => {

  const renderTypeAccountOptions = (typeAccountItem, index) => (
    <Option key={index} value={typeAccountItem.typeName}>
      {typeAccountItem.typeName}
    </Option>
  )

  return (
    <div className={styles.addUserContainer}>
      <Form form={form} onFinish={handleSubmit}>
        <Row justify="center">
          <Col>
            <Title level={3}>Novo usuário</Title>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item label="Usuário" name="userName" rules={formRequireRules}>
              <Input placeholder="Digite o nome do usuário"/>
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
                    onChange={handleOnTypeAccountChange}
                    placeholder="Selecione o tipo de conta"
                  >
                    {typeAccounts && typeAccounts.map(renderTypeAccountOptions)}
                  </Select>
                </Form.Item>
              </Col>
              <Col flex="0 1 100px">
                {allowAddTypeAccount && (
                  <Button onClick={goToAddTypeAccount} type="primary">
                    <PlusOutlined />
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item
          label="Habilitar customização:"
          name="allowCustomPermissions"
          valuePropName="checked"
        >
          <Switch onChange={handleAllowSetCustomPermissions} />
        </Form.Item>

        <CardPermissions
          permissions={permissions}
          disabled={!allowCustomPermissions}
        />
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
    </div>
  )
}

AddUser.propTypes = {
  allowAddTypeAccount: PropTypes.bool.isRequired,
  allowCustomPermissions: PropTypes.bool.isRequired,
  form: PropTypes.shape({}).isRequired,
  goToAddTypeAccount: PropTypes.func.isRequired,
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

export default AddUser
