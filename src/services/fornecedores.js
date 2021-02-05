import axios from 'axios'
import axiosInstance from '../helpers/request'

const url = (cep) => `https://viacep.com.br/ws/${cep}/json/`

export const getAddressByZipCode = (cep) => {
  return axios.get(url(cep.replace(/\D+/g, '')))
}

export const getAllFornecedor = (query) => {
  return axiosInstance
    .get('/company', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getFornecedor = (query) => {
  return axiosInstance
    .get('/company/getAllFornecedor', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const newProvider = (values) => {
  return axiosInstance
    .post('/company', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const updateFornecedor = (values) => {
  return axiosInstance
    .put('/company/update', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
