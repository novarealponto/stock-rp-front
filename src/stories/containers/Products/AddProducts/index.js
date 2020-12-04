import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import AddProduct from '../../../../containers/Product/AddProduct'
import { validators } from '../../../../pages/Product/AddProduct/validators'

export default {
  title: 'Containers/Products/AddProducts',
  component: AddProduct,
}

const initialState = {
  category: '',
  coluna: '',
  corredor: '',
  descricao: '',
  gaveta: '',
  item: '',
  mark: 'Não selecionado',
  prateleira: '',
  quantMin: 1,
  serial: false,
  type: 'Não selecionado',
}

const marksList = [
  {
    mark: 'TesteMarca',
  },
  {
    mark: 'TesteMarca1',
  },
  {
    mark: 'TesteMarca2',
  },
]

const typesList = [
  {
    type: 'TesteTipo',
  },
  {
    type: 'TesteTipo1',
  },
  {
    type: 'TesteTipo2',
  },
]

const formErrorInitialState = {}

const addNewProductAction = action('ADD NEW PRODUCT')
const changeLoadingAction = action('LOADING')
const closeModalAction = action('CLOSE MODAL')
const getAllMarcaAction = action('GET ALL MARCA')
const handleChangeAction = action('HANDLE CHANGE ACTION')
const onBlurValidatorAction = action('ON BLUR VALIDATOR')
const openModalMarkAction = action('OPEN MODAL MARK')
const openModalTypeAction = action('OPEN MODAL TYPE')
const saveModalDataAction = action('SAVE MODAL DATA')

const Template = () => {
  const [form, setForm] = useState(initialState)
  const [formErrors, setFormErrors] = useState(formErrorInitialState)
  const [loading, setLoading] = useState(false)
  const [visibleMark, setVisibleMark] = useState(false)
  const [visibleType, setVisibleType] = useState(false)

  const addNewProduct = () => {
    changeLoading(true)
    addNewProductAction(form)
  }

  const changeLoading = () => {
    setLoading(true)
    changeLoadingAction(true)
  }

  const closeModal = () => {
    setVisibleMark(false)
    setVisibleType(false)
    closeModalAction(true)
  }

  const getAllMarca = () => {
    getAllMarcaAction(true)
  }

  const hadleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
    handleChangeAction({
      [event.target.name]: event.target.value,
    })
  }

  const onBlurValidator = ({target}) => {
    const { name, value } = target
    const messageError = validators(name, value)
    setFormErrors({
      ...formErrors,
      [name]: messageError,
    })
    onBlurValidatorAction(true)
  }

  const openModalMark = () => {
    setVisibleMark(true)
    openModalMarkAction(true)
  }

  const openModalType = () => {
    setVisibleType(true);
    openModalTypeAction(true);
  }

  const saveModalData = () => {
    saveModalDataAction(true)
  }

  return (
    <AddProduct
      {...form}
      addNewProduct={addNewProduct}
      closeModal={closeModal}
      formErrors={formErrors}
      getAllMarca={getAllMarca}
      handleOnChange={hadleOnChange}
      loading={loading}
      marksList={marksList}
      onBlurValidator={onBlurValidator}
      openModalMark={openModalMark}
      openModalType={openModalType}
      saveModalData={saveModalData}
      typesList={typesList}
      visibleMark={visibleMark}
      visibleType={visibleType}
    />
  )
}

export const Default = Template.bind({})
