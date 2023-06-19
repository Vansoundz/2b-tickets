import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
// import { Booking } from 'src/app/shared/db';
import axios from 'axios';
import { QueryTypes } from 'sequelize';
import { getPassword, getTimeStamp } from 'src/app/core/utils';
import { config } from 'dotenv';
import { sendMessage } from 'src/app/core/utils/sms';
import { createCode } from 'src/app/core/utils/qrcode';
import { Ticket as ITicket } from './entities/ticket.entity';
import { InjectModel } from '@nestjs/sequelize';
import Ticket from './ticket.model';
import { Sequelize } from 'sequelize-typescript';
import Booking from '../booking/booking.model';

config();

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket)
    private ticket: typeof Ticket,
    @InjectModel(Booking)
    private booking: typeof Ticket,
    private sequelize: Sequelize,
  ) {}
  async create(ticket: CreateTicketDto) {
    await this.ticket.create(ticket as any);
    return 'success';
  }

  async findAll() {
    const tickets = await this.sequelize.query(
      `
        SELECT
          *,
          (
            SELECT json_agg(prices)
            FROM prices
            WHERE prices."ticketId" = tickets.id
          ) AS prices
        FROM tickets;
        `,
      { type: QueryTypes.SELECT },
    );
    return tickets;
  }

  async findOneWithPrice(ticketId: string, priceId: string) {
    const ticket = (
      await this.sequelize.query(
        `
        SELECT
          t.*,
          p.amount,
          p.description AS price_description
        FROM tickets t
        JOIN prices p
        ON t.id = p."ticketId"
        AND p.id = :priceId
        WHERE t.id = :ticketId;
        `,
        {
          type: QueryTypes.SELECT,
          replacements: { ticketId, priceId },
        },
      )
    )[0];

    return ticket;
  }

  async findOne(id: string) {
    const ticket = (
      await this.sequelize.query(
        `
        SELECT
          *,
          (
            SELECT json_agg(prices)
            FROM prices
            WHERE prices."ticketId" = tickets.id
          ) AS prices
        FROM tickets
        WHERE tickets.id = :id;
        `,
        {
          type: QueryTypes.SELECT,
          replacements: { id },
        },
      )
    )[0];
    return ticket;
  }

  remove(id: number) {
    return `This action removes a #${id} ticke`;
  }

  async purchase(ticketId: string, priceId: string, phone: string) {
    const ticket: ITicket = await this.findOneWithPrice(ticketId, priceId);
    console.log({ ticket });
    try {
      const resp = await axios.get(
        `https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization:
              'Basic THMxSjNPR0tGS0Q4NTA5OFprNWFyOVptcFlmTlNrdDY6TVNLT3l0c0lESkdSTEVFWQ',
          },
        },
      );
      const Timestamp = getTimeStamp();
      const Password = getPassword(Timestamp);

      const accessToken = resp.data.access_token;

      const res = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
          Password,
          TransactionType: 'CustomerPayBillOnline',
          TransactionSubType: 'CustomerPayBillOnline',
          Amount: ticket.amount,
          PartyA: +phone,
          PartyB: 174379,
          PhoneNumber: +phone,
          CallBackURL: process.env.CallBackURL + '/tickets/payment/callback',
          AccountReference: '2BrotherEnt',
          TransactionDesc: 'Payment of X',
          Timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return { ...res.data };
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async savePayment(
    data: Record<string, any>,
    metadata: { Name: string; Value: any }[],
  ) {
    const { MerchantRequestID, CheckoutRequestID, ResultDesc } = data;
    const meta_data = metadata.reduce((acc, key) => {
      if (!!key.Value) acc[key.Name] = key.Value.toString();
      return acc;
    }, {});

    const params: any = {
      ...meta_data,
      MerchantRequestID,
      CheckoutRequestID,
      ResultDesc,
      Consumed: false,
    };
    const QRCode = await createCode(params);
    params['QRCode'] = QRCode;

    const item: any = await this.booking.create(params);
    const link = process.env.UI + '/bookings/' + item.id;
    const body = `
    Thank you for the booking.

    Download your ticket from ${link}
    `;
    await sendMessage(`+${params.PhoneNumber}`, body);
    console.log('Success');
    return 'Success';
  }
}
