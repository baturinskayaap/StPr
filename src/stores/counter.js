import { reactive } from 'vue'

export const store = reactive({
  // Пользователи
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

  // Договоры
  contracts: [
    {
      id: 1,
      meters: [
        // Непосредственно храним объекты счетчиков
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
        // Расчет показаний
        const consumption = meterData.currentReading - meter.prevReading
        const tariff = 5 // Тариф за единицу
        const daysOverdue = 30 // Дней просрочки

        // Расчет пенни (0.1% в день)
        const penalty = consumption * tariff * 0.001 * daysOverdue

        // Обновление данных
        Object.assign(meter, {
          ...meterData,
          consumption,
          penalty,
          amount: consumption * tariff + penalty,
        })
      }
    }
  },

  login(code, isAdmin = false) {
    if (isAdmin) {
      // Проверка пароля администратора (можно вынести в конфиг)
      if (code === 'admin123') {
        this.auth.isLoggedIn = true
        this.auth.isAdmin = true
      }
    } else {
      const user = this.users.find((u) => u.code === code)
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
})
