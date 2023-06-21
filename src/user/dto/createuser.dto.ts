import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string;


  @IsNotEmpty()
  @IsEmail()
  @Length(8,24)
  email: string;


  @IsNotEmpty()
  @IsString()
  @Length(8,24)
  password:string;

  
}
