import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { message } from 'antd'

import { validators } from './validators'
import {
  newMarca,
  newTipo,
  newProduto,
  getTipo,
  getMarca
} from '../../../../services/produto'
import AddProduct from '../../../../containers/Register/AddProduct'
import buildProduct from './productSpec'

const initialState = {
  messageError: false,
  typesList: [],
  marksList: [],
  messageSuccess: false,
  itemArray: [],
  item: '',
  corredor: '',
  coluna: '',
  prateleira: '',
  gaveta: '',
  category: 'Equipamento',
  mark: 'Não selecionado',
  type: 'Não selecionado',
  descricao: '',
  quantMin: 1,
  visibleMark: false,
  visibleType: false,
  newMark: '',
  newType: '',
  newDescricao: '',
  loading: false,
  serial: false,
  formErrors: {
    item: null,
  },
  message: {
    item: '',
    quantMin: '',
  },
  responsibleUser: 'modrp',
}
class NovoProduto extends Component {
  state = initialState

  onChangeQuantMin = value => {
    this.setState({
      quantMin: value ? value : 1
    })
  }

  success = () => {
    message.success("O cadastro foi efetuado")
  }

  error = () => {
    message.error("O cadastro não foi efetuado")
  }

  errorQuant = () => {
    message.error("Coloque a quantidade mínima")
  }

  componentDidMount = async () => {
    await this.getAllMarca()
    await this.getAllTipo()
  }

  getAllTipo = async () => {
    try {
      const { data } = await getTipo()
      this.setState({ typesList: data })
    } catch (error) {
      console.log(error)
    }
  }

  getAllMarca = async mark => {
    const query = {
      filters: {
        mark: {
          specific: {
            mark
          }
        }
      }
    }

    try {
      const { data } = await getMarca(query)
      this.setState({ marksList: data, newMarca: '' })
    } catch (error) {
      this.error()
    }
  }

  addNewProduct = async () => {
    this.setState({ loading: true })
    const { modulo } = this.props.auth

    const productFormatted = buildProduct({
      ...this.state,
      modulo,
    })

    try {
      await newProduto(productFormatted)
      this.setState(initialState)
      await this.success()

    } catch (error) {
      await this.error()
      console.log(error)
    }
  }

  createNewMark = async () => {
    const { newMark, responsibleUser } = this.state
    const data = {
      manufacturer: newMark,
      mark: newMark,
      responsibleUser,
    }

    try {
      await newMarca(data)
      await this.getAllMarca()
      this.setState({ visibleMark: false })
      this.success()
    } catch (error) {
      this.error()
      this.setState({ visibleMark: false })
    }
  }

  createNewType = async () => {
    const { newType, responsibleUser } = this.state
    const data = {
      type: newType,
      responsibleUser,
    }

    try {
      await newTipo(data)
      await this.getAllTipo()
      this.setState({ visibleMark: false })
      this.success()
    } catch (error) {
      this.error()
      this.setState({ visibleMark: false })
    }
  }

  saveModalData = async (modalType) => {
    if (modalType === 'mark') {
      await this.createNewMark()
    }

    if (modalType === 'type') {
      await this.createNewType()
    }
  }

  handleCancel = () => this.setState({
    visibleMark: false,
    visibleType: false,
  })

  openModalMark = () => {
    this.setState({
      visibleMark: true
    })
  }

  openModalType = () => {
    this.setState({
      visibleType: true
    })
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onBlurValidator = ({ target }) => {
    const { formErrors } = this.state
    const { name, value } = target
    const messageError = validators(name, value)

    this.setState({
      [name]: value,
      formErrors: {
        ...formErrors,
        [name]: messageError,
      }
    })
  }

  renderRedirect = () => {
    if (!this.props.auth.addProd) {
      return <Redirect to="/logged/dash" />
    }
  }

  render() {
    const {
      category,
      corredor,
      coluna,
      descricao,
      formErrors,
      gaveta,
      item,
      loading,
      message,
      mark,
      marksList,
      prateleira,
      serial,
      type,
      typesList,
      visibleMark,
      visibleType,
    } = this.state

    return (
      <AddProduct
        addNewProduct={this.addNewProduct}
        category={category}
        coluna={coluna}
        corredor={corredor}
        closeModal={this.handleCancel}
        descricao={descricao}
        formErrors={formErrors}
        gaveta={gaveta}
        getAllMarca={this.getAllMarca}
        handleOnChange={this.handleOnChange}
        item={item}
        loading={loading}
        mark={mark}
        marksList={marksList}
        message={message}
        onBlurValidator={this.onBlurValidator}
        onFocus={this.onFocus}
        openModalType={this.openModalType}
        openModalMark={this.openModalMark}
        prateleira={prateleira}
        saveModalData={this.saveModalData}
        serial={serial}
        typesList={typesList}
        type={type}
        visibleMark={visibleMark}
        visibleType={visibleType}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(NovoProduto)
