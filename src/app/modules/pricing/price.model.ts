import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import Ticket from '../tickets/ticket.model';

@Table({ tableName: 'prices' })
export class Price extends Model {
  @PrimaryKey
  @Default(v4)
  @Column({ type: DataType.UUID, unique: true })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: Ticket,
      key: 'id',
    },
  })
  ticketId: string;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  deleted: boolean;
}

export default Price;
