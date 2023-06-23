import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MinLength } from 'class-validator';
export class verifydto {
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 50)
  email: string;
}
export class validatedto extends verifydto {
  @IsNotEmpty()
  @IsString()
  otp: string;
}
export class resetpasswordto extends validatedto {


  @IsNotEmpty()
  @IsString()
  @Length(8,50)
  newpassword: string;
}