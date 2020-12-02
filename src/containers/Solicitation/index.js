import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Button, Table, Form } from 'antd'
import styles from './style.module.css'

import ModalNewSolicitation from '../../components/ModalSolicitation'
import ModalNewQuotation from '../../components/ModalNewQuotationSolicitation'
import ModalQuotation from '../../components/ModalQuotation'

const columns = [
  {
    title: 'Itens solicitados',
    dataIndex: 'item',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quant',
  },
  {
    title: 'Solicitante',
    dataIndex: 'solicitante',
  },
  {
    title: 'Data',
    dataIndex: 'date',
  },
  {
    title: 'Ações',
    dataIndex: 'action',
  },
]

const Actions = (openModalNewQuotation, openModalQuotation) => (
  <>
    <Button className={styles.actionBtn} onClick={openModalQuotation} type="danger">
      Negar
    </Button>
    <Button onClick={openModalNewQuotation} type="primary">
      Aprovar
    </Button>
  </>
)
 
const Solicitation = ({ data, handleOk }) => {
  const [visible, setVisible] = useState(false)
  const [visibleNewQuotation, setVisibleNewQuotation] = useState(false)
  const [visibleQuotation, setVisibleQuotation] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setVisible(true)
  }

  const openModalNewQuotation = () => {
    setVisibleNewQuotation(true)
  }
 
  const openModalQuotation = () => {
    setVisibleQuotation(true)
  }

  const handleCancel = () => {
    setVisible(false)
    setVisibleNewQuotation(false)
    setVisibleQuotation(false)
  }

  const onChange = (value) => {
    console.log(`selected ${value}`)
  }

  const onBlur = () => {
    console.log('blur')
  }

  const onFocus = () => {
    console.log('focus')
  }

  const onSearch = (val) => {
    console.log('search:', val)
  }

  const parseData = data.map(solicitation => ({
    ...solicitation,
   action: Actions(openModalNewQuotation, openModalQuotation),
  }))

  return (
    <div>
      <h1>Solicitação</h1>
      <div className={styles.divDireita}>
      <Button type="primary" onClick={showModal}>
        Criar solicitação
      </Button>
      </div>
      <ModalQuotation
        form={form}
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visibleQuotation}
        onChange={onChange}
        onBlur={onBlur}
        onSearch={onSearch}
        onFocus={onFocus}
      />
      <ModalNewQuotation
        form={form}
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visibleNewQuotation}
        onChange={onChange}
        onBlur={onBlur}
        onSearch={onSearch}
        onFocus={onFocus}
      />
      <ModalNewSolicitation
        form={form}
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visible}
        onChange={onChange}
        onBlur={onBlur}
        onSearch={onSearch}
        onFocus={onFocus}
      />
      <Table columns={columns} dataSource={parseData} size="middle" />
    </div>
  )
}

export default Solicitation
