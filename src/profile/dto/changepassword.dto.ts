import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class changepasswordDto {
  @ApiProperty({
    description: 'id of user',
    example: '0eb10401-bcdd-4c74-b737-be6d32596d90 ',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'old password of user',
    example: 'mypassword@123',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  oldpassword: string;

  @ApiProperty({
    description: 'new password of user',
    example: 'mynewpassword@123',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  newpassword: string;
}
