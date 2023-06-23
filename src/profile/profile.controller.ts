import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWTAUTHGuard } from 'src/@guards/jwt.guards';
@Controller('profile')

export class ProfileController {
    @UseGuards(AuthGuard('jwt'))
    @Get()
    profile(){
        return { message:"I am protected route"};

    }
}
