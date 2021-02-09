import axiosInstance from '../helpers/request'

export const newTypeAccount = (values) => {
  return axiosInstance
    .post('/typeAccount', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getTypeAccount = (query) => {
  return axiosInstance.get('/typeAccount', { params: { query } }).then(
    resp => resp
  ).catch((error) => {
    throw new Error(error)
  })
}
