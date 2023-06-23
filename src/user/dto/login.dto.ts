import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class loginuserDto {




  @IsNotEmpty()
  @IsEmail()
  @Length(8,50)
  email: string;


  @IsNotEmpty()
  @IsString()
  @Length(8,24)
  password:string;

  
}