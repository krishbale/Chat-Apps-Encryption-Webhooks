import { IsEmail, IsNotEmpty, IsNumber,  Length, MinLength } from 'class-validator';

export class verifydto {

 

  @IsNotEmpty()
  @IsEmail()
  @Length(8,50)
  email: string;


  @IsNotEmpty()
  @IsNumber() 
  otp:number;

  
}