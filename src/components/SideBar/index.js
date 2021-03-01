import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { compose, length, map } from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Col, Divider, Layout, Menu, Row, Tooltip } from 'antd'
import {
  AlertOutlined,
  AppleOutlined,
  AreaChartOutlined,
  BankOutlined,
  FileAddOutlined,
  FilePdfOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  PushpinOutlined,
  RetweetOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  StockOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'

import styles from './style.module.css'
import { logOutAction } from '../../store/Actions/auth'

const { Sider } = Layout
const { SubMenu } = Menu

const headersList = ({ auth, history, logOutAction }) => [
  {
    children: (
      <StockOutlined
        className={styles.iconHearder}
        onClick={() => history.push('/logged/stock/manager')}
      />
    ),
    title: 'Estoque',
  },
  {
    children: (
      <ShopOutlined
        className={styles.iconHearder}
        disabled={!auth.permissions.addEntr}
        onClick={() => history.push('/logged/entry/add')}
      />
    ),
    title: 'Entrada',
  },
  {
    children: (
      <UserOutlined
        className={styles.iconHearder}
        onClick={() => history.push('/logged/profile')}
      />
    ),
    title: 'Perfil',
  },
  {
    children: (
      <LogoutOutlined
        className={styles.iconHearder}
        onClick={() => {
          logOutAction()
          history.push('/login')
        }}
      />
    ),
    title: 'Logout',
  },
]

const subMenuList = [
  {
    key: 'Cadastros',
    menuItemList: () => [
      {
        disabled: false,
        icon: <BankOutlined />,
        key: 'provider/manager',
        text: 'Fornecedor',
      },
      {
        disabled: false,
        icon: <SettingOutlined />,
        key: 'mark/manager',
        text: 'Marca',
      },
      {
        disabled: false,
        icon: <SettingOutlined />,
        key: 'product/manager',
        text: 'Produto',
      },
      {
        disabled: false,
        icon: <UserAddOutlined />,
        key: 'technician/manager',
        text: 'Técnico',
      },
      {
        disabled: false,
        icon: <SettingOutlined />,
        key: 'productType/manager',
        text: 'Tipo de produto',
      },
      {
        disabled: false,
        icon: <UserOutlined />,
        key: 'user/manager',
        text: 'Usuário',
      },
      {
        disabled: false,
        icon: <UserOutlined />,
        key: 'typeAccount/manager',
        text: 'Tipo de conta',
      },
    ],
    title: (
      <span>
        <UserOutlined />
        <span>Cadastros</span>
      </span>
    ),
  },
  {
    key: 'Entrada',
    menuItemList: ({ auth }) => [
      {
        key: 'entry/add',
        disabled: !auth.permissions.addEntr,
        icon: <ShoppingCartOutlined />,
        text: 'Nova',
      },
      {
        disabled: false,
        key: 'entry/manager',
        icon: <UnorderedListOutlined />,
        text: 'Gerenciar',
      },
    ],
    title: (
      <span>
        <ShopOutlined />
        <span>Entrada</span>
      </span>
    ),
  },
  {
    key: 'Estoque',
    menuItemList: () => [
      {
        disabled: false,
        key: 'stock/manager',
        icon: <UnorderedListOutlined />,
        text: 'Gerenciar',
      },
    ],
    title: (
      <span>
        <StockOutlined />
        <span>Estoque</span>
      </span>
    ),
  },
  {
    key: 'Reserva',
    menuItemList: ({ auth }) => [
      {
        disabled: false,
        key: 'romaneio',
        icon: <FilePdfOutlined />,
        text: 'Romaneio',
      },
      {
        disabled: !auth.permissions.addROs,
        key: 'os/add',
        icon: <FileAddOutlined />,
        text: 'Saídas',
      },
      {
        disabled: !auth.permissions.gerROs,
        key: 'os/manager',
        icon: <UnorderedListOutlined />,
        text: 'Gerenciar Os',
      },
    ],
    title: (
      <span>
        <PushpinOutlined />
        <span>Reserva</span>
      </span>
    ),
  },
  {
    key: 'Emprestimo',
    title: (
      <span>
        <RetweetOutlined />
        <span>Empréstimo</span>
      </span>
    ),
    menuItemList: () => [
      {
        disabled: false,
        key: 'loan',
        icon: <UnorderedListOutlined />,
        text: 'Gerenciar',
      },
    ],
  },
  {
    key: 'Relatorios',
    menuItemList: () => [
      {
        disabled: false,
        key: 'reports/os',
        icon: <FileSearchOutlined />,
        text: 'Os',
      },
      {
        disabled: false,
        key: 'reports/missout',
        icon: <AlertOutlined />,
        text: 'Perda',
      },
      {
        disabled: false,
        key: 'reports/solds',
        icon: <ShoppingCartOutlined />,
        text: 'Vendas',
      },
      {
        disabled: false,
        key: 'reports/supply',
        icon: <AppleOutlined />,
        text: 'Suprimentos',
      },
      {
        disabled: false,
        key: 'reports/loan',
        icon: <RetweetOutlined />,
        text: 'Empréstimo',
      },
    ],
    title: (
      <span>
        <AreaChartOutlined />
        <span>Relatórios</span>
      </span>
    ),
  },
  {
    key: 'Suprimentos',
    menuItemList: ({ auth }) => [
      {
        disabled: !auth.permissions.suprimento,
        key: 'supply/product/manager',
        icon: <UnorderedListOutlined />,
        text: 'Produtos',
      },
      {
        disabled: !auth.permissions.suprimento,
        key: 'supply/manufacurer/manager',
        icon: <UnorderedListOutlined />,
        text: 'Fabricantes',
      },
      {
        disabled: !auth.permissions.suprimento,
        key: 'supply/entry/manager',
        icon: <UnorderedListOutlined />,
        text: 'Entrada',
      },
      {
        disabled: !auth.permissions.suprimento,
        key: 'supply/output/manager',
        icon: <UnorderedListOutlined />,
        text: 'Saida',
      },
      {
        disabled: !auth.permissions.suprimento,
        key: 'supply/stock/manager',
        icon: <UnorderedListOutlined />,
        text: 'Estoque',
      },
    ],
    title: (
      <span>
        <AppleOutlined />
        <span>Suprimentos</span>
      </span>
    ),
  },
]

const renderHeader = ({ children, title }) => (
  <Col key={title} span={6}>
    <Row justify="center">
      <Tooltip placement="bottom" title={title}>
        {children}
      </Tooltip>
    </Row>
  </Col>
)

const renderMenuItem = ({ history }) => ({ disabled, icon, key, text }) => (
  <Menu.Item
    disabled={disabled}
    key={key}
    onClick={() => history.push(`/logged/${key}`)}
  >
    {icon}
    {text}
  </Menu.Item>
)

const renderSubMenu = ({ auth, history }) => ({ key, menuItemList, title }) => (
  <SubMenu key={key} title={title}>
    {map(renderMenuItem({ history }), menuItemList({ auth }))}
  </SubMenu>
)

const SideBar = ({ auth, history, logOutAction }) => {
  const [openKeys, setOpenKeys] = useState([])

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <Row style={{ margin: '20px 0' }}>
        {map(renderHeader, headersList({ auth, history, logOutAction }))}
      </Row>

      <Divider className={styles.divider} />

      <Menu
        mode="inline"
        onOpenChange={(keys) => {
          setOpenKeys(length(keys) === 2 ? [keys[1]] : keys)
        }}
        openKeys={openKeys}
        theme="dark"
      >
        {map(renderSubMenu({ history, auth }), subMenuList)}
      </Menu>
    </Sider>
  )
}

const mapDispacthToProps = (dispatch) => bindActionCreators({ logOutAction }, dispatch)
const mapStateToProps = ({ auth }) => ({ auth })

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(SideBar)
