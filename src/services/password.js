import axiosInstance from '../helpers/request'

export const updateSenha = (values) => {
  return axiosInstance
    .put('/user/updatePassword', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
