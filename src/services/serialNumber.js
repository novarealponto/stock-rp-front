import axiosInstance from '../helpers/request'

export const getSerial = (serialNumber, paranoid) => {
  return axiosInstance
    .get('/equip/serialNumber', {
      params: { serialNumber, paranoid },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
