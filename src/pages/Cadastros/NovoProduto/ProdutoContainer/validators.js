import {
  isEmpty,
  isNil,
  replace,
  pipe,
} from 'ramda'

const slideData = value => value.slice(0, 30)
export const masks = pipe(
  replace(/\W/ig),
  slideData
)


export const validators = (name, value) => {
  const message = 'É obrigatório!'

  if (isEmpty(value) || isNil(value)) {
    return message
  }

  return null
}