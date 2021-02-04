import multi from 'redux-multi'
import promise from 'redux-promise'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import 'antd/dist/antd.css'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'

import reducers from './Reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = applyMiddleware(thunk, multi, promise)(createStore)(
  persistedReducer,
  composeWithDevTools()
)

export const persistor = persistStore(store)
