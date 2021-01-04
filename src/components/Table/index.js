import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const TableComponent = ({ columns, data, pagination, onChange }) => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={pagination}
    onChange={onChange}
  />
)

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  onChange: PropTypes.func,
}

export default TableComponent
