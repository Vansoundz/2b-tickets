import * as qrcode from 'qrcode';
import Booking from 'src/app/modules/booking/booking.model';

const createCode = async (params: Booking) => {
  const link = process.env.UI + '/bookings/verify/' + params.MerchantRequestID;

  return new Promise((resolve, reject) => {
    qrcode.toDataURL(link, (error, url) => {
      if (error) return reject(error);
      resolve(url);
    });
  });
};

export { createCode };
