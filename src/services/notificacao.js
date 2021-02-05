import axiosInstance from '../helpers/request'

export const notifications = (query) => {
  return axiosInstance
    .get('/notification', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const hasNotifications = () => {
  return axiosInstance
    .get('/notification/has')
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
