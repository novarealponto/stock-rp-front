import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import AddTechinician from '../../../../containers/Technician/AddTechinician';
import { getRotation } from '../../../../utils'

export default {
  title: 'Containers/Technician',
  component: AddTechinician,
};

const closeModalAciton = action('Close modal resgister new car');
const openModalAciton = action('Open modal resgister new car');
const registerAction = action('Register new technician');
const registerModalAciton = action('Resgister new car');

const Template = (args) => {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const [rotation, setRotation] = useState('');
  const [visibleModalNewCar, setVisibleModalNewCar] = useState(false);

  const closeModalNewCar = () => {
    closeModalAciton(true);
    setVisibleModalNewCar(false);
    formModal.resetFields();
  };

  const onChangeSelecCarList = (plate) => {
    const lastNumberPlate = !!plate && plate[plate.length - 1]
    setRotation(getRotation(lastNumberPlate));
  };

  const openModalNewCar = () => {
    openModalAciton(true);
    setVisibleModalNewCar(true);
  };

  const saveModalCar = (carFormData) => {
    registerModalAciton(carFormData);
    setVisibleModalNewCar(false);
    formModal.resetFields();
  };

  const saveTechnician = (technicianFormData) => {
    registerAction(technicianFormData);
  };

  return (
    <AddTechinician
      {...args}
      closeModalNewCar={closeModalNewCar}
      form={form}
      formModal={formModal}
      onChangeSelecCarList={onChangeSelecCarList}
      openModalNewCar={openModalNewCar}
      rotation={rotation}
      saveModalCar={saveModalCar}
      saveTechnician={saveTechnician}
      visibleModalNewCar={visibleModalNewCar}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  carList: [
    { model: 'name 1', plate: 'AAA-1231' },
    { model: 'name 2', plate: 'AAA-1232' },
    { model: 'name 3', plate: 'AAA-1233' },
    { model: 'name 4', plate: 'AAA-1234' },
   ]
};
