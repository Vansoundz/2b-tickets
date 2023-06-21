import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketsModule } from './app/modules/tickets/tickets.module';
// import { sequelize } from './app/shared/db';
import { PricingModule } from './app/modules/pricing/pricing.module';
import { BookingModule } from './app/modules/booking/booking.module';
import Ticket from './app/modules/tickets/ticket.model';
import Booking from './app/modules/booking/booking.model';
import Price from './app/modules/pricing/price.model';
// import { Price, Ticket } from './app/shared/db';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'dpg-chbad6e7avjcvo4uf5sg-a.oregon-postgres.render.com',
      username: 'spendr',
      password: 'GUMq2fpiSeYktF3V4CBK3hQFC9akgdF2',
      database: '2brother',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      protocol: 'tcp',
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    SequelizeModule.forFeature([Ticket, Booking, Price]),
    TicketsModule,
    PricingModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
