import React from 'react'
import { length } from 'ramda'
import { Button, Card, Col, Form, Row, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import CurrentList from './CurrentList'
import DrawerChangePassword from './DrawerChangePassword'

const { Title, Text } = Typography

const textRender = [
  'Você não possui ordens de serviço associadas a você. Por favor recarregue a página caso não solucione, entre em contato com o administrativo.',
  'Está O.S já foi finalizada, caso necessário inclusão/troca de peças entrar em contato com o administrativo.',
  'Nenhum item foi selecionado',
]

const CardDanger = ({ current }) => (
  <Card
    title={
      <Row justify="center">
        <Text type="danger">OOOOOPS!</Text>
      </Row>
    }
  >
    {textRender[current]}
  </Card>
)

const Mobile = ({
  current,
  form,
  handleClickAdvance,
  handleClickBack,
  handleClickCardOs,
  handleClickCardProducts,
  handleClickLogout,
  handleClickUserIcon,
  handleCloseDrawer,
  handleSubmit,
  handleSubmitNewPassword,
  osList,
  osSelected,
  products,
  productsSelected,
  username,
  visibleDrawer,
}) => (
  <>
    <DrawerChangePassword
      handleClickLogout={handleClickLogout}
      handleSubmit={handleSubmitNewPassword}
      initialValues={{ username }}
      onClose={handleCloseDrawer}
      visible={visibleDrawer}
    />
    <Row gutter={20} justify="center">
      <Col>
        <Title level={2}>{username}</Title>
      </Col>
      <Col>
        <UserOutlined
          onClick={handleClickUserIcon}
          style={{
            cursor: 'pointer',
            fontSize: '30px',
          }}
        />
      </Col>
    </Row>
    {(current === 0 && length(osList)) ||
    (current === 1 && length(products) > 0) ||
    (current === 2 && length(productsSelected) > 0) ? (
      <Form form={form} onFinish={handleSubmit}>
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              <Row>
                <Col span={24}>
                  <CurrentList
                    current={current}
                    fields={fields}
                    handleClickCardOs={handleClickCardOs}
                    handleClickCardProducts={handleClickCardProducts}
                    osList={osList}
                    osSelected={osSelected}
                    products={products}
                    productsSelected={productsSelected}
                  />
                </Col>
              </Row>

              <Row justify="space-between">
                <Button onClick={() => handleClickBack({ add, remove, fields })}>
                  Voltar
                </Button>
                <Button
                  disabled={osSelected === null}
                  onClick={() => handleClickAdvance({ add, remove })}
                >
                  Avançar
                </Button>
              </Row>
            </>
          )}
        </Form.List>
      </Form>
    ) : (
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <CardDanger current={current} />
        </Col>
        {current === 0 && length(osList) ? (
          <Col span={24}>
            <Button
              onClick={() =>
                handleClickBack({
                  remove: () => {},
                  fields: [],
                })
              }
            >
              Voltar
            </Button>
          </Col>
        ) : null}
      </Row>
    )}
  </>
)

export default Mobile
