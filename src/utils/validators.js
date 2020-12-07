export const validatePlate = async (value) => {
  if(/\W/.test(value)){
    return Promise.reject(new Error('Digite apenas caracteres alfanumérico'));
  }
}
