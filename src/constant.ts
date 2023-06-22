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



export const JWTSECRET: string = process.env.JWT_SECRET!;


export const SMTP = {
host: 'smtp.ethereal.email',
port: 465,
secure: false,
user: 'kaela.kiehn98@ethereal.email',
pass: 'tFjBsv5g2YdjVPPDvp',
Sender:'kaela.kiehn98@ethereal.email',
}