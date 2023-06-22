import * as dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV! || "development";
export const PORT : number = parseInt(process.env.PORT);

export const DATABASE:{
    HOST:string,
    PORT:number
    USERNAME:string,
    PASSWORD:string,
    NAME:string,
} = {
    HOST:process.env.HOST,
    PORT: parseInt(process.env.PORT),
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    NAME: process.env.NAME,
}





export const SMTP: {
    SMTP_FROM_NAME: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_SECURITY: string;
  } = {
    SMTP_FROM_NAME: process.env.SMTP_USER!,
    SMTP_USER: process.env.SMTP_USER!,
    SMTP_PASSWORD:process.env.SMTP_PASSWORD!,
    SMTP_HOST: process.env.SMTP_HOST!,
    SMTP_PORT: parseInt(process.env.SMTP_PORT!),
    SMTP_SECURITY: process.env.SMTP_SECURITY!,
  };