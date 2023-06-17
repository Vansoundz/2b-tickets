import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketingModule } from './app/modules/ticketing/ticketing.module';
import { sequelize } from './app/shared/db';
import { PricingModule } from './app/modules/pricing/pricing.module';
// import { Price, Ticket } from './app/shared/db';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'dpg-chbad6e7avjcvo4uf5sg-a.oregon-postgres.render.com',
      port: 3306,
      username: 'spendr',
      password: 'GUMq2fpiSeYktF3V4CBK3hQFC9akgdF2',
      database: '2brother',
    }),
    TicketingModule,
    PricingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    sequelize;
  }
}
