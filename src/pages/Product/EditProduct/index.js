import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import PropTypes from 'prop-types';

import EditProductContainer from '../../../containers/Product/Edit'

const EditProduct = () => {
  return (
    <EditProductContainer/>
  )
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const enhanced = compose(
  connect(mapStateToProps),
);

EditProduct.propTypes = {
  auth: PropTypes.shape({
    modulo: PropTypes.bool.isRequired,
  }).isRequired,
};

export default enhanced(EditProduct);
