import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'moment/locale/pt-br';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR'

import App from './App';

ReactDOM.render(
  <ConfigProvider locale={ptBR}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
