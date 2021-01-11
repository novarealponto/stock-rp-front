import React, { useCallback, useEffect, useState } from 'react'
import { map, propOr } from 'ramda'
import { Form, message } from 'antd'

import LoanContainer from '../../containers/Loan'
import {
  buildAvailableList,
  buildNewLoan,
  buildReservedList,
  buildTechnician,
} from './specs'
import { getTecnico } from '../../services/tecnico'
import {
  addEprestimo,
  deleteEmprestimoService,
  getEprestimoService,
  updateEprestimo,
  CreatePDFEmprestimo,
} from '../../services/emprestimo'
import { getAllEquipsService } from '../../services/equip'

const Loan = () => {
  const [current, setCurrent] = useState(1)
  const [dataSource, setDatasource] = useState([])
  const [formModal] = Form.useForm()
  const [formSearch] = Form.useForm()
  const [select, setSelect] = useState('disponiveis')
  const [technicianList, setTechnicianList] = useState([])
  const [total, setTotal] = useState(0)
  const [visibleModal, setvisibleModal] = useState(false)
  const [visibleSearch, setVisibleSearch] = useState(false)

  const get = useCallback(
    (search) => {
      const mark = propOr('', 'mark')(search)
      const name = propOr('', 'product')(search)
      const page = propOr(1, 'current')(search)
      const razaoSocial = propOr('', 'razaoSocial')(search)
      const serialNumber = propOr('', 'serialNumber')(search)

      setCurrent(page)

      if (select === 'disponiveis') {
        const query = {
          filters: {
            equip: {
              specific: {
                inClient: false,
                loan: true,
                serialNumber,
              },
            },
            mark: {
              specific: {
                mark,
              },
            },
            product: {
              specific: {
                name,
              },
            },
          },
          page,
          total: 10,
        }

        getAllEquipsService(query).then(({ data: { rows, count } }) => {
          setDatasource(map(buildAvailableList, rows))
          setTotal(count)
        })
      } else if (select === 'reservados' || select === 'emCliente') {
        const query = {
          filters: {
            emprestimo: {
              specific: {
                dateExpedition:
                  select === 'emCliente'
                    ? {
                        start: '2019/01/01',
                        end: new Date(),
                      }
                    : {
                        start: new Date(),
                      },
                razaoSocial,
              },
            },
            equip: {
              specific: {
                serialNumber,
              },
            },
            product: {
              specific: {
                name,
              },
            },
          },
          page,
          total: 10,
        }

        getEprestimoService(query).then(({ data: { rows, count } }) => {
          setDatasource(map(buildReservedList, rows))
          setTotal(count)
        })
      } else {
        setDatasource([])
      }
    },
    [select]
  )

  useEffect(() => {
    get()
  }, [get])

  useEffect(() => {
    getTecnico({ total: 100 }).then(({ data }) =>
      setTechnicianList(map(buildTechnician, data))
    )
  }, [])

  const handleCancelModal = () => {
    formModal.resetFields()
    setvisibleModal(false)
  }

  const handleClickIconEditReserve = (rowValues) => {
    formModal.setFieldsValue(rowValues)
    setvisibleModal(true)
  }

  const handleClickIconRollBack = (rowValues) => {
    formModal.setFieldsValue(rowValues)
    setvisibleModal(true)
  }

  const handleOk = async (formData) => {
    try {
      if (select === 'disponiveis') {
        const { status } = await addEprestimo(buildNewLoan(formData))
        if (status === 422 || status === 500) {
          throw new Error('422 Unprocessable Entity!')
        }

        handleCancelModal()
        message.success('Reserva efetuada com sucesso')
      }
      if (select === 'emCliente') {
        const { key: id } = formData
        const { status } = await deleteEmprestimoService({ id })
        if (status === 422 || status === 500) {
          throw new Error('422 Unprocessable Entity!')
        }
        handleCancelModal()
        message.success('Equipamento retornado com sucesso')
      }
      if (select === 'reservados') {
        const { status } = await updateEprestimo(buildNewLoan(formData))
        if (status === 422 || status === 500) {
          throw new Error('422 Unprocessable Entity!')
        }
        handleCancelModal()
        message.success('Reserva atualizada com sucesso')
      }
      get()
    } catch (error) {
      handleCancelModal()
      message.error('Houve um erro')
      console.log(error)
    }
  }

  const handleClickIconAddReserve = ({ serialNumber, key }) => {
    formModal.setFieldsValue({ serialNumber, key })
    setvisibleModal(true)
  }

  const handleClickDeletReserve = async ({ key: id }) => {
    try {
      const { status } = await deleteEmprestimoService({ id })
      if (status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      get()
      message.success('Reserva excluida com sucesso')
    } catch (error) {
      message.error('Erro ao excluir reserva')
      console.log(error)
    }
  }
  const onChangeSelect = (value) => {
    setSelect(value)
    formSearch.resetFields()
  }

  const handleSearch = (formData) => get(formData)

  const handleClickPrint = async () => {
    const type = {
      disponiveis: 'Disponiveis',
      emCliente: 'Em Cliente',
      reservados: 'Reservados',
    }[select]

    if (select === 'emCliente' || select === 'reservados') {
      const query = {
        filters: {
          emprestimo: {
            specific: {
              dateExpedition: {
                reservados: {
                  start: new Date(),
                },
                emCliente: {
                  start: '2019/01/01',
                  end: new Date(),
                },
              }[select],
            },
          },
        },
        page: 1,
        total: null,
      }

      const {
        status,
        data: { rows },
      } = await getEprestimoService(query)
      if (status === 200) {
        await CreatePDFEmprestimo(type, rows)
      }
    }

    if (select === 'disponiveis') {
      const query = {
        filters: {
          equip: {
            specific: {
              loan: true,
              inClient: false,
            },
          },
        },
        page: 1,
        total: null,
      }

      const {
        status,
        data: { rows },
      } = await getAllEquipsService(query)
      if (status === 200) {
        await CreatePDFEmprestimo(type, rows)
      }
    }
  }

  return (
    <LoanContainer
      dataSource={dataSource}
      formModal={formModal}
      formSearch={formSearch}
      handleCancelModal={handleCancelModal}
      handleChangeTable={get}
      handleClickDeletReserve={handleClickDeletReserve}
      handleClickIconAddReserve={handleClickIconAddReserve}
      handleClickIconEditReserve={handleClickIconEditReserve}
      handleClickIconRollBack={handleClickIconRollBack}
      handleClickPrint={handleClickPrint}
      handleOk={handleOk}
      handleSearch={handleSearch}
      select={select}
      showSearch={() => setVisibleSearch(!visibleSearch)}
      onChangeSelect={onChangeSelect}
      pagination={{ showSizeChanger: false, total, current }}
      technicianList={technicianList}
      visibleModal={visibleModal}
      visibleSearch={visibleSearch}
    />
  )
}

export default Loan
