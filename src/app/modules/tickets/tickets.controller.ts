import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketsDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketsDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }

  @Post('payment/callback')
  callback(@Body() body: any) {
    const data: any = body.Body.stkCallback;
    const metadata = data.CallbackMetadata?.Item;
    if (data.ResultCode !== 0) return console.log(data);
    return this.ticketsService.savePayment(data, metadata);
  }

  @Post('purchase/:id')
  async purchase(
    @Param('id') id: string,
    @Body('priceId') priceId: string,
    @Body('phoneNumber') phone: string,
  ) {
    return this.ticketsService.purchase(id, priceId, phone);
  }
}
