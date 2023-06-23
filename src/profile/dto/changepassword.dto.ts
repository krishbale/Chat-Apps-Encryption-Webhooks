import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class changepasswordDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;


    @IsNotEmpty()
    @IsString()
    @Length(8,50)
    oldpassword: string;


    @IsNotEmpty()
    @IsString()
    @Length(8,50)
    newpassword: string;
  }
  