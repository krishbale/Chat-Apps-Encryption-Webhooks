import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class loginuserDto {
  @ApiProperty({
    description: 'email of user',
    example: 'john@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 50)
  email: string;

  @ApiProperty({
    description: 'passwor of user',
    example: 'mypassword@123',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  password: string;
}
