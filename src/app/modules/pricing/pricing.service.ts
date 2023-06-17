import { Injectable } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { Price } from 'src/app/shared/db';

@Injectable()
export class PricingService {
  async create(pricing: CreatePricingDto) {
    return await Price.create(pricing as any);
  }

  findAll(ticketId: string) {
    return Price.findAll({ where: { ticketId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} pricing`;
  }

  update(id: number, updatePricingDto: UpdatePricingDto) {
    return `This action updates a #${id} pricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} pricing`;
  }
}
