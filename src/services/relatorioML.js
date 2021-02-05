import axiosInstance from '../helpers/request'

export const getRelatorioML = (query) => {
  return axiosInstance
    .get('/reserve/freeMarket', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
