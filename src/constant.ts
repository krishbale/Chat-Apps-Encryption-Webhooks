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