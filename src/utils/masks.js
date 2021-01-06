import { length } from 'ramda'

export default (form, name, value) => {
  let valueMasked = value

  switch (name) {
    case 'cnpjOrCpf':
      if (length(value.replace(/\D/g, '')) > 11) {
        valueMasked = value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
      } else {
        valueMasked = value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
      }
      break
    case 'cnpj':
      valueMasked = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
      break
    case 'telphone':
      if (length(value) <= 14) {
        valueMasked = value
          .replace(/\D/g, '')
          .replace(/(\d)/, '($1')
          .replace(/(\d{2})(\d)/, '$1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{4})\d+?$/, '$1')
      } else {
        valueMasked = value
          .replace(/\D/g, '')
          .replace(/(\d)/, '($1')
          .replace(/(\d{2})(\d)/, '$1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .replace(/(-\d{4})\d+?$/, '$1')
      }
      break
    case 'zipCode':
      valueMasked = value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
      break
    default:
  }

  return form.setFieldsValue({ [name]: valueMasked })
}
