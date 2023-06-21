import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 } from 'uuid';

@Table({ tableName: 'tickets' })
export class Ticket extends Model {
  @PrimaryKey
  @Default(v4)
  @Column({ type: DataType.UUID, unique: true })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
    defaultValue: 'image.png',
  })
  imageUrl: string;

  @Default(new Date())
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}

export default Ticket;
