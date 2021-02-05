import axiosInstance from '../helpers/request'

export const stock = (query) => {
  return axiosInstance
    .get('/stock', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
};

export const UpdatteProductBase = (value) => {
  return axiosInstance
    .put('/stock/updateProductBase', value)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
};
