import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { Form, message } from 'antd';
import PropTypes from 'prop-types';

import buildProduct from '../../../utils/productSpec';
import EditProductContainer from '../../../containers/Product/Edit'
import {
  getAllProductType,
  getMarca,
  updateProduto
} from '../../../services/produto';

const success = () => message.success('Produto foi atualizado');
const errorMessage = () => message.error('Houve um erro ao atualizar produto');

const EditProduct = ({history, produtoUpdateValue}) => {
  const [form] = Form.useForm();
  const [marksList, setMarkList] = useState([])
  const [typesList, setTypesList] = useState([])

  useEffect(() => {
    getAllMarca();
    getAllTipo();
  }, []);

  const getAllMarca = async () => {
    try {
      const { data, status } = await getMarca({});
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setMarkList(data);
    } catch (error) {
      console.log(error)
    }
  }

  const getAllTipo = async () => {
    try {
      const { data, status } = await getAllProductType();
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setTypesList(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (formData) => {
    try {
      await updateProduto(buildProduct({...produtoUpdateValue, ...formData}));
      history.push('/logged/product/manager')
      success();
    } catch (error) {
      errorMessage();
    }
  }

  return (
    <EditProductContainer
      form={form}
      initialValues={produtoUpdateValue}
      handleSubmit={handleSubmit}
      marksList={marksList}
      typesList={typesList}
    />
  )
}

const mapStateToProps = ({ auth, produtoUpdateValue }) => ({
  auth,
  produtoUpdateValue
})

const enhanced = compose(
  connect(mapStateToProps),
);

EditProduct.propTypes = {
  auth: PropTypes.shape({
    modulo: PropTypes.bool.isRequired,
  }).isRequired,
};

export default enhanced(EditProduct)
