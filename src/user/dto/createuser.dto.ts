import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'name of user',
    example: 'john',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email of user',
    example: 'balkrishna@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 50)
  email: string;

  @ApiProperty({
    description: 'password of user',
    example: 'mypassword@123',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  password: string;
}
