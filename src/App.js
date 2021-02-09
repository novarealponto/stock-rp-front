import React from 'react'
import 'antd/dist/antd.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import Routes from './routes'
import { persistor, store  } from './store/configureStore'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
)
export default App
