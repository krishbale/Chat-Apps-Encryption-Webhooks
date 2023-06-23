import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { changepasswordDto } from './dto/changepassword.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProfileService {
    @InjectRepository(User)
    private userRepository: Repository<User>
    profile(){
        return { message:"I am protected route"};

    }


    async changepassword(@Body() changepassworddth:changepasswordDto){
        //

        const user =  await this.userRepository.findOne({ where: { id: changepassworddth.id } });          if(!user) throw new BadRequestException({ success: false, verified:null, message: 'User not found.' });
   
        if(changepassworddth.newpassword === changepassworddth.oldpassword) throw new BadRequestException({ success: false, verified:null, message: 'New password and old password are same.' });
      
        const isPasswordValid = await bcrypt.compare(changepassworddth.oldpassword,  user.password);
        if (!isPasswordValid) throw new BadRequestException({ success: false, verified:null, message: 'try with valid  password.' });
        const salt = await bcrypt.genSalt();
        const changepassword = await bcrypt.hash(changepassworddth.newpassword, salt);
        //save the changepassword
        await this.userRepository.update({id:changepassworddth.id},{password:changepassword});
       
        return { success: true, message: 'password changed successfully'}
    }
}
