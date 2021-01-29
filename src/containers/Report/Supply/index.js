import React, { useState } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Slider,
  Table,
  Typography,
} from 'antd'
import styles from './style.module.css'
import { map } from 'ramda'
import { PrinterOutlined, SearchOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker
const { Title } = Typography

const columns = [
  {
    dataIndex: 'code',
    title: 'Código',
  },
  {
    dataIndex: 'product',
    title: 'Produto',
  },
  {
    dataIndex: 'manufacturer',
    title: 'Fabricante',
  },
  {
    dataIndex: 'quantity',
    title: 'Qtd. total',
  },
  {
    dataIndex: 'date',
    title: 'Data Ultima Atualiz.',
  },
]

const formItemList = [
  {
    children: <Input allowClear placeholder="Buscar código" />,
    label: 'Código',
    name: 'code',
    span: 8,
  },
  {
    children: <Input allowClear placeholder="Buscar produto" />,
    label: 'Produto',
    name: 'product',
    span: 8,
  },
  {
    children: <Input allowClear placeholder="Buscar fabricante" />,
    label: 'Fabricante',
    name: 'manufacturer',
    span: 8,
  },
  {
    children: <Slider range max={10000} min={0} />,
    label: 'Quantidade total',
    name: 'quantity',
    span: 14,
  },
  {
    children: <RangePicker allowClear style={{ width: '100%' }} />,
    label: 'Data',
    name: 'date',
    span: 8,
  },
  {
    children: (
      <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
    ),
    label: ' ',
    name: 'submit',
    span: 2,
  },
]

const renderFormItem = ({ children, label, name, span }) => (
  <Col key={name} span={span}>
    <Form.Item label={label} name={name}>
      {children}
    </Form.Item>
  </Col>
)

const Supply = ({
  dataSource,
  handleChangeSelect,
  handleClickPrinterIcon,
  handleOnChangeTable,
  handleSubmitSearch,
  pagination,
  select,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false)
  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Supply</Title>
        </Col>
      </Row>

      <Row gutter={[20, 20]} justify="space-between">
        <Col span={6}>
          <Select
            onChange={handleChangeSelect}
            style={{ width: '100%' }}
            value={select}
          >
            <Option value="ESTOQUE">ESTOQUE</Option>
            <Option value="COMPRAS">COMPRAS</Option>
          </Select>
        </Col>

        <Col>
          <PrinterOutlined
            className={styles.iconPrinter}
            onClick={handleClickPrinterIcon}
          />
          <Button onClick={() => setVisibleSearch(!visibleSearch)}>
            {visibleSearch ? 'Ocultar' : 'Filtrar'}
          </Button>
        </Col>
      </Row>

      {visibleSearch && (
        <Form layout="vertical" onFinish={handleSubmitSearch}>
          <Row gutter={20}>{map(renderFormItem, formItemList)}</Row>
        </Form>
      )}

      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={handleOnChangeTable}
        pagination={pagination}
        rowClassName={({ quantity, quantityMin }) =>
          quantityMin > quantity ? styles.danger : ''
        }
      />
    </>
  )
}

export default Supply
