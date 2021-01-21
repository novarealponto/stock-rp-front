import React from 'react'
import { filter, length } from 'ramda'
import {
  ArrowRightOutlined,
  PlusOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import { Button, Col, Row } from 'antd'

export const columns = [
  {
    dataIndex: 'os',
    title: 'Os',
  },
  {
    dataIndex: 'amount',
    title: 'Qtd',
  },
  {
    dataIndex: 'produto',
    title: 'Produto',
  },
]

export const columnsProductsWaitingReturnWithOs = ({
  returnForAssociation,
  selectedRowKeys,
}) => [
  ...columns,
  {
    dataIndex: 'serialNumber',
    title: 'Nº série',
  },
  {
    dataIndex: 'saida',
    title: 'Saída',
  },

  {
    dataIndex: 'retorno',
    title: 'Retorno',
  },
  {
    dataIndex: 'perda',
    title: 'Perda',
  },
  {
    dataIndex: 'id',
    render: (_, props) => (
      <Button
        disabled={length(filter((row) => props.key === row, selectedRowKeys)) > 0}
        onClick={() => returnForAssociation(props)}
        type="text"
      >
        Retornar
      </Button>
    ),
    title: 'Ação',
  },
]

export const columnsProductsWaitingReturnWithOutOs = ({
  handleClickIconExpeditionSerialNumber,
  handleClickPlusIcon,
}) => [
  ...columns,
  {
    dataIndex: 'serialNumber',
    title: 'Número de Série',
  },
  {
    dataIndex: '',
    key: 'id',
    render: (row) => {
      if (row.serial) {
        return (
          <Row justify="space-between">
            <Col span={10}>
              <ArrowRightOutlined
                onClick={() =>
                  handleClickIconExpeditionSerialNumber({
                    ...row,
                    prevAction: 'saida',
                  })
                }
              />
            </Col>
            <Col span={10}>
              <RollbackOutlined
                onClick={() =>
                  handleClickIconExpeditionSerialNumber({
                    ...row,
                    prevAction: 'retorno',
                  })
                }
              />
            </Col>
          </Row>
        )
      } else {
        return (
          <PlusOutlined onClick={() => handleClickPlusIcon(row)} size="large" />
        )
      }
    },
    title: 'Ação',
  },
]

export const columnsWaitingExpedition = (handleClickArrow) => [
  ...columns,
  {
    dataIndex: 'serialNumber',
    title: 'Número de Série',
  },
  {
    dataIndex: '',
    key: 'id',
    render: (props) => {
      if (props.serial) return null
      return <ArrowRightOutlined onClick={() => handleClickArrow(props)} />
    },
    title: 'Ação',
  },
]
