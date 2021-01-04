import { applySpec, pathOr } from 'ramda'

const TypeAccountSpec = {
  addAccessories: pathOr(false, ['addAccessories']),
  addAnalyze: pathOr(false, ['addAnalyze']),
  addCar: pathOr(false, ['addCar']),
  addCompany: pathOr(false, ['addCompany']),
  addEntr: pathOr(false, ['addEntr']),
  addEntry: pathOr(false, ['addEntry']),
  addEquip: pathOr(false, ['addEquip']),
  addEquipType: pathOr(false, ['addEquipType']),
  addFonr: pathOr(false, ['addFonr']),
  addKit: pathOr(false, ['addKit']),
  addKitOut: pathOr(false, ['addKitOut']),
  addMark: pathOr(false, ['addMark']),
  addOutPut: pathOr(false, ['addOutPut']),
  addPart: pathOr(false, ['addPart']),
  addProd: pathOr(false, ['addProd']),
  addRML: pathOr(false, ['addRML']),
  addROs: pathOr(false, ['addROs']),
  addStatus: pathOr(false, ['addStatus']),
  addTec: pathOr(false, ['addTec']),
  addType: pathOr(false, ['addType']),
  addTypeAccount: pathOr(false, ['addTypeAccount']),
  addUser: pathOr(false, ['addUser']),
  customized: pathOr(false, ['allowCustomPermissions']),
  delROs: pathOr(false, ['delROs']),
  gerROs: pathOr(false, ['gerROs']),
  labTec: pathOr(false, ['labTec']),
  modulo: pathOr(false, ['suprimento']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  stock: pathOr(true, ['stock']),
  suprimento: pathOr(false, ['suprimento']),
  tecnico: pathOr(false, ['tecnico']),
  typeName: pathOr('', ['typeName']),
  updateRos: pathOr(false, ['updateRos']),
}

const buildTypeAccount = applySpec(TypeAccountSpec)

export default buildTypeAccount
