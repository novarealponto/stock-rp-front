export const getRotation = (lastNumberPlate) => {
  const rotation = {
    1: 'Segunda-feira',
    2: 'Segunda-feira',
    3: 'Terça-feira',
    4: 'Terça-feira',
    5: 'Quarta-feira',
    6: 'Quarta-feira',
    7: 'Quinta-feira',
    8: 'Quinta-feira',
    9: 'Sexta-feira',
    0: 'Sexta-feira',
  };

  return rotation[lastNumberPlate];
};
