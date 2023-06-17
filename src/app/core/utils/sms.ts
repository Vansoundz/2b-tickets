import { config } from 'dotenv';
import * as Twilio from 'twilio';

config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = Twilio(accountSid, authToken);

const sendMessage = async (to: string, body: string) => {
  const message = {
    to,
    from: phoneNumber,
    body,
  };
  return new Promise((resolve, reject) => {
    client.messages.create(message).then(resolve).catch(reject);
  });
};

export { sendMessage };
