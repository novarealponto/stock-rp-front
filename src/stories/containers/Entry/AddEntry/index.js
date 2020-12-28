import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Form, message } from 'antd'
import { has } from 'ramda'

import AddEntryContainer from '../../../../containers/Entry/AddEntry'
import buildEntry from '../../../../utils/entrySpec'
import { validateSerialNumberForEntry } from '../../../../utils/validators'

export default {
  title: 'Containers/Entries',
  component: AddEntryContainer,
}

const handleSubmitAction = action('On submit entry form!')

const Template = (args) => {
  const [alllowInsertSerilNumber, setAlllowInsertSerilNumber] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = (entryFormData) =>
    handleSubmitAction(buildEntry(entryFormData))

  const onChange = setAlllowInsertSerilNumber

  const onPressEnterTextAreaSerialNumber = async ({ target }) => {
    const currentTargetValue = target.value

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue, {
        noRequest: true,
      })

      if (has('error', response)) {
        const { error, serialNumbers } = response
        form.setFieldsValue({ serialNumbers })
        message.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AddEntryContainer
      {...args}
      alllowInsertSerilNumber={alllowInsertSerilNumber}
      form={form}
      handleSubmit={handleSubmit}
      onChange={onChange}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
    />
  )
}

export const AddEntry = Template.bind({})

AddEntry.args = {
  baseList: [{ name: 'Estoque' }, { name: 'Emprestimo' }],
  productList: [
    { name: 'item 1', id: 1, serial: true },
    { name: 'item 2', id: 2, serial: false },
    { name: 'item 3', id: 3, serial: true },
    { name: 'item 4', id: 4, serial: false },
    { name: 'item 5', id: 5, serial: true },
    { name: 'item 6', id: 6, serial: false },
  ],
  providerList: [
    { razaoSocial: 'provider 1', id: 1 },
    { razaoSocial: 'provider 2', id: 2 },
    { razaoSocial: 'provider 3', id: 3 },
    { razaoSocial: 'provider 4', id: 4 },
    { razaoSocial: 'provider 5', id: 5 },
    { razaoSocial: 'provider 6', id: 6 },
  ],
  onSearchProduct: action('Search product'),
  onSearchProvider: action('Search provider'),
}
