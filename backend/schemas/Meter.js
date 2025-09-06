import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Meter = sequelize.define('Meter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prevReading: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    currentReading: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    consumption: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    penalty: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  })

  return Meter
}
