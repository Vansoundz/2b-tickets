import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../sequelize';

const Price = sequelize.define('price', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      max: 256,
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ticketId: {
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'ticket',
      },
    },
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Price;
