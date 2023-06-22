import { BadRequestException, Injectable, } from '@nestjs/common';
import { UpdateUserDto, } from './dto/updateuser.dto';
import { Repository } from 'typeorm';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/enitity/otp.enum';
import { sendmail } from 'src/utils/mailsender/sendmail';
import { verifydto } from 'src/otp/dto/veifyotp.dto';
import { validatedto } from 'src/otp/dto/veifyotp.dto';
import { string } from 'joi';



@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private otpservice: OtpService) 
    { }
  

  


  //creating new user and sending otp to email
  async create(creatuserdto: CreateUserDto) {
    //checking if user already exists
    const isuser = await this.userRepository.findOne({ where: { email: creatuserdto.email } });
    if (isuser) throw new BadRequestException({ success: false, message: 'Email already exists.' });
    try {
      //hashing password
      const salt = await bcrypt.genSalt();
      creatuserdto.password = await bcrypt.hash(creatuserdto.password, salt);
      //saving user to database
      const user = await this.userRepository.save(creatuserdto);
      //creating otp code
      const code = await this.otpservice.createOTP(user.id, OTPType.EMAIL_VERIFICATION)
      //sending otp to email
      const text = `${code.code} is your verification code`;
      sendmail(user.email, text);
      //returning response
      return { success: true, message: 'User created please verify email with otp ,',text };
    } catch (e) {
      console.log(e)
    }
  }


//update user by id
  UpdateUser(
    updateUserDto: UpdateUserDto,
    userID: string,
  ) {
    return this.userRepository.update(userID, updateUserDto);
  }

  async requestotp(verifydto: verifydto) {
    try {
      const waitTime = 1000 * 60 * 1; // 1 minutes

      //checking if user exists
      const user = await this.userRepository.findOne({ where: { email: verifydto.email } });
      //if user not found
      if (!user) return new BadRequestException({ success: false, message: 'user not found' })
      //if user is already verified
      if (user.isverified) return new BadRequestException({ success: false, message: 'User already verified' });
      //checking if user has already requested otp
      const previous_otp = await this.otpservice.findLastOTP(user.id, OTPType.EMAIL_VERIFICATION);
      //calculating remaining time for next otp request
      const completedWaitTime = previous_otp.created_at.getTime() + waitTime < Date.now();
      if (!completedWaitTime) {
        const remainingTime = Math.ceil((previous_otp.created_at.getTime() + waitTime - Date.now()) / 1000);
        
        throw new BadRequestException({
          success: false,
          message: `Please wait ${remainingTime} seconds before requesting another OTP.`,
        });
      }
      //creating otp
      const otp = await this.otpservice.createOTP(user.id, OTPType.EMAIL_VERIFICATION);
      const text = `${otp.code} is your verification code`;
      //sending otp to email
      sendmail(user.email, text);
      //returning response
      return { success: true, message: 'OTP sent.', text };
    } catch (e) {
      console.log(e)
    }





  }
  async validateotp(validatedto: validatedto) {
    try {
      //checking if user exists
      const user = await this.userRepository.findOne({ where: { email: validatedto.email } });
      //if user not found
      if (!user) return new BadRequestException({ success: false, message: 'user not found' })
      //if user is already verified
      if (user.isverified) return new BadRequestException({ success: false, message: 'User already verified' });
      //checking if otp is valid
      const isOTPValid = await this.otpservice.validateOTP(user.id, validatedto.otp, OTPType.EMAIL_VERIFICATION);
      //if otp is not valid
      if (!isOTPValid) throw new BadRequestException({ success: false, message: 'Invalid OTP.' });
      //validating user
      await this.userRepository.update(user.id, { isverified: true });
      //deleting otp from database
      await this.otpservice.deleteOTP(user.id, validatedto.otp, OTPType.EMAIL_VERIFICATION)
      //returning response 
      return { success: true, message: 'User verified.' };
    } catch (e) {
      console.log(e);
    }
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

  //finding user database by email
  findbyEmail(
    email: string
  ) {
    return this.userRepository.findOne({ where: { email } });
  }
}
