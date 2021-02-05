import axiosInstance from '../../helpers/request'

export const NovaSaida = values => {
  return axiosInstance
    .post('/suprimentos/out', values)
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};

export const GetOut = query => {
  return axiosInstance
    .get('/suprimentos/out', {
      params: { query }
    })
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};
