import express from 'express'

export default (sequelize) => {
  const router = express.Router()
  const Contract = sequelize.models.Contract
  const Meter = sequelize.models.Meter
  const User = sequelize.models.User

  router.put('/:contractId/meters/:meterId', async (req, res) => {
    try {
      const contract = await Contract.findByPk(req.params.contractId, {
        include: [Meter],
      })

      if (!contract) {
        return res.status(404).json({ message: 'Договор не найден' })
      }

      const meter = await Meter.findByPk(req.params.meterId)
      if (!meter || meter.ContractId !== contract.id) {
        return res.status(404).json({ message: 'Счетчик не найден' })
      }

      const consumption = req.body.currentReading - meter.prevReading
      const penalty = consumption * 5 * 0.001 * 30

      await meter.update({
        currentReading: req.body.currentReading,
        consumption,
        penalty,
        amount: consumption * 5 + penalty,
      })

      res.json(meter)
    } catch (error) {
      console.error('Update meter error:', error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  })

  router.post('/:userId/pay', async (req, res) => {
    try {
      const contracts = await Contract.findAll({
        where: { UserId: req.params.userId },
        include: [Meter],
      })

      for (const contract of contracts) {
        for (const meter of contract.Meters) {
          await meter.update({
            prevReading: meter.currentReading,
            penalty: 0,
            amount: 0,
            consumption: 0,
          })
        }
      }

      res.json({ message: 'Оплата прошла успешно' })
    } catch (error) {
      console.error('Pay error:', error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  })
  router.get('/admin/contracts', async (req, res) => {
    try {
      const contracts = await Contract.findAll({
        include: [
          {
            model: Meter,
          },
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'code', 'phone', 'passport'],
          },
        ],
      })

      const transformedContracts = contracts.map((contract) => ({
        ...contract.toJSON(),
        meters: contract.Meters,
        user: contract.User,
      }))

      res.json(transformedContracts)
    } catch (error) {
      console.error('Get contracts error:', error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  })
  return router
}
