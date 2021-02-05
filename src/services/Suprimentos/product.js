import axiosInstance from '../../helpers/request'

export const NewSupProduct = values => {
  return axiosInstance
    .post('/suprimentos/product', values)
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};

export const UpdateSupProduct = values => {
  return axiosInstance
    .put('/suprimentos/product', values)
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};

export const GetSupProduct = query => {
  return axiosInstance
    .get('/suprimentos/product', {
      params: { query }
    })
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};

export const NewManufacturer = values => {
  return axiosInstance
    .post('/suprimentos/manufacturer', values)
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};

export const UpdateManufacturer = values => {
  return axiosInstance
    .put('/suprimentos/manufacturer', values)
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};

export const GetManufacturer = query => {
  return axiosInstance
    .get('/suprimentos/manufacturer', {
      params: { query }
    })
    .then(resp => resp)
    .catch((error) => {
      throw new Error(error)
    })
};
