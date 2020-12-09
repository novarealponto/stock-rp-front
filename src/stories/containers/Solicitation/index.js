import React from 'react'
import SolicitationContainer from '../../../containers/Solicitation'

const data = [
  {
    key: '1',
    item: 'Prisma Super Fácil',
    quant: 32,
    solicitante: 'Alan Lima',
    date: '20/11/2020'
  },
  {
    key: '2',
    item: 'Prisma Super Fácil',
    quant: 32,
    solicitante: 'Alan Lima',
    date: '20/11/2020'
  },
  {
    key: '3',
    item: 'Prisma Super Fácil',
    quant: 32,
    solicitante: 'Alan Lima',
    date: '20/11/2020'
  },
  {
    key: '4',
    item: 'Prisma Super Fácil',
    quant: 32,
    solicitante: 'Alan Lima',
    date: '20/11/2020'
  },
  {
    key: '5',
    item: 'Prisma Super Fácil',
    quant: 32,
    solicitante: 'Alan Lima',
    date: '20/11/2020'
  },
]

const handleOk = (values) => {
  console.log(values)
}

export default {
  title: 'Containers/Solicitation',
  component: SolicitationContainer,
  argTypes: {
    data,
    handleOk
  },
}

const Template = (args) => <SolicitationContainer {...args} />

export const Default = Template.bind({})
Default.args = {
  data,
  handleOk
}
