export const getRotation = (lastNumberPlate) => {
  switch (lastNumberPlate.toString()) {
    case '1':
    case '2':
      return 'Segunda-feira';
    case '3':
    case '4':
      return 'Terça-feira';
    case '5':
    case '6':
      return 'Quarta-feira';
    case '7':
    case '8':
      return 'Quinta-feira';
    case '9':
    case '0':
      return 'Sexta-feira';
  }
};
