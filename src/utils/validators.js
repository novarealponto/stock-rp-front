import { has, path } from 'ramda'
import { isValid as cpnjIsValid } from '@fnando/cnpj'
import { string, setLocale } from 'yup'

import { getAddressByZipCode } from '../services/fornecedores'

setLocale({
  mixed: {
    default: 'Não é válido',
  },
  string: {
    email: 'Email inválido',
  },
})

export const validateCEP = async (form, value) => {
  try {
    const { status, data } = await getAddressByZipCode(value)

    if (status !== 200 || has('erro', data)) {
      return Promise.reject(new Error('Cep inválido'))
    }

    form.setFieldsValue({
      city: path(['localidade'], data),
      neighborhood: path(['bairro'], data),
      referencePoint: path(['complemento'], data),
      state: path(['uf'], data),
      street: path(['logradouro'], data),
    })
  } catch (err) {
    return Promise.reject(new Error('Cep inválido'))
  }
}

export const validateCNPJ = (form, value) => {
  if (!cpnjIsValid(value)) {
    return Promise.reject(new Error('CNPJ inválido'))
  } else {
    return Promise.resolve(form.setFields([{ name: 'cnpj', value, errors: [] }]))
  }
}

export const validateEmail = async (value) => {
  try {
    await string().email().validate(value)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const validatePlate = async (value) => {
  if (/\W/.test(value)) {
    return Promise.reject(new Error('Digite apenas caracteres alfanumérico'))
  }
}
