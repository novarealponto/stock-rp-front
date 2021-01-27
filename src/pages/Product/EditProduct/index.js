import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { Form } from 'antd';
import PropTypes from 'prop-types';

import EditProductContainer from '../../../containers/Product/Edit'
import {
  getAllProductType,
  getMarca,
} from '../../../services/produto';

const EditProduct = () => {
  const [form] = Form.useForm();
  const [marksList, setMarkList] = useState([])
  const [typesList, setTypesList] = useState([])

  useEffect(() => {
    getAllMarca();
    getAllTipo();
  }, []);

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

  return (
    <EditProductContainer
      form={form}
      // handleSubmit={handleSubmit}
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
