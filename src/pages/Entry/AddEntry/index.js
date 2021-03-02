import React, { useEffect, useState } from 'react'
import { Form, message } from 'antd'
import { has, length, split } from 'ramda'

import AddEntyContainer from '../../../containers/Entry/AddEntry'
import buildEntry from '../../../utils/entrySpec'
import { getFornecedor } from '../../../services/fornecedores'
import { getItens } from '../../../services/produto'
import { newEntrada } from '../../../services/entrada'
import { validateSerialNumberForEntry } from '../../../utils/validators'

const baseList = [{ name: 'ESTOQUE' }, { name: 'EMPRESTIMO' }]

const AddEntry = () => {
  const [alllowInsertSerialNumber, setAlllowInsertSerialNumber] = useState(false)
  const [form] = Form.useForm()
  const [productList, setProductList] = useState([])
  const [productSearch, setProductSearch] = useState('')
  const [providerList, setProviderList] = useState([])
  const [providerSearch, setProviderSearch] = useState('')

  useEffect(() => {
    const getAllProducts = async () => {
      const query = {
        filters: {
          product: {
            specific: {
              name: productSearch,
            },
          },
        },
      }

      getItens(query).then(({ data }) => setProductList(data))
    }

    const getAllProviders = () => {
      const query = {
        filters: {
          company: {
            specific: {
              razaoSocial: providerSearch,
            },
          },
        },
      }
      getFornecedor(query).then(({ data }) => setProviderList(data))
    }

    getAllProducts()
    getAllProviders()
  }, [productSearch, providerSearch])

  const handleSubmit = async (entryFormData) => {
    try {
      const { status } = await newEntrada(buildEntry(entryFormData))

      if (status === 422 || status === 401 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      form.resetFields()
      message.success('Entrada efetuada com sucesso')
    } catch (err) {
      message.error('Erro ao efetuar entrada')
      console.log(err)
    }
  }

  const onPressEnterTextAreaSerialNumber = async ({ target }) => {
    const currentTargetValue = target.value

    try {
      const response = await validateSerialNumberForEntry(currentTargetValue)

      form.setFieldsValue({ amountAdded: response.length })
      if (has('error', response)) {
        const { error, serialNumbers } = response
        form.setFieldsValue({
          serialNumbers,
          amountAdded: length(split('\n', serialNumbers)),
        })
        message.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AddEntyContainer
      alllowInsertSerialNumber={alllowInsertSerialNumber}
      baseList={baseList}
      form={form}
      handleSubmit={handleSubmit}
      onChange={setAlllowInsertSerialNumber}
      onPressEnterTextAreaSerialNumber={onPressEnterTextAreaSerialNumber}
      onSearchProduct={setProductSearch}
      onSearchProvider={setProviderSearch}
      productList={productList}
      providerList={providerList}
    />
  )
}

export default AddEntry
