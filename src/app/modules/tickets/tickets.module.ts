import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Ticket from './ticket.model';
import Booking from '../booking/booking.model';

@Module({
  imports: [SequelizeModule.forFeature([Ticket, Booking])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [SequelizeModule],
})
export class TicketsModule {}
