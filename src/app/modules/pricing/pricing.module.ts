import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Price from './price.model';

@Module({
  imports: [SequelizeModule.forFeature([Price])],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [SequelizeModule],
})
export class PricingModule {}
