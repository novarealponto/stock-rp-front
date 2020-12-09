import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { redirectValueUsuario } from '../../Gerenciar/Produto/ProdutoRedux/action';
import { getUsers } from '../../../services/usuario';
import ManagerContainer from '../../../containers/User/Manager';
import { compose, isEmpty, path, pathOr } from 'ramda';

const Manager = ({
  auth,
  history,
  redirectValueUsuario,
}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [shouldRequest, setShouldRequest] = useState(true)

  useEffect(() => {
    if (shouldRequest) {
      getAllUsers()
    }
  }, [
    shouldRequest,
  ])

  const goToAddUser = () => history.push('/logged/user/add')
  const goToUpdateUser = user => {
    redirectValueUsuario(user)
    history.push('/logged/user/edit')
  }

  const getAllUsers = async (query = {}) => {
    try {
      const { data } = await getUsers(query)
      const rows = pathOr([], ['rows'], data)
      setData(rows.map(row => ({ ...row, key: row.id })))
      setLoading(false)
      setShouldRequest(false)
    } catch (error) {
      setLoading(false)
      setShouldRequest(false)
    }
  };

  const handleSearch = async(username) => {
    setLoading(true)
    const query = {
      filters: {
        user: {
          specific: {
            username,
            modulo: path(['modulo'], auth),
          }
        },
        page: 1,
        total: 10,
      },
    };

    if (isEmpty(username)) {
      return getAllUsers()
    }

    return getAllUsers(query)
  }

  return (
    <ManagerContainer
      data={data}
      goToAddUser={goToAddUser}
      goToUpdateUser={goToUpdateUser}
      handleSearch={handleSearch}
      loading={loading}
    />
  )
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispacthToProps = dispach => bindActionCreators(
  { redirectValueUsuario },
  dispach
);

const enhanced = compose(
  connect(mapStateToProps, mapDispacthToProps),
  withRouter,
);

Manager.propTypes = {
  auth: PropTypes.shape({
    modulo: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  redirectValueUsuario: PropTypes.func.isRequired,
};

export default enhanced(Manager);
