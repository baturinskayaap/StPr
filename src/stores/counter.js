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
      code: '123123',
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
  ],

  // Методы для работы с данными
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
        Object.assign(meter, meterData)
      }
    }
  },
})
