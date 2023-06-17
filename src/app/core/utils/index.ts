import { config } from 'dotenv';

config();

const getPassword = (timestamp: string): string => {
  const password = btoa(
    `${process.env.BUSINESS_SHORT_CODE}${process.env.PASSKEY}${timestamp}`,
  );
  return password;
};

const getTimeStamp = (): string => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const mi = date.getMinutes();
  const s = date.getSeconds();

  const prefixZero = (val: number): string =>
    val >= 10 ? val.toString() : `0${val}`;

  const timestamp = `${y}${prefixZero(m)}${prefixZero(d)}${prefixZero(
    h,
  )}${prefixZero(mi)}${prefixZero(s)}`;

  return timestamp;
};

export { getPassword, getTimeStamp };
