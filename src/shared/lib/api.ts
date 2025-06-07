import axios from 'axios'

const api = axios.create({
  baseURL: 'http://o-complex.com:1337',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
