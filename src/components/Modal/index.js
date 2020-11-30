import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

const ModalComponent = ({
  children,
  closeModal,
  title,
  saveModal,
  visible,
}) => (
  <Modal
    title={title}
    onCancel={closeModal}
    onOk={saveModal}
    cancelText="Cancelar"
    okText="Salvar"
    visible={visible}
  >
    { children }
  </Modal>
)

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
  saveModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default ModalComponent
