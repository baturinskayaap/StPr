import express from 'express'
import { v4 as uuidv4 } from 'uuid'

export default (sequelize) => {
  const router = express.Router()
  const { User, Contract, Meter } = sequelize.models

  router.post('/login', async (req, res) => {
    try {
      const { code, isAdmin } = req.body

      if (isAdmin) {
        if (code === 'admin123') {
          return res.json({
            token: uuidv4(),
            isAdmin: true,
            user: null,
          })
        }
        return res.status(401).json({ message: 'Неверный код администратора' })
      }

      const user = await User.findOne({
        where: { code },
        include: [
          {
            model: Contract,
            include: [Meter],
          },
        ],
      })

      if (!user) return res.status(404).json({ message: 'Пользователь не найден' })
      const userResponse = {
        id: user.id,
        code: user.code,
        lastName: user.lastName,
        firstName: user.firstName,
        contracts: user.Contracts.map((contract) => ({
          ...contract.toJSON(),
          meters: contract.Meters, // Rename Meters to meters
        })),
      }

      res.json({
        token: uuidv4(),
        isAdmin: false,
        user: userResponse,
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  })

  router.get('/check', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ isValid: false })

    res.json({
      isValid: true,
      user: null,
    })
  })

  return router
}
