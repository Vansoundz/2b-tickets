import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import Booking from './booking.model';
// import { sequelize } from 'src/app/shared/db';

@Injectable()
export class BookingService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Booking)
    private bookings: typeof Booking,
  ) {}
  async getBookings(page = 0, pageSize = 10) {
    console.log({ page, pageSize });
    const bookings = await this.sequelize.query(
      `
    SELECT * 
    FROM bookings
    LIMIT :limit
    OFFSET :offset
    `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          limit: pageSize,
          offset: page * pageSize,
        },
      },
    );

    return bookings;
  }

  async getBooking(id: string) {
    const booking = await this.sequelize.query(
      `SELECT * FROM bookings WHERE id = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      },
    );

    console.log({ booking });

    return booking;
  }

  async verify(id: string) {
    const update = await this.bookings.update(
      { Consumed: true },
      {
        where: {
          MerchantRequestID: id,
        },
        returning: true,
      },
    );
    let booking;
    if (update) {
      booking = update[1][0];
    }
    return booking;
  }
}
