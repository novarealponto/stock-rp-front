import axiosInstance from '../helpers/request'

export const newReservaInterno = (value) => {
  return axiosInstance
    .post('/reserve/RInterno', value)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const newReservaOs = (values) => {
  return axiosInstance
    .post('/reserve/OS', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const updateReservaOs = (values) => {
  return axiosInstance
    .put('/reserve/OS', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getOsByOs = (value) => {
  return axiosInstance
    .get('/reserve/getOsByOs', {
      params: { os: value },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getTodasOs = (query) => {
  return axiosInstance
    .get('/reserve/Os', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllOsPartsByParams = (query) => {
  return axiosInstance
    .get('/reserve/getAllOsPartsByParams', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllOsParts = (query) => {
  return axiosInstance
    .get('/reserve/getAllOsParts', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllOsPartsByParamsForReturn = (query) => {
  return axiosInstance
    .get('/reserve/getAllOsPartsByParams/return', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const associarEquipParaOsPart = (values) => {
  return axiosInstance
    .put('/reserve/reservaTecnico/associarEquipParaOsPart', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const associarEquipsParaOsPart = (values) => {
  return axiosInstance
    .put('/reserve/reservaTecnico/associarEquipsParaOsPart', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getTodasOsInterno = (query) => {
  return axiosInstance
    .get('/reserve/RInterno', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const baixaReservaOs = (values) => {
  return axiosInstance
    .put('/reserve/output', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const retornarBaixaReservaOs = (values) => {
  return axiosInstance
    .put('/reserve/returnOutput', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const removeReservaOs = (query) => {
  return axiosInstance
    .delete('/reserve/Os', {
      params: query,
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const newConserto = (values) => {
  return axiosInstance
    .post('/conserto', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const checkout = (value) => {
  return axiosInstance
    .put('/reserve/OS/finalizarCheckout', value)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
