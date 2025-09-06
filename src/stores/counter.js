import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
  state: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    contracts: JSON.parse(localStorage.getItem('contracts') || '[]'),
  },

  async init() {
    axios.defaults.baseURL = 'http://localhost:3000/api'
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  },

  async login(code, isAdmin = false) {
    try {
      if (!code || typeof code !== 'string') {
        throw new Error('Неверный формат кода')
      }

      const response = await axios.post('/auth/login', {
        code: code.trim(),
        isAdmin,
      })

      const token = response.data.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      localStorage.setItem('isLoggedIn', 'true')
      this.state.isLoggedIn = true

      if (isAdmin) {
        if (!response.data.isAdmin) {
          throw new Error('Ожидались права администратора')
        }

        localStorage.setItem('isAdmin', 'true')
        this.state.isAdmin = true

        localStorage.removeItem('user')
        localStorage.removeItem('contracts')
        this.state.user = null
        this.state.contracts = []
      } else {
        if (!response.data.user) {
          throw new Error('Данные пользователя не получены')
        }

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('contracts', JSON.stringify(response.data.user.contracts || []))

        this.state.user = response.data.user
        this.state.contracts = response.data.user.contracts || []
        this.state.isAdmin = false
        localStorage.setItem('isAdmin', 'false')
      }

      return true
    } catch (error) {
      console.error('Ошибка входа:', error)
      this.logout()
    }
  },

  logout() {
    localStorage.clear()
    this.state.isLoggedIn = false
    this.state.isAdmin = false
    this.state.user = null
    this.state.contracts = []
    delete axios.defaults.headers.common['Authorization']
  },

  async updateMeter(contractId, meterId, currentReading) {
    const contract = this.state.contracts.find((c) => c.id === contractId)
    const meter = contract?.meters.find((m) => m.id === meterId)

    if (!meter) return false

    const consumption = currentReading - meter.prevReading
    const tariff = 5
    const daysOverdue = 30
    const penalty = consumption * tariff * 0.001 * daysOverdue

    meter.currentReading = currentReading
    meter.consumption = consumption
    meter.penalty = penalty
    meter.amount = consumption * tariff + penalty

    return true
  },

  // Оплата
  async pay() {
    if (!this.state.user) return false

    this.state.contracts.forEach((contract) => {
      contract.meters.forEach((meter) => {
        meter.prevReading = meter.currentReading
        meter.penalty = 0
        meter.amount = 0
        meter.consumption = 0
      })
    })

    return true
  },
})
store.init()
