import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/login')
    async login(@Body() logindto: any) {
        return this.authService.validateUser(logindto.email,logindto.password)
        
    }
}
