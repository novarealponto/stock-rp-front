import axiosInstance from '../helpers/request'

export const getRelatorioPerda = (query) => {
  return axiosInstance
    .get('/reserve/kitOut', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
