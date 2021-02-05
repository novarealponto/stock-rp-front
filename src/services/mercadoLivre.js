import axiosInstance from '../helpers/request'

export const NewReservaML = (values) => {
  return axiosInstance
    .post('/reserve/freeMarket', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
