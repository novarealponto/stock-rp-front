import axiosInstance from '../helpers/request'

export const newReservaTecnico = (value) => {
  return axiosInstance
    .post('/reserve/reservaTecnico', value, {})
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllReservaTecnico = (query) => {
  return axiosInstance
    .get('/reserve/reservaTecnico', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllReservaTecnicoReturn = (query) => {
  return axiosInstance
    .get('/reserve/reservaTecnico/return', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
