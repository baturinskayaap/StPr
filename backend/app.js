import express from 'express'
import cors from 'cors'
import { Sequelize } from 'sequelize'
import authRouter from './routes/auth.js'
import contractsRouter from './routes/contracts.js'
import defineUserModel from './schemas/User.js'
import defineContractModel from './schemas/Contract.js'
import defineMeterModel from './schemas/Meter.js'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
})

const User = defineUserModel(sequelize)
const Contract = defineContractModel(sequelize)
const Meter = defineMeterModel(sequelize)

User.hasMany(Contract)
Contract.belongsTo(User)
Contract.hasMany(Meter)
Meter.belongsTo(Contract)

// Синхронизация моделей с базой данных
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('Database synchronized')

    await createTestData()
  } catch (error) {
    console.error('Error synchronizing database:', error)
  }
}

const createTestData = async () => {
  try {
    const user = await User.create({
      code: '123',
      lastName: 'Пупкин',
      firstName: 'Вася',
      passport: '1234567890',
      phone: '+79991234567',
      isAdmin: false,
    })

    const contract = await Contract.create({
      address: 'ул. Примерная, 1',
      UserId: user.id,
    })

    await Meter.create({
      type: 'Вода',
      prevReading: 100,
      currentReading: 0,
      consumption: 0,
      penalty: 0,
      amount: 0,
      ContractId: contract.id,
    })

    console.log('Test data created successfully')
  } catch (error) {
    console.error('Error creating test data:', error)
  }
}

const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to SQLite has been established successfully.')
    await syncDatabase()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnection()

const app = express()
app.use(cors())
app.use(express.json())

// Подключение роутов
app.use('/api/auth', authRouter())
app.use('/api/contracts', contractsRouter())

app.listen(3000, () => console.log('Server started on port 3000'))

export { sequelize }
