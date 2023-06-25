import { IsJWT, IsNotEmpty,IsString } from "class-validator";

export class ChatMessage {

    @IsString()
    to:string;
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}
export class HeaderToken {
   
    @IsNotEmpty()
    @IsJWT()
    token: string;
  }