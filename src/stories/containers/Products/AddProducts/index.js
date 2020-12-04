import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import AddProduct from '../../../../containers/Product/AddProduct';
import { validators } from '../../../../pages/Cadastros/NovoProduto/ProdutoContainer/validators';

export default {
  title: 'Containers/Products/AddProducts',
  component: AddProduct,
};

const initialState = {
  corredor: '',
  category: '',
  coluna: '',
  descricao: '',
  gaveta: '',
  item: '',
  mark: 'Não selecionado',
  quantMin: 1,
  serial: false,
  type: 'Não selecionado',
  prateleira: '',
};

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
];

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
];

const formErrorInitialState = {
  item: null
}

const handleChangeAction = action('HANDLE CHANGE ACTION');
const openModalMarkAction = action('OPEN MODAL MARK');
const openModalTypeAction = action('OPEN MODAL TYPE');
const closeModalAction = action('CLOSE MODAL');
const changeLoadingAction = action('LOADING');
const addNewProductAction = action('ADD NEW PRODUCT')
const saveModalDataAction = action('SAVE MODAL DATA')
const getAllMarcaAction = action('GET ALL MARCA')
const onBlurValidatorAction = action('ON BLUR VALIDATOR')

const Template = () => {
  const [form, setForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState(formErrorInitialState);
  const [loading, setLoading] = useState(false);
  const [visibleMark, setVisibleMark] = useState(false);
  const [visibleType, setVisibleType] = useState(false);

  const changeLoading = () => {
    setLoading(true)
    changeLoadingAction(true)
  }

  const openModalMark = () => {
    setVisibleMark(true);
    openModalMarkAction(true);
  };

  const openModalType = () => {
    setVisibleType(true);
    openModalTypeAction(true);
  };

  const closeModal = () => {
    setVisibleMark(false);
    setVisibleType(false);
    closeModalAction(true);
  };

  const getAllMarca = () => {
    getAllMarcaAction(true)
  }

  const addNewProduct=() => {
    changeLoading(true)
    addNewProductAction(true)
    form.submit()
  }

  const saveModalData = () => {
    saveModalDataAction(true)
  }

  const hadleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    handleChangeAction({
      [event.target.name]: event.target.value,
    });
  };

  const onBlurValidator = ({target}) => {
    const { name, value } = target;
    const messageError = validators(name, value)
    setFormErrors({
      ...formErrors,
      [name]: messageError,
    })
    onBlurValidatorAction(true)
  }

  return (
    <AddProduct
      {...form}
      addNewProduct={addNewProduct}
      saveModalData={saveModalData}
      handleOnChange={hadleOnChange}
      getAllMarca={getAllMarca}
      onBlurValidator={onBlurValidator}
      openModalMark={openModalMark}
      visibleMark={visibleMark}
      openModalType={openModalType}
      visibleType={visibleType}
      closeModal={closeModal}
      loading={loading}
      marksList={marksList}
      typesList={typesList}
      formErrors={formErrors}
    />
  );
};

export const Default = Template.bind({});
