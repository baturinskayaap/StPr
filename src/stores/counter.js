import { reactive } from 'vue'

export const store = reactive({
  users: [
    {
      id: '123',
      lastName: 'Пупкин',
      firstName: 'Вася',
      middleName: 'Олегович',
      passport: '12123',
      phone: '123123',
      contracts: [1, 2],
    },
  ],

  contracts: [
    {
      id: 1,
      meters: [
        {
          id: 1,
          prevReading: 1,
          currentReading: 0,
          consumption: 0,
          penalty: 0,
          amount: 0,
        },
        {
          id: 2,
          prevReading: 0,
          currentReading: 0,
          consumption: 0,
          penalty: 0,
          amount: 0,
        },
      ],
    },
    {
      id: 2,
      meters: [
        {
          id: 1,
          prevReading: 1,
          currentReading: 0,
          consumption: 0,
          penalty: 0,
          amount: 0,
        },
        {
          id: 2,
          prevReading: 0,
          currentReading: 0,
          consumption: 0,
          penalty: 0,
          amount: 0,
        },
      ],
    },
  ],
  auth: {
    isLoggedIn: false,
    currentUser: null,
    isAdmin: false,
  },

  addContract(userId, newContract) {
    //используем стор - добавляем контракты
    const user = this.users.find((u) => u.id === userId)
    if (user) {
      user.contracts.push(newContract)
    }
  },
  updateMeter(contractId, meterData) {
    const contract = this.contracts.find((c) => c.id === contractId)
    if (contract) {
      const meter = contract.meters.find((m) => m.id === meterData.id)
      if (meter) {
        const consumption = meterData.currentReading - meter.prevReading
        const tariff = 5
        const daysOverdue = 30

        const penalty = consumption * tariff * 0.001 * daysOverdue

        Object.assign(meter, {
          ...meterData,
          consumption,
          penalty,
          amount: consumption * tariff + penalty,
        })
      }
    }
  },

  pay(userId) {
    const user = this.getUserById(userId)
    if (user) {
      user.contracts.forEach((contractId) => {
        const contract = this.contracts.find((c) => c.id === contractId)
        contract.meters.forEach((meter) => {
          meter.prevReading = meter.currentReading
          meter.penalty = 0
          meter.amount = 0
          meter.consumption = 0
        })
      })
    }
  },

  login(code, isAdmin = false) {
    if (isAdmin) {
      if (code === 'admin123') {
        this.auth.isLoggedIn = true
        this.auth.isAdmin = true
      }
    } else {
      const user = this.users.find((u) => u.id === code)
      if (user) {
        this.auth.isLoggedIn = true
        this.auth.currentUser = user
      }
    }
  },

  logout() {
    this.auth.isLoggedIn = false
    this.auth.currentUser = null
    this.auth.isAdmin = false
  },

  getUserById(userId) {
    return this.users.find((u) => u.id === userId)
  },

  getUserContracts(userId) {
    const user = this.getUserById(userId)
    if (!user) return []
    return this.contracts.filter((c) => user.contracts.includes(c.id))
  },
})
