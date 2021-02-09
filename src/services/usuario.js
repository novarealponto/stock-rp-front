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
  .get('/user/getById', { params: { id } })
  .then((resp) => resp)
  .catch((error) => {
    throw new Error(error)
  })
}
<<<<<<< HEAD
=======

export const getUserById = async (id) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.get(`${BACKEND_URL}/api/user/getById`, { headers: headers, params: { id } }).then(
    resp => {
      response = resp
    }
  ).catch((error) => {
    if (error.response) {
      response = error.response
    } else {
      console.log('Error', error.message);
    }
  })
  return response
}
>>>>>>> 7c53950... chore: all changes
