import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, company, name, random } from 'faker'
import { dec, findIndex, forEach, inc, map, max, min, propEq } from 'ramda'
import { Form } from 'antd'
import { Howl, Howler } from 'howler'

import ha from './sound.mp3'
import MobileContainer from '../../../containers/Mobile'

export default {
  title: 'Containers/Mobile',
  component: MobileContainer,
}

const osList = []
const products = []

for (let key = 0; key < 5; key++) {
  const serial = random.boolean()

  // osList.push({
  //   id: key,
  //   os: key,
  //   razaoSocial: company.companyName(),
  // })

  products.push({
    amount: random.number() % 20,
    id: key,
    key,
    osPartId: 'OP_' + key,
    product: commerce.productName(),
    serial,
    serialNumbers: serial
      ? map((item) => item * (key + 1), [1, 2, 3, 4, 5, 6])
      : [],
  })
}

const handleClickAdvanceAction = action('Click Advance')
const handleClickBackAction = action('Click Back')
const handleClickCardOsAction = action('Click Card Os')
const handleClickCardProductsAction = action('Click Card Products')
const handleClickLogoutAction = action('Click Logout')
const handleClickUserIconAction = action('Click User Icon')
const handleCloseDrawerAction = action('Close Drawer')
const handleSubmitAction = action('Submit')
const handleSubmitNewPasswordAction = action('Submit New Password')

const Template = (args) => {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [osSelected, setOsSelected] = useState(null)
  const [productsSelected, setProductsSelected] = useState([])
  const [visibleDrawer, setVisibleDrawer] = useState(false)

  const handleClickAdvance = ({ add }) => {
    soundPlay()
    if (current === 1) {
      forEach(
        ({ amount, id, osPartId, product, serial, serialNumbers }) =>
          add(
            {
              amount: 0,
              id,
              max: amount,
              osPartId,
              product,
              serial,
              serialNumbers: [],
              serialNumbersList: serialNumbers,
            },
            0
          ),
        productsSelected
      )
    } else if (current === 2) {
      form.submit()
    }

    handleClickAdvanceAction()
    setCurrent(min(inc(current), 2))
  }

  const handleClickBack = ({ remove, fields }) => {
    soundPlay()
    if (current === 2) {
      remove(map((field) => field.name, fields))
    }
    handleClickBackAction()
    setCurrent(max(dec(current), 0))
  }

  const handleClickCardOs = (cardData) => {
    handleClickCardOsAction(cardData)
    setOsSelected(cardData)
  }

  const handleClickCardProducts = ({
    amount,
    id,
    osPartId,
    product,
    serial,
    serialNumbers,
  }) => {
    const index = findIndex(propEq('id', id))(productsSelected)
    const list = productsSelected

    if (index !== -1) {
      list.splice(index, 1)
      setProductsSelected([...list])
    } else {
      setProductsSelected([
        ...productsSelected,
        { amount, id, osPartId, product, serial, serialNumbers },
      ])
    }
    handleClickCardProductsAction({
      amount,
      id,
      osPartId,
      product,
      serial,
      serialNumbers,
    })
  }

  const handleClickUserIcon = () => {
    handleClickUserIconAction(true)
    setVisibleDrawer(true)
  }
  const handleCloseDrawer = () => {
    handleCloseDrawerAction(false)
    setVisibleDrawer(false)
  }

  Howler.volume(1)

  const soundPlay = () => {
    const sound = new Howl({
      src: ha,
      html5: true,
      sprite: {
        laser: [15100, 1500],
      },
    })

    sound.play('laser')
  }

  return (
    <MobileContainer
      {...args}
      current={current}
      form={form}
      handleClickAdvance={handleClickAdvance}
      handleClickBack={handleClickBack}
      handleClickCardOs={handleClickCardOs}
      handleClickCardProducts={handleClickCardProducts}
      handleClickUserIcon={handleClickUserIcon}
      handleCloseDrawer={handleCloseDrawer}
      osSelected={osSelected}
      productsSelected={productsSelected}
      visibleDrawer={visibleDrawer}
    />
  )
}

export const Mobile = Template.bind({})

Mobile.args = {
  username: name.firstName(),
  products,
  osList,
  handleSubmitNewPassword: handleSubmitNewPasswordAction,
  handleSubmit: handleSubmitAction,
  handleClickLogout: handleClickLogoutAction,
}
