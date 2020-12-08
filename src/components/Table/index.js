import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const TableComponent = ({ columns, data }) => (
  <Table columns={columns} dataSource={data} />
);

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default TableComponent;
