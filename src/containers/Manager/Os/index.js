import React from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Typography,
} from 'antd'
import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'

const { confirm } = Modal
const { RangePicker } = DatePicker
const { Title } = Typography

const showDeleteConfirm = ({ handleOnClickDelet, row }) => {
  confirm({
    content:
      'Todos os produtos desta reserva voltarão para estoque e não haverá histórico desta O.S.',
    cancelText: 'Não',
    icon: <ExclamationCircleOutlined />,
    okText: 'Sim',
    okType: 'primary',
    onCancel() {},
    onOk() {
      handleOnClickDelet(row.key)
    },
    title: 'Deseja realmente excluir está O.S.?',
  })
}

const columns = ({ handleOnClickDelet, handleOnClickEdit }) => [
  {
    dataIndex: 'os',
    title: 'Nº OS',
  },
  {
    dataIndex: 'razaoSocial',
    title: 'Razão Social',
  },
  {
    dataIndex: 'cnpj',
    title: 'CNPJ',
  },
  {
    dataIndex: 'date',
    title: 'Data de Atendimento',
  },
  {
    dataIndex: 'delete',
    render: (_, row) => (
      <Row>
        <Col span={12}>
          <EditTwoTone
            onClick={() => handleOnClickEdit(row)}
            style={{ fontSize: 18 }}
          />
        </Col>
        <Col span={12}>
          <DeleteTwoTone
            onClick={() =>
              !row.notDelet && showDeleteConfirm({ handleOnClickDelet, row })
            }
            style={
              row.notDelet
                ? { fontSize: 18, cursor: 'not-allowed' }
                : { fontSize: 18 }
            }
            twoToneColor={row.notDelet ? '#bbb' : '#f01b0c'}
          />
        </Col>
      </Row>
    ),
  },
]

const expandedRowRender = (record) => {
  const columns = [
    { dataIndex: 'product', title: 'Produto' },
    { dataIndex: 'quantity', title: 'Quantidade' },
  ]

  return (
    <Table columns={columns} dataSource={record.products} pagination={false} />
  )
}

const Manager = ({
  dataSource,
  handleOnChangeTable,
  handleOnClickCloseSearchForm,
  handleOnClickDelet,
  handleOnClickEdit,
  handleOnClickOpenSearchForm,
  handleOnSearch,
  pagination,
  visibleSearch,
}) => (
  <>
    <Row justify="center">
      <Col>
        <Title level={3}>Gerenciar Os</Title>
      </Col>
    </Row>

    <Row justify="end" gutter={[0, 10]}>
      <Col>
        {visibleSearch ? (
          <Button onClick={handleOnClickCloseSearchForm} type="primary">
            Ocultar
          </Button>
        ) : (
          <Button onClick={handleOnClickOpenSearchForm} type="primary">
            Avançado
          </Button>
        )}
      </Col>
    </Row>

    {visibleSearch && (
      <Form onFinish={handleOnSearch}>
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="OS" name="os">
              <Input allowClear placeholder="Buscar por O.S." />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Razão Social" name="razaoSocial">
              <Input allowClear placeholder="Buscar por razão social" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="CNPJ" name="cnpj">
              <Input allowClear placeholder="Buscar por CNPJ" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Produto" name="product">
              <Input allowClear placeholder="Buscar por produto" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Data" name="date">
              <RangePicker format="DD/MM/YYYY" placeholder="Buscar por data" />
            </Form.Item>
          </Col>

          <Col span={2}>
            <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
          </Col>
        </Row>
      </Form>
    )}

    <Table
      columns={columns({ handleOnClickDelet, handleOnClickEdit })}
      dataSource={dataSource}
      expandable={{ expandedRowRender }}
      onChange={handleOnChangeTable}
      pagination={{ ...pagination, showSizeChanger: false }}
    />
  </>
)

export default Manager
