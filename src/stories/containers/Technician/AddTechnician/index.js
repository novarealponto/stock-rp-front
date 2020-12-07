import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import AddTechinician from '../../../../containers/Technician/AddTechinician';
import { getRotation } from '../../../../utils'

const carList = [];

for (let i = 0; i < 5; i++) {
  carList.push({ model: `name ${i}`, plate: `AAA-123${i}` });
}

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

  const closeModalNewCar = (event) => {
    closeModalAciton(true);
    setVisibleModalNewCar(false);
    formModal.resetFields();
  };

  const onChangeSelecCarList = (plate) => {
    const lastNumberPlate = !!plate && plate[plate.length - 1]
    setRotation(getRotation(lastNumberPlate));
  };

  const openModalNewCar = (event) => {
    openModalAciton(true);
    setVisibleModalNewCar(true);
  };

  const saveModalCar = (e) => {
    registerModalAciton(e);
  };

  const saveTechnician = (e) => {
    registerAction(e);
  };

  return (
    <AddTechinician
      {...args}
      carList={carList}
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

Default.args = {};
