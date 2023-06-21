import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()

export class AuthService {
    constructor(private usersService: UserService) {}
   
        

        async signIn(email: string, pass: string): Promise<any> {
            const user = await
            this.usersService.findbyEmail(email);
            if(user){
                if (user.password === pass) {
                    return user
                }
                return 'password do not match'
            }
          

        return 'unauthorized';
          
        }
    
}
