import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 } from 'uuid';

@Table({ tableName: 'bookings' })
export class Booking extends Model {
  @PrimaryKey
  @Default(v4)
  @Column({ type: DataType.UUID, unique: true })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  MerchantRequestID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 256,
    },
  })
  CheckoutRequestID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 256,
    },
  })
  ResultDesc: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  Amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 256,
    },
  })
  MpesaReceiptNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  TransactionDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  PhoneNumber: string;

  @Column({
    type: DataType.STRING(65535),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  QRCode: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  Consumed: boolean;

  @Default(new Date())
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;
}

export default Booking;
