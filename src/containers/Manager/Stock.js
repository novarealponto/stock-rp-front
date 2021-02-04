import React from 'react'
import { Button, Col, Form, Input, Row, Select, Table, Typography } from 'antd'
import {
  ExperimentTwoTone,
  InfoCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { map } from 'ramda'

import ModalAnalysis from '../../components/ModalAnalysis'
import ModalSerialNumbers from '../../components/ModalSerialNumbers'
import styles from './style.module.css'

const { Option } = Select
const { Title } = Typography

const columns = ({ handleOnClickExperiment, handleOnClickInfo }) => [
  {
    title: ' ',
    dataIndex: 'serial',
    render: (serial, { productId, stock }) =>
      serial && (
        <>
          <InfoCircleOutlined
            onClick={() => handleOnClickInfo({ productId, stock })}
          />
        </>
      ),
  },
  {
    title: 'Produto',
    dataIndex: 'product',
  },
  {
    title: 'Fabricante',
    dataIndex: 'manufacturer',
  },
  {
    title: 'Disp.',
    dataIndex: 'available',
  },
  {
    title: 'Min.',
    dataIndex: 'minimum',
  },
  {
    title: 'Estoque',
    dataIndex: 'stock',
  },
  {
    title: 'Aguardando Análise',
    dataIndex: 'preAnalysis',
  },
  {
    title: 'Análise',
    dataIndex: 'analysis',
  },
  {
    title: ' ',
    dataIndex: 'analysisIcon',
    render: (_, row) =>
      (row.preAnalysis > 0 || row.analysis > 0) && (
        <ExperimentTwoTone
          onClick={() => handleOnClickExperiment(row)}
          style={{ fontSize: '18px' }}
        />
      ),
  },
]

const stockList = [
  {
    value: '',
    children: 'TODOS',
  },
  {
    value: 'ESTOQUE',
    children: 'ESTOQUE',
  },
  {
    value: 'EMPRESTIMO',
    children: 'EMPRESTIMO',
  },
]

const renderOptions = () => {
  return map(
    (item) => (
      <Option key={item.children} value={item.value}>
        {item.children}
      </Option>
    ),
    stockList
  )
}

const Manager = ({
  dataSource,
  dataSourceSerialNumbers,
  formEntryStock,
  formSearchSerialNumber,
  formSendToAnalyze,
  handleOnCancelAnalysis,
  handleOnCancelSerialNumbers,
  handleOnClickCloseSearchForm,
  handleOnClickExperiment,
  handleOnClickInfo,
  handleOnClickOpenSearchForm,
  handleOnSearch,
  handleOnSearchSerialNumber,
  handleOnSubmitFormEntryStock,
  handleOnSubmitFormSendToAnalyze,
  onChangeTable,
  onPressEnterTextAreaSerialNumber,
  row,
  pagination,
  visibleModalAnalysis,
  visibleModalSerialNumbers,
  visibleSearch
}) => {
  return (
    <>
      <ModalSerialNumbers
        dataSource={dataSourceSerialNumbers}
        formSearch={formSearchSerialNumber}
        handleOnCancel={handleOnCancelSerialNumbers}
        handleOnSearch={handleOnSearchSerialNumber}
        visible={visibleModalSerialNumbers}
      />
      <ModalAnalysis
        formEntryStock={formEntryStock}
        formSendToAnalyze={formSendToAnalyze}
        handleOnCancel={handleOnCancelAnalysis}
        handleOnSubmitFormEntryStock={handleOnSubmitFormEntryStock}
        handleOnSubmitFormSendToAnalyze={handleOnSubmitFormSendToAnalyze}
        onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
        row={row}
        visible={visibleModalAnalysis}
      />
      <Row justify="center">
        <Col>
          <Title level={3}>Gerenciar estoque</Title>
        </Col>
      </Row>

      <Row justify="end" gutter={[0, 10]}>
      <Col>
        {visibleSearch ? (
          <Button onClick={handleOnClickCloseSearchForm}>
            Ocultar
          </Button>
        ) : (
          <Button onClick={handleOnClickOpenSearchForm}>
            Filtrar
          </Button>
        )}
      </Col>
    </Row>

    {visibleSearch && (
      <Form
        initialValues={{ product: '', stock: '', manufacturer: '' }}
        layout="vertical"
        onFinish={handleOnSearch}
      >
        <Row gutter={[10, 20]}>
          <Col span={8}>
            <Form.Item label="Produto" name="product">
              <Input allowClear placeholder="Buscar produto" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Fabricante" name="manufacturer">
              <Input allowClear placeholder="Buscar por Fabricante" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Estoque" name="stock">
              <Select allowClear placeholder="Buscar por base">
                {renderOptions()}
              </Select>
            </Form.Item>
          </Col>

          <Col span={2}>
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
      <Row>
        <Col span={24}>
          <Table
            columns={columns({ handleOnClickExperiment, handleOnClickInfo })}
            dataSource={dataSource}
            onChange={onChangeTable}
            pagination={pagination}
            rowClassName={({ available, minimum }) =>
              parseInt(minimum) > parseInt(available) ? styles.danger : ''
            }
          />
        </Col>
      </Row>
    </>
  )
}

export default Manager
