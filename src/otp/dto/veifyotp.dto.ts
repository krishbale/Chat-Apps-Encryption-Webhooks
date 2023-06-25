import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class verifydto {

  @ApiProperty({
    description: 'email of user',
    example: 'john@doe.com',
    
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 50)
  email: string;
}
export class validatedto extends verifydto {

  @ApiProperty({
    description: 'otp code generated for user',
    example: '123456',
})
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class resetpasswordto extends validatedto {

  @ApiProperty({
    description: 'new password of user',
    example: 'mynewpassword@123',
})
  @IsNotEmpty()
  @IsString()
  @Length(8,50)
  newpassword: string;
}