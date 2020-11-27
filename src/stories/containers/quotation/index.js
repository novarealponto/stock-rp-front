import React from 'react'
import CotacaoContainer from '../../../containers/Quotation'

const data = [
  {
    key: '1',
    product: 'Henry Plus',
    quant: 55,
    solicitante: 'Alan Lima',
    date: '20/11/2020',
    status: 'Aprovado'
  },
  {
    key: '2',
    product: 'Henry Plus',
    quant: 55,
    solicitante: 'Alan Lima',
    date: '20/11/2020',
    status: 'Aprovado'
  },
  {
    key: '3',
    product: 'Henry Plus',
    quant: 55,
    solicitante: 'Alan Lima',
    date: '20/11/2020',
    status: 'Aprovado'
  },
  {
    key: '4',
    product: 'Henry Plus',
    quant: 55,
    solicitante: 'Alan Lima',
    date: '20/11/2020',
    status: 'Aprovado'
  },
  {
    key: '5',
    product: 'Henry Plus',
    quant: 55,
    solicitante: 'Alan Lima',
    date: '20/11/2020',
    status: 'Aprovado'
  },
]

const handleOk = (values) => {
  console.log(values)
}

export default {
  title: 'Containers/Quotation',
  component: CotacaoContainer,
  argTypes: {
    data,
    handleOk
  },
}

const Template = (args) => <CotacaoContainer {...args} />

export const Default = Template.bind({})
Default.args = {
  data,
  handleOk
}
