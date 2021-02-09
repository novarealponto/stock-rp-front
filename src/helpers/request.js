import axios from 'axios'
import { store } from '../store/configureStore'

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use((config) => {
  const storeObject = store.getState()

  return {
    ...config,
    headers: {
      ...config.headers,
      token: storeObject.auth.token,
      username: storeObject.auth.username,
    },
  }
})

export default axiosInstance
