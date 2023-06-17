import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post(':id')
  create(@Body() pricing: CreatePricingDto, @Param('id') id: string) {
    pricing.ticketId = id;
    return this.pricingService.create(pricing);
  }

  @Get()
  findAll(ticketId: string) {
    return this.pricingService.findAll(ticketId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricingDto: UpdatePricingDto) {
    return this.pricingService.update(+id, updatePricingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingService.remove(+id);
  }
}
