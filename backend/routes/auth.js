import express from 'express'

export default (sequelize) => {
  const router = express.Router()
  const { User, Contract, Meter } = sequelize.models

  router.post('/login', async (req, res) => {
    try {
      const { code, isAdmin } = req.body

      if (isAdmin) {
        if (code === 'admin123') {
          return res.json({
            isAdmin: true,
            user: null,
          })
        }
        return res.status(401).json({ message: 'Неверный код администратора' })
      }

      const user = await User.findOne({
        where: { code },
        include: [{ model: Contract, include: [Meter] }],
      })

      if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

      res.json({
        isAdmin: false,
        user: {
          id: user.id,
          code: user.code,
          lastName: user.lastName,
          firstName: user.firstName,
          contracts: user.Contracts.map((contract) => ({
            ...contract.toJSON(),
            meters: contract.Meters,
          })),
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  })

  router.get('/check', (req, res) => {
    res.json({ isValid: true, user: null })
  })

  return router
}
