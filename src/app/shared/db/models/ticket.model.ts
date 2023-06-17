import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../sequelize';

const Ticket = sequelize.define('ticket', {
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
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
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
});

export default Ticket;
