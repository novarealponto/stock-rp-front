import { applySpec, concat, path, pathOr } from 'ramda'

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

export const buildUser = applySpec(UserSpec)

export const buildUserUpdate = (value) => {
<<<<<<< HEAD
=======
  console.log(value);
>>>>>>> 7c53950... chore: all changes
  let pathResource = []

  if (!value.resource) {
    pathResource = ['typeAccount', 'resource']
  } else {
    pathResource = ['resource']
  }

  return applySpec({
<<<<<<< HEAD
    addCar: path(concat(pathResource, ['addCar'])),
    addEntr: path(concat(pathResource, ['addEntr'])),
    addFonr: path(concat(pathResource, ['addFonr'])),
    addKit: path(concat(pathResource, ['addKit'])),
    addKitOut: path(concat(pathResource, ['addKitOut'])),
    addMark: path(concat(pathResource, ['addMark'])),
    addOutPut: path(concat(pathResource, ['addOutPut'])),
    addProd: path(concat(pathResource, ['addProd'])),
    addRML: path(concat(pathResource, ['addRML'])),
    addROs: path(concat(pathResource, ['addROs'])),
    addStatus: path(concat(pathResource, ['addStatus'])),
    addTec: path(concat(pathResource, ['addTec'])),
    addType: path(concat(pathResource, ['addType'])),
    addTypeAccount: path(concat(pathResource, ['addTypeAccount'])),
    addUser: path(concat(pathResource, ['addUser'])),
    allowCustomPermissions: pathOr(false, ['customized']),
    delROs: path(concat(pathResource, ['delROs'])),
    gerROs: path(concat(pathResource, ['gerROs'])),
    id: pathOr('', ['id']),
    suprimento: path(concat(pathResource, ['suprimento'])),
    typeAccount: pathOr('', ['typeAccount', 'typeName']),
    updateRos: path(concat(pathResource, ['updateRos'])),
    userName: pathOr('', ['username']),
=======
    id: pathOr('', ['id']),
    userName: pathOr('', ['username']),
    typeAccount: pathOr('', ['typeAccount', 'typeName']),
    allowCustomPermissions: pathOr(false, ['customized']),
    addTypeAccount: path(concat(pathResource, ['addTypeAccount'])),
    addUser: path(concat(pathResource, ['addUser'])),
    addTec: path(concat(pathResource, ['addTec'])),
    addCar: path(concat(pathResource, ['addCar'])),
    addMark: path(concat(pathResource, ['addMark'])),
    addType: path(concat(pathResource, ['addType'])),
    addStatus: path(concat(pathResource, ['addStatus'])),
    addProd: path(concat(pathResource, ['addProd'])),
    addFonr: path(concat(pathResource, ['addFonr'])),
    addEntr: path(concat(pathResource, ['addEntr'])),
    addKit: path(concat(pathResource, ['addKit'])),
    addKitOut: path(concat(pathResource, ['addKitOut'])),
    addOutPut: path(concat(pathResource, ['addOutPut'])),
    addROs: path(concat(pathResource, ['addROs'])),
    addRML: path(concat(pathResource, ['addRML'])),
    gerROs: path(concat(pathResource, ['gerROs'])),
    delROs: path(concat(pathResource, ['delROs'])),
    updateRos: path(concat(pathResource, ['updateRos'])),
    suprimento: path(concat(pathResource, ['suprimento'])),
>>>>>>> 7c53950... chore: all changes
  })(value)
}
