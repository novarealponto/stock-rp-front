import axiosInstance from '../helpers/request'

export const addEquip = (value) => {
  return axiosInstance
    .post('/equip', value)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllEquipsService = (query) => {
  return axiosInstance
    .get('/equip', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllEquipBySerialNumber = (query) => {
  return axiosInstance
    .get('/equip/serialNumber', {
      params: query,
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const deteleEquip = (params) => {
  return axiosInstance
    .delete('/equip', { params })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
