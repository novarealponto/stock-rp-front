import axiosInstance from '../helpers/request'

export const getUsers = (query) => {
  return axiosInstance
    .get('/user/getAll', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getResourcesByTypeAccount = (query) => {
  return axiosInstance
    .get('/typeAccount/getResourcesByTypeAccount', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const NovoUsuarioService = (values) => {
  return axiosInstance
    .post('/user', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const updateUsuario = (values) => {
  return axiosInstance
    .put('/user', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getUserById = (id) => {
  return axiosInstance
  .get('/user/getById', values)
  .then((resp) => resp)
  .catch((error) => {
    throw new Error(error)
  })
}
