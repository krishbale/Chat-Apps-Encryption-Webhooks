import { BadRequestException, Injectable, } from '@nestjs/common';
import { UpdateUserDto, } from './dto/updateuser.dto';
import { Repository } from 'typeorm';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/enitity/otp.enum';
import { sendmail } from 'src/mailsender/sendmail';
import { verifydto } from 'src/otp/dto/veifyotp.dto';
import { validatedto } from 'src/otp/dto/veifyotp.dto';



@Injectable()
export class UserService {


  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private otpservice: OtpService



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
    try {
      const salt = await bcrypt.genSalt();
      creatuserdto.password = await bcrypt.hash(creatuserdto.password, salt);
      const user = await this.userRepository.save(creatuserdto);
      const code = await this.otpservice.createOTP(user.id, OTPType.EMAIL_VERIFICATION)
      const text = `${code.code} is your verification code`;
      sendmail(user.email, text);
      return { success: true, message: 'User created please verify email with otp ,', text };
    } catch (e) {
      console.log(e)
    }
  }



  async requestotp(verifydto: verifydto) {
    try{
      const waitTime = 1000 * 60 * 1; // 1 minutes

   
      const user = await this.userRepository.findOne({ where: { email:verifydto.email } });
      if (!user) return new BadRequestException({ success: false, message: 'user not found' })
      if (user.isverified) return new BadRequestException({ success: false, message: 'User already verified' });
      const previous_otp = await this.otpservice.findLastOTP(user.id, OTPType.EMAIL_VERIFICATION);
    
      const completedWaitTime = previous_otp.created_at.getTime() + waitTime < Date.now();
      if (!completedWaitTime) {
        const remainingTime = Math.ceil((previous_otp.created_at.getTime() + waitTime - Date.now()) / 1000);
     
        throw new BadRequestException({
          success: false,
          message: `Please wait ${remainingTime} seconds before requesting another OTP.`,
        });
      }
      const otp = await this.otpservice.createOTP(user.id, OTPType.EMAIL_VERIFICATION);
      const text = `${otp.code} is your verification code`;
      sendmail(user.email, text);
      return { success: true, message: 'OTP sent.' ,text};
    }catch(e){
      console.log(e)
    }
   
    



  }
  async validateotp(validatedto: validatedto){
    try{
      const user = await this.userRepository.findOne({ where: { email:validatedto.email } });
      if (!user) return new BadRequestException({ success: false, message: 'user not found' })
      if (user.isverified) return new BadRequestException({ success: false, message: 'User already verified' });
      const isOTPValid = await this.otpservice.validateOTP(user.id, validatedto.otp, OTPType.EMAIL_VERIFICATION);
  
        if (!isOTPValid) throw new BadRequestException({ success: false, message: 'Invalid OTP.' });
  
         await this.userRepository.update(user.id,{isverified:true} );
         await this.otpservice.deleteOTP(user.id,validatedto.otp, OTPType.EMAIL_VERIFICATION)

         
  
       return { success: true, message: 'User verified.' };
    }catch(e){
console.log(e);
    }
   




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
