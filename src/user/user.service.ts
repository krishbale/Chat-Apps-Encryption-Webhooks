import { BadRequestException, Injectable, } from '@nestjs/common';
import { UpdateUserDto, } from './dto/updateuser.dto';
import {  Repository } from 'typeorm';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/enitity/otp.enum';
import { sendmail } from 'src/mailsender/sendmail';
import { verifydto } from 'src/otp/dto/requestverification.dto';



@Injectable()
export class UserService {


  constructor(
  
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private otpservice:OtpService
  

    
  ) { }




  //getting total user from the database
  findall(): Promise<User[]> {
    return this.userRepository.find();
  }



  //geting user name 
  findname() {
    return this.userRepository.find({
      select: {
        name: true
      },
      take: 10
    })




  }
  sortbyorder() {
    return this.userRepository.find({
      order: {
        name: 'ASC',
        id: 'DESC',
      }
    })
  }


  //creating new user database


  async create(creatuserdto: CreateUserDto) {
    try{
      const salt = await bcrypt.genSalt();
      creatuserdto.password = await bcrypt.hash(creatuserdto.password, salt);
  
            const user =   await this.userRepository.save(creatuserdto);
         
        const code =   await this.otpservice.createOTP(user.id,OTPType.EMAIL_VERIFICATION)

        const text = `${code.code} is your verification code`;
        console.log(text);
        const to = user.email;
          sendmail(to,text);

          return { success: true, message: 'User created please verify email with otp ,',text };
         
    }catch(e){
      console.log(e)
    }
  

   


     
    
  }



  async requestotpverify(vefiydto:verifydto){
    const email = vefiydto.email.toLocaleLowerCase()
    const otp = vefiydto.otp
    const isverified = false;
    const user = this.userRepository.findOne({ where: { email ,isverified  } });

    if(!user) return   new BadRequestException({ success: false, message: 'User not found or already verified' });
    
    // const isOTPValid = await this.otpservice.validateOTP(user.id, otp, OTPType.EMAIL_VERIFICATION);
return user


  }
  

  
  ///updating existing database
  UpdateUser(
    updateUserDto: UpdateUserDto,
    userID: string,
  ) {
    return this.userRepository.update(userID, updateUserDto);
  }

  //getting userdatabase by id
  getUserByID(
    userID: string
  ) {
    return this.userRepository.findOne({ where: { id: userID } });
  }

  //deleting user database by id
  deleteUser(
    userID: string
  ) {
    return this.userRepository.delete(userID)
  }

  //finding database by email
  findbyEmail(
    email: string
  ) {
    return this.userRepository.findOne({ where: { email } });
  }
}
