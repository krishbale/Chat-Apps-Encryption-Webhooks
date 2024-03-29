import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
