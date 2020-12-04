import React from 'react';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './store/reducers'
import Routes from './routes'
import "antd/dist/antd.css";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = applyMiddleware(thunk, multi, promise,)(createStore)(persistedReducer, composeWithDevTools())

const persistor = persistStore(store)

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
)
export default App
