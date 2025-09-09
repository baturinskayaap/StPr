import express from 'express'
import cors from 'cors'
import { Sequelize } from 'sequelize'
import authRouter from './routes/auth.js'
import contractsRouter from './routes/contracts.js'
import dUserS from './schemas/User.js'
import dContractS from './schemas/Contract.js'
import dMeterS from './schemas/Meter.js'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
})

const User = dUserS(sequelize)
const Contract = dContractS(sequelize)
const Meter = dMeterS(sequelize)

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true })
    await createTestData()
  } catch (error) {
    console.error(error)
  }
}

User.hasMany(Contract, { foreignKey: 'UserId' })
Contract.belongsTo(User, { foreignKey: 'UserId' })
Contract.hasMany(Meter, { foreignKey: 'ContractId' })
Meter.belongsTo(Contract, { foreignKey: 'ContractId' })

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
    console.error(error)
  }
}

const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection success')
    await syncDatabase()
  } catch (error) {
    console.error(error)
  }
}

testConnection()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter(sequelize))
app.use('/api/contracts', contractsRouter(sequelize))

app.listen(3000, () => console.log('Port 3000'))
