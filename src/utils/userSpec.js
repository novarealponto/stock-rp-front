import { applySpec, pathOr } from 'ramda'

const UserSpec = {
  permissions: applySpec({
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
    delROs: pathOr(false, ['delROs']),
    gerROs: pathOr(false, ['gerROs']),
    suprimento: pathOr(false, ['suprimento']),
    tecnico: pathOr(false, ['tecnico']),
    updateRos: pathOr(false, ['updateRos']),
  }),
  customized: pathOr(false, ['allowCustomPermissions']),
  modulo: pathOr(false, ['suprimento']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  typeName: pathOr('', ['typeAccount']),
  username: pathOr('', ['userName']),
}

const buildUser = applySpec(UserSpec)

export default buildUser
