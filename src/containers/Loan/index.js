import React from 'react'
import moment from 'moment'
import { map } from 'ramda'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from 'antd'
import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusSquareTwoTone,
  PrinterTwoTone,
  RollbackOutlined,
  SearchOutlined,
} from '@ant-design/icons'

const { confirm } = Modal
const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

const columns = ({
  handleClickDeletReserve,
  handleClickIconAddReserve,
  handleClickIconEditReserve,
  handleClickIconRollBack,
  select,
}) => {
  const response = [
    {
      dataIndex: 'product',
      title: 'Produto',
    },
    {
      dataIndex: 'serialNumber',
      title: 'Número de série',
    },
  ]

  const addColumn = {
    disponiveis: () =>
      response.splice(1, 0, {
        dataIndex: 'mark',
        title: 'Fabricante',
      }),
    reservados: () =>
      response.splice(1, 0, {
        dataIndex: 'razaoSocial',
        title: 'Razão Social',
      }),
    emCliente: () =>
      response.splice(1, 0, {
        dataIndex: 'razaoSocial',
        title: 'Razão Social',
      }),
  }[select]

  addColumn()

  response.splice(3, 0, {
    dataIndex: 'action',
    render: (_, values) => {
      return {
        disponiveis: (
          <PlusSquareTwoTone
            onClick={() => handleClickIconAddReserve(values)}
            style={{ fontSize: '20px' }}
          />
        ),
        reservados: (
          <Row justify="space-between">
            <EditTwoTone
              style={{ fontSize: '20px' }}
              onClick={() => handleClickIconEditReserve(values)}
            />
            <DeleteTwoTone
              style={{ fontSize: '20px' }}
              onClick={() =>
                showDeleteConfirm({ handleOk: handleClickDeletReserve, values })
              }
              twoToneColor="#f01b0c"
            />
          </Row>
        ),
        emCliente: (
          <RollbackOutlined
            onClick={() => {
              handleClickIconRollBack(values)
            }}
            style={{ color: '#1890FF', fontSize: '18px' }}
          />
        ),
      }[select]
    },
    width: 90,
  })
  return response
}

const showDeleteConfirm = ({ handleOk, values }) => {
  confirm({
    cancelText: 'Não',
    content: 'O equipamento voltará para estoque',
    icon: <ExclamationCircleOutlined />,
    okText: 'Sim',
    okType: 'primary',
    onCancel() {},
    onOk() {
      handleOk(values)
    },
    title: 'Deseja realmente excluir está reserva?',
  })
}

const options = [
  {
    children: 'DISPONÍVEIS',
    value: 'disponiveis',
  },
  {
    children: 'RESERVADOS',
    value: 'reservados',
  },
  {
    children: 'EM CLIENTE',
    value: 'emCliente',
  },
]

const renderOption = ({ children, key, value }) => (
  <Option key={key || value} value={value}>
    {children}
  </Option>
)

const formItemsList = (select) => {
  const response = [
    {
      label: 'Produto',
      name: 'product',
      placeholder: 'Buscar por produto',
    },
    {
      label: 'Número de série',
      name: 'serialNumber',
      placeholder: 'Buscar por número de série',
    },
  ]

  const addFieald = {
    disponiveis: () =>
      response.splice(1, 0, {
        label: 'Fabricante',
        name: 'mark',
        placeholder: 'Buscar por fabricante',
      }),
    reservados: () =>
      response.splice(1, 0, {
        label: 'Razão social',
        name: 'razaoSocial',
        placeholder: 'Buscar por razão social',
      }),
    emCliente: () =>
      response.splice(1, 0, {
        label: 'Razão social',
        name: 'razaoSocial',
        placeholder: 'Buscar por razão social',
      }),
  }[select]

  addFieald()

  return response
}

const ModalLoan = ({
  form,
  handleCancel,
  handleOk,
  select,
  technicianList,
  visible,
}) => {
  return (
    <Modal
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title={'title'}
      visible={visible}
      width={650}
    >
      <Form form={form} layout="vertical" onFinish={handleOk}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Razão social"
              name="razaoSocial"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Digite a razão social"
                readOnly={select === 'emCliente'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="CNPJ" name="cnpj" rules={[{ required: true }]}>
              <Input
                placeholder="Digite o CNPJ"
                readOnly={select === 'emCliente'}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Data do atendimento"
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker
                disabled={select === 'emCliente'}
                disabledDate={(current) =>
                  current && current < moment().subtract(1, 'day')
                }
                format="DD/MM/YYYY"
                placeholder="Selecione a data de atendimento"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label="Técnico"
              name="tecnician"
              rules={[{ required: true }]}
            >
              <Select
                disabled={select === 'emCliente'}
                filterOption={(input, { children }) =>
                  children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="value"
                placeholder="Selecione um técnico"
                showSearch
              >
                {map(
                  ({ key, name }) => (
                    <Option key={key} value={key}>
                      {name}
                    </Option>
                  ),
                  technicianList
                )}
              </Select>
            </Form.Item>
          </Col>
          {select !== 'disponiveis' && (
            <Col span={12}>
              <Form.Item name="solicitation" label="Data Solicitação">
                <Input readOnly />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="observation" label="Observação">
              <TextArea
                placeholder="Digite a observação"
                readOnly={select === 'emCliente'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item noStyle name="serialNumber" />
        <Form.Item noStyle name="key" />
      </Form>
    </Modal>
  )
}

const Manager = ({
  dataSource,
  formModal,
  formSearch,
  handleCancelModal,
  handleChangeTable,
  handleClickDeletReserve,
  handleClickIconAddReserve,
  handleClickIconEditReserve,
  handleClickIconRollBack,
  handleClickPrint,
  handleOk,
  handleSearch,
  onChangeSelect,
  pagination,
  select,
  showSearch,
  technicianList,
  visibleModal,
  visibleSearch,
}) => {
  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Gerenciar Empréstimo</Title>
        </Col>
      </Row>

      <Row gutter={[10, 10]} justify="space-between">
        <Col span={6}>
          <Select
            onChange={onChangeSelect}
            style={{ width: '100%' }}
            value={select}
          >
            {map(renderOption, options)}
          </Select>
        </Col>
        <Col span={4}>
          <Row justify="space-between">
            <PrinterTwoTone
              onClick={handleClickPrint}
              style={{ fontSize: '30px' }}
            />
            <Button onClick={showSearch}>
              {visibleSearch ? 'ocultar' : 'Avançado'}
            </Button>
          </Row>
        </Col>
      </Row>

      {visibleSearch && (
        <Form form={formSearch} layout="vertical" onFinish={handleSearch}>
          <Row gutter={10} justify="space-between">
            <Col flex="auto">
              <Row gutter={[10, 10]}>
                {map(
                  ({ placeholder, label, name }) => (
                    <Col key={name} span={8}>
                      <Form.Item label={label} name={name}>
                        <Input allowClear placeholder={placeholder} />
                      </Form.Item>
                    </Col>
                  ),
                  formItemsList(select)
                )}
              </Row>
            </Col>
            <Col flex="32px">
              <Form.Item label=" ">
                <Button
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}

      <Table
        columns={columns({
          handleClickDeletReserve,
          handleClickIconAddReserve,
          handleClickIconEditReserve,
          handleClickIconRollBack,
          select,
        })}
        dataSource={dataSource}
        onChange={handleChangeTable}
        pagination={pagination}
      />

      <ModalLoan
        form={formModal}
        handleCancel={handleCancelModal}
        handleOk={handleOk}
        select={select}
        technicianList={technicianList}
        visible={visibleModal}
      />
    </>
  )
}

export default Manager
