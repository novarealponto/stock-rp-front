import { isEmpty, length } from 'ramda'

import { getSerial } from '../services/serialNumber'

export const validatePlate = async (value) => {
  if (/\W/.test(value)) {
    return Promise.reject(new Error('Digite apenas caracteres alfanumérico'))
  }
}

export const validateSerialNumberForEntry = async (
  currentTargetValue,
  noRequest = false
) => {
  const currentValueSerialNumber = currentTargetValue.split(/\n/)
  const lastPosition = length(currentValueSerialNumber) - 1

  const findSerialNumber = currentValueSerialNumber.filter(
    (serialNumber) => serialNumber === currentValueSerialNumber[lastPosition]
  )

  const setSerialNumberModal = (error) => {
    currentValueSerialNumber.splice(lastPosition, 1)
    return { serialNumbers: currentValueSerialNumber.join('\n'), error }
  }

  if (isEmpty(currentValueSerialNumber[lastPosition])) {
    return setSerialNumberModal('Insída um número!')
  }

  if (findSerialNumber && length(findSerialNumber) > 1) {
    return setSerialNumberModal('Número de série já foi adicionado!')
  }

  if (noRequest) return

  const { data } = await getSerial(currentValueSerialNumber[lastPosition])

  if (data) {
    return setSerialNumberModal('Número de série já registrado!')
  }
}
