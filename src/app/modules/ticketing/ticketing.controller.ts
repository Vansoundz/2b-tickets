import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketingDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';

@Controller('ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

  @Post()
  create(@Body() createTicketingDto: CreateTicketingDto) {
    return this.ticketingService.create(createTicketingDto);
  }

  @Get()
  findAll() {
    return this.ticketingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketingDto: UpdateTicketingDto,
  ) {
    return this.ticketingService.update(+id, updateTicketingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketingService.remove(+id);
  }

  @Post('payment/callback')
  callback(@Body() body: any) {
    const data: any = body.Body.stkCallback;
    const metadata = data.CallbackMetadata?.Item;
    if (data.ResultCode !== 0) return console.log(data);
    return this.ticketingService.savePayment(data, metadata);
  }

  @Post('purchase/:id')
  async purchase(
    @Param('id') id: string,
    @Body('priceId') priceId: string,
    @Body('phoneNumber') phone: string,
  ) {
    return this.ticketingService.purchase(id, priceId, phone);
  }
}
