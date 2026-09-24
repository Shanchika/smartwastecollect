
import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

const http = axios.create({
  baseURL: API_BASE,
  timeout: 10000
})

export const api = {
  async getBins() {
    const { data } = await http.get('/bins')
    return data
  },
  async getBinStatus() {
    const { data } = await http.get('/bins/status')
    return data
  },
  async recordCollection(payload) {
    const { data } = await http.post('/collect/record', payload)
    return data
  },
  async emptyBin(binId) {
    const { data } = await http.put(`/collect/empty/${binId}`)
    return data
  },
  async myCollections(collectorId='collector-demo') {
    const { data } = await http.get(`/collect/my`, { params: { collectorId } })
    return data
  }
}
