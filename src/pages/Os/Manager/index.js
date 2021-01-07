import React, { useCallback, useEffect, useState } from 'react'
import { compose, map } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import ManagerContainer from '../../../containers/Manager/Os'
import {
  getTodasOs as getAllOsService,
  removeReservaOs,
} from '../../../services/reservaOs'
import { redirectValueOs } from '../../Gerenciar/Os/OsRedux/action'
import { buildDataSource, buildQueryOs, buildRedirectValueOs } from './specs'

const Manager = ({ history, redirectValueOs }) => {
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [queryOs, setQueryOs] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleSearch, setVisibleSearch] = useState()

  const getAllOs = useCallback(() => {
    const { cnpj, date, name, os, razaoSocial } = queryOs
    const query = {
      filters: {
        os: {
          specific: {
            cnpj,
            date,
            os,
            razaoSocial,
          },
        },
        product: {
          specific: {
            name,
          },
        },
      },
      page,
      paranoid: true,
      required: true,
      total: 10,
    }

    getAllOsService(query).then(({ data: { rows, count: total } }) => {
      setDataSource(map(buildDataSource, rows))
      setTotal(total)
    })
  }, [page, queryOs])

  const handleOnChangeTable = ({ current }) => setPage(current)

  const handleOnClickEdit = (osData) => {
    redirectValueOs(buildRedirectValueOs(osData))

    history.push('update')
  }

  const handleOnSearch = (osSearchFormData) => {
    setQueryOs(buildQueryOs(osSearchFormData))
  }

  const handleOnClickDelet = async (osId) => {
    try {
      await removeReservaOs({ osId })
      getAllOs()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getAllOs()
  }, [getAllOs])

  return (
    <ManagerContainer
      dataSource={dataSource}
      handleOnChangeTable={handleOnChangeTable}
      handleOnClickCloseSearchForm={() => setVisibleSearch(false)}
      handleOnClickEdit={handleOnClickEdit}
      handleOnClickDelet={handleOnClickDelet}
      handleOnClickOpenSearchForm={() => setVisibleSearch(true)}
      handleOnSearch={handleOnSearch}
      pagination={{ total }}
      visibleSearch={visibleSearch}
    />
  )
}

const mapStateToProps = () => ({})

const mapDispacthToProps = (dispatch) =>
  bindActionCreators({ redirectValueOs }, dispatch)

const enhanced = compose(connect(mapStateToProps, mapDispacthToProps), withRouter)

export default enhanced(Manager)
