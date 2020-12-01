import React from 'react';
import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';
import styles from './style.module.css';
import classNames from 'classnames';

import Modal from '../../../components/Modal';

import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const AddProduct = ({
  addNewProduct,
  corredor,
  category,
  coluna,
  closeModal,
  descricao,
  formErrors,
  gaveta,
  getAllMarca,
  handleOnChange,
  item,
  loading,
  mark,
  marksList,
  newMark,
  newType,
  onBlurValidator,
  openModalMark,
  openModalType,
  quantMin,
  saveModalData,
  serial,
  typesList,
  type,
  visibleMark,
  visibleType,
  prateleira,
}) => {
  const ModalMarca = () => {
    const [form] = Form.useForm();

    return (
      <Modal
        title="Adicionar Marca"
        visible={visibleMark}
        closeModal={closeModal}
        saveModal={() =>
          form
            .validateFields()
            .then((data) => {
              form.resetFields();
              saveModalData({ data, type: 'mark' });
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            })
        }
      >
        <div className={styles.formGroup}>
          <Form form={form} layout="vertical" name="productTypeForm">
            <Form.Item name="newMark" label="Marca" rules={[{ required: true }]}>
              <Input
                className={classNames({ [styles.inputError]: formErrors.newMark })}
                placeholder="Digite a marca"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  };

  const ModalType = () => {
    const [form] = Form.useForm();

    return (
      <Modal
        title="Adicionar Tipo"
        visible={visibleType}
        closeModal={closeModal}
        saveModal={() =>
          form
            .validateFields()
            .then((data) => {
              form.resetFields();
              saveModalData({ data, type: 'type' });
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            })
        }
      >
        <div className={styles.formGroup}>
          <Form form={form} layout="vertical" name="productTypeForm">
            <Form.Item name="newType" label="Tipo" rules={[{ required: true }]}>
              <Input
                className={classNames({ [styles.inputError]: formErrors.newType })}
                placeholder="Digite um tipo"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Item</label>
          <Input
            className={classNames({ [styles.inputError]: formErrors.item })}
            placeholder="Digite o item"
            name="item"
            value={item}
            onChange={handleOnChange}
            onBlur={onBlurValidator}
          />

          {formErrors.item && <small className={styles.errorMessage}>{formErrors.item}</small>}
        </div>

        <div className={styles.formGroup}>
          <label>Categoria</label>
          <Select
            value={category}
            style={{ width: '100%' }}
            onChange={(value) => handleOnChange({ target: { value, name: 'category' } })}
            name="category"
          >
            <Option value="Equipamento">Equipamento</Option>
            <Option value="Peca">Peca</Option>
            <Option value="Acessorios">Acessórios</Option>
          </Select>
        </div>

        <div className={styles.formGroup}>
          <label>Marca</label>
          <div className={styles.inputWithButton}>
            <Select
              showSearch
              placeholder="Selecione o produto"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              name="mark"
              value={mark}
              style={{ width: '100%' }}
              onChange={(value) => handleOnChange({ target: { value, name: 'mark' } })}
              onSearch={(mark) => getAllMarca(mark)}
            >
              {marksList && marksList.map((item) => <Option value={item.mark}>{item.mark}</Option>)}
            </Select>
            <Button
              className={styles.addButtonPlus}
              type="primary"
              name="modalMarca"
              onClick={openModalMark}
            >
              <PlusOutlined />
            </Button>
          </div>
        </div>
        <ModalMarca />
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Tipo</label>
          <div className={styles.inputWithButton}>
            <Select
              value={type}
              style={{ width: '100%' }}
              name="type"
              onChange={(value) => handleOnChange({ target: { value, name: 'type' } })}
            >
              {typesList && typesList.map((item) => <Option value={item.type}>{item.type}</Option>)}
            </Select>

            <Button
              className={styles.addButtonPlus}
              type="primary"
              name="modalTipo"
              onClick={openModalType}
            >
              <PlusOutlined />
            </Button>
          </div>
        </div>
        <ModalType />

        <div className={styles.formGroup}>
          <label>Quant. min</label>
          <InputNumber
            min={1}
            className={classNames({ [styles.inputError]: formErrors.quantMin })}
            placeholder="12345"
            name="quantMin"
            value={quantMin}
            onChange={(value) => handleOnChange({ target: { value, name: 'quantMin' } })}
            onBlur={onBlurValidator}
          />

          {formErrors.quantMin && (
            <small className={styles.errorMessage}>{formErrors.quantMin}</small>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Número de série</label>
          <Switch
            name="serial"
            checked={serial}
            onChange={(value) => handleOnChange({ target: { value, name: 'serial' } })}
          />
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroupDescription}>
          <label>Descrição</label>
          <TextArea
            placeholder="Digite a descrição"
            autosize={{ minRows: 2, maxRows: 4 }}
            rows={4}
            name="descricao"
            value={descricao}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.formGroupLocation}>
          <label className="div-inputs">Corredor </label>
          <Input placeholder="12345" name="corredor" value={corredor} onChange={handleOnChange} />
        </div>

        <div className={styles.formGroupLocation}>
          <label>Coluna</label>
          <Input placeholder="12345" name="coluna" value={coluna} onChange={handleOnChange} />
        </div>

        <div className={styles.formGroupLocation}>
          <label className="div-inputs">Prateleira</label>
          <Input
            placeholder="12345"
            name="prateleira"
            value={prateleira}
            onChange={handleOnChange}
          />
        </div>

        <div className={styles.formGroupLocation}>
          <label>Gaveta</label>
          <Input placeholder="12345" name="gaveta" value={gaveta} onChange={handleOnChange} />
        </div>
      </div>
      <div className={styles.saveButton}>
        <Button className="button" type="primary" loading={loading} onClick={addNewProduct}>
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
