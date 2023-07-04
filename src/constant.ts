import * as dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT: number = parseInt(process.env.PORT);

export const DATABASE: {
  HOST: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  NAME: string;
} = {
  HOST: process.env.HOST,
  PORT: parseInt(process.env.PORT),
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  NAME: process.env.NAME,
};

export const JWTSECRET: string = process.env.JWT_SECRET;
export const SMTP: {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  Sender: string;
} = {
  host: process.env.SMTPhost,
  port: parseInt(process.env.SMTPport),
  secure: process.env.SMTPsecure === 'true' ? true : false,
  user: process.env.SMTPuser,
  pass: process.env.SMTPpass,
  Sender: process.env.Sender,
};
export const ENCRYPTION_KEY: string = process.env.ENCRYPTION_KEY;
