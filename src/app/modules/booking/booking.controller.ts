import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getBookings(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.bookingService.getBookings(page, pageSize);
  }

  @Get(':id')
  async getBooking(@Param('id') id: string) {
    return await this.bookingService.getBooking(id);
  }

  @Get('verify/:MerchantRequestID')
  async verify(@Param('MerchantRequestID') id: string) {
    return await this.bookingService.verify(id);
  }
}
