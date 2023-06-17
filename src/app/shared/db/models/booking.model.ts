import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../sequelize';

const Booking = sequelize.define('booking', {
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
  MerchantRequestID: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    },
  },
  CheckoutRequestID: {
    type: DataTypes.STRING,
    validate: {
      max: 256,
      notEmpty: true,
    },
  },
  ResultDesc: {
    type: DataTypes.STRING,
    validate: {
      max: 256,
      notEmpty: true,
    },
  },
  Amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  MpesaReceiptNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  TransactionDate: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  QRCode: {
    type: DataTypes.STRING(65535),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Consumed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Booking;
