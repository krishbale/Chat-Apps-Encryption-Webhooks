import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAUTHGuard } from 'src/@guards/jwt.guards';
import { ProfileService } from './profile.service';
import { changepasswordDto } from './dto/changepassword.dto';
@Controller('profile')

export class ProfileController {
    constructor(private profileservice:ProfileService){}
    @UseGuards( JWTAUTHGuard)
    @Get()
    profile(){
        return this.profileservice.profile();

    }
    @UseGuards( JWTAUTHGuard)
    @Post('/changepassword')
    changepassword(@Body() changepassworddth:changepasswordDto  ){

        return this.profileservice.changepassword(changepassworddth); 
    }

    
}
