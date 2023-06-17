import { Injectable } from '@nestjs/common';
import { CreateTicketingDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { Booking, Ticket, sequelize } from 'src/app/shared/db';
import axios from 'axios';
import { QueryTypes } from 'sequelize';
import { getPassword, getTimeStamp } from 'src/app/core/utils';
import { config } from 'dotenv';
import { Ticketing } from './entities/ticketing.entity';
import { sendMessage } from 'src/app/core/utils/sms';
import { createCode } from 'src/app/core/utils/qrcode';

config();

@Injectable()
export class TicketingService {
  async create(ticket: CreateTicketingDto) {
    await Ticket.create(ticket as any);
    return 'success';
  }

  async findAll() {
    const tickets = (
      await sequelize.query(
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
      )
    )[0];
    return tickets;
  }

  async findOneWithPrice(ticketId: string, priceId: string) {
    const ticket = (
      await sequelize.query(
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
      await sequelize.query(
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
    return `This action returns a #${id} ticketing`;
  }

  update(id: number, _updateTicketingDto: UpdateTicketingDto) {
    return `This action updates a #${id} ticketing`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketing`;
  }

  async purchase(ticketId: string, priceId: string, phone: string) {
    const ticket: Ticketing = await this.findOneWithPrice(ticketId, priceId);
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
          CallBackURL:
            'https://4280-105-163-0-28.ngrok-free.app/ticketing/payment/callback',
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

    const item: any = await Booking.create(params);
    const body = `
    Thank you for the booking.

    Download your ticket from https://4280-105-163-0-28.ngrok-free.app/?download=${item.id}
    `;
    await sendMessage(`+${params.PhoneNumber}`, body);
    console.log('Success');
    return 'Success';
  }
}
