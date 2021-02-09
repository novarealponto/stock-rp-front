import axiosInstance from '../helpers/request'

export const newEntrada = (values) => {
  return axiosInstance
    .post('/entrance', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const updateEntrada = (values) => {
  return axiosInstance
    .put('/entrance', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const deleteEntrada = (id) => {
  return axiosInstance
    .delete('/entrance', { params: { id } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getEntrada = (query) => {
  return axiosInstance
    .get('/entrance', { params: { query } })
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      throw new Error(error)
    })
}
