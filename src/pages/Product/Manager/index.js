import React, { useCallback, useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { compose, map } from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { buildDataSource, buildQueryProduct, buildRedirectValueProduct } from './specs'
import {
  getProdutos,
} from '../../../services/produto'
import ManagerContainer from '../../../containers/Product/Manage'
import { setValueProduto } from '../../../store/Actions/product'

const Manager = ({ history, setValueProduto }) => {
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [queryProduct, setQueryProduct] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleSearch, setVisibleSearch] = useState()

  const getAllProducts = useCallback(() => {
    const { product, category, brand, type } = queryProduct
    const query = {
      filters: {
        product: {
          specific: {
            name: product,
            category,
          },
        },
        mark:{
          specific: {
            mark: brand
          }
        },
        equipType:{
          specific: {
            type
          }
        }
      },
      page,
      paranoid: true,
      required: true,
      total: 10,
    }

    getProdutos(query).then(({ data: { rows, count: total } }) => {
      setDataSource(map(buildDataSource, rows))

      setTotal(total)
    })
  }, [page, queryProduct])

  const handleOnChangeTable = ({ current }) => setPage(current)

  const handleOnClickEdit = (productData) => {
    setValueProduto(buildRedirectValueProduct(productData))

    history.push('/logged/product/edit')
  }

  const handleOnClickNewProduct = () => {
    history.push('/logged/product/add')
  }

  const handleProductSearch = (productSearchFormData) => {
    setQueryProduct(buildQueryProduct(productSearchFormData))
  }

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts])

  return (
    <ManagerContainer
      dataSource={dataSource}
      handleOnChangeTable={handleOnChangeTable}
      handleOnClickCloseSearchForm={() => setVisibleSearch(false)}
      handleOnClickEdit={handleOnClickEdit}
      handleOnClickNewProduct={handleOnClickNewProduct}
      handleOnClickOpenSearchForm={() => setVisibleSearch(true)}
      handleOnSearch={handleProductSearch}
      pagination={{ total }}
      visibleSearch={visibleSearch}
    />
  )
}

const mapStateToProps = () => ({})

const mapDispacthToProps = (dispatch) =>
  bindActionCreators({ setValueProduto }, dispatch)

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(Manager)
