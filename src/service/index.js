import axios from 'axios'

const api = axios.create({
    baseURL: (process.env.NODE_ENV === 'production')? process.env.REACT_APP_PROD_BASE_URL : process.env.REACT_APP_DEV_BASE_URL || 'http://localhost:5000'
})

export default api 