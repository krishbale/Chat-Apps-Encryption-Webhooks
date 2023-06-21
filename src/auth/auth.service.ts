import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()

export class AuthService {
    constructor(private usersService: UserService,private jwtService:JwtService) {}
   
        

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findbyEmail(email);
      
        console.log(password);
        if (user){
            const isMatch = await bcrypt.compare(password, user.password);
          
            if (isMatch) {
         return user;
         } 
        {
          
          
        }
        }
      
    
        return null;
      }
    
      async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    

