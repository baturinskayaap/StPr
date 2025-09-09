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
  },

  async login(code, isAdmin = false) {
    try {
      const response = await axios.post('/auth/login', {
        code: code.trim(),
        isAdmin,
      })

      localStorage.setItem('isLoggedIn', 'true')
      this.state.isLoggedIn = true

      if (isAdmin) {
        localStorage.setItem('isAdmin', 'true')
        this.state.isAdmin = true

        const contractsResponse = await axios.get('/contracts/admin/contracts')
        this.state.contracts = contractsResponse.data
        localStorage.setItem('contracts', JSON.stringify(this.state.contracts))

        this.state.user = null
        localStorage.removeItem('user')
      } else {
        localStorage.setItem('isAdmin', 'false')
        this.state.isAdmin = false

        this.state.user = response.data.user
        this.state.contracts = response.data.user.contracts || []
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('contracts', JSON.stringify(response.data.user.contracts || []))
      }

      return true
    } catch (error) {
      console.error('Ошибка входа:', error)
      this.logout()
      throw error
    }
  },

  logout() {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('user')
    localStorage.removeItem('contracts')
    this.state.isLoggedIn = false
    this.state.isAdmin = false
    this.state.user = null
    this.state.contracts = []
  },

  async updateMeter(contractId, meterId, currentReading) {
    try {
      const response = await axios.put(`/contracts/${contractId}/meters/${meterId}`, {
        currentReading: parseFloat(currentReading),
      })

      const updatedMeter = response.data
      const contract = this.state.contracts.find((c) => c.id === contractId)
      if (contract) {
        const meterIndex = contract.meters.findIndex((m) => m.id === meterId)
        if (meterIndex !== -1) {
          contract.meters[meterIndex] = updatedMeter
          localStorage.setItem('contracts', JSON.stringify(this.state.contracts))
        }
      }

      return true
    } catch (error) {
      console.error('Ошибка обновления счетчика:', error)
      throw error
    }
  },

  async pay(userId) {
    try {
      await axios.post(`/contracts/${userId}/pay`)

      this.state.contracts.forEach((contract) => {
        contract.meters.forEach((meter) => {
          meter.prevReading = meter.currentReading
          meter.penalty = 0
          meter.amount = 0
          meter.consumption = 0
        })
      })

      localStorage.setItem('contracts', JSON.stringify(this.state.contracts))
      return true
    } catch (error) {
      console.error('Ошибка оплаты:', error)
      throw error
    }
  },
})

store.init()
