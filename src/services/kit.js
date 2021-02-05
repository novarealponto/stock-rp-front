import axiosInstance from '../helpers/request'

export const NewKit = (values) => {
  return axiosInstance
    .post('/reserve/kit', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getKit = (query) => {
  return axiosInstance
    .get('/reserve/kit', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getKitDefaultValue = (query) => {
  return axiosInstance
    .get('/reserve/kitDefaultValue', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const baixasKit = (values) => {
  return axiosInstance
    .post('/reserve/kitOut', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const baixasKitOut = (values) => {
  return axiosInstance
    .post('/reserve/kitOut', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
