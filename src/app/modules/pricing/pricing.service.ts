import { Injectable } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
// import { UpdatePricingDto } from './dto/update-pricing.dto';
// import { Price } from 'src/app/shared/db';
import { InjectModel } from '@nestjs/sequelize';
import Price from './price.model';

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(Price)
    private price: typeof Price,
  ) {}

  async create(pricing: CreatePricingDto) {
    return await this.price.create(pricing as any);
  }

  findAll(ticketId: string) {
    return this.price.findAll({ where: { ticketId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} pricing`;
  }

  update(id: number) {
    return `This action updates a #${id} pricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} pricing`;
  }
}
