import { BadRequestException, Injectable, } from '@nestjs/common';
import { UpdateUserDto, } from './dto/updateuser.dto';
import { Repository } from 'typeorm';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/enums/otp.enum';
import { sendmail } from 'src/utils/mailsender/sendmail';
import { resetpasswordto, verifydto } from 'src/otp/dto/veifyotp.dto';
import { validatedto } from 'src/otp/dto/veifyotp.dto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {



  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private otpservice: OtpService
    ,private jwtService: JwtService) 
    { }
  

  


  //creating new user and sending otp to email
  async create(creatuserdto: CreateUserDto) {
    const isuser = await this.userRepository.findOne({ where: { email: creatuserdto.email } });
    if (isuser) throw new BadRequestException({ success: false, message: 'Email already exists.' });
    try {
      const salt = await bcrypt.genSalt();
      creatuserdto.password = await bcrypt.hash(creatuserdto.password, salt);
      const user = await this.userRepository.save(creatuserdto);
      const code = await this.otpservice.createOTP(user.id, OTPType.EMAIL_VERIFICATION)
      const text = `${code.code} is your verification code`;
      sendmail(user.email, text);
      return { success: true, message: 'User created please verify email with otp ,',text };
    } catch (e) {
      console.log(e)
    }
  }

  async login(creatuserdto: CreateUserDto) {
  
  const user = await this.userRepository.findOne({
    where: { email: creatuserdto.email.toLowerCase() },
    select: { id: true, password: true, isverified: true },
  });
  
  if (!user) throw new BadRequestException({ success: false, verified:null, message: 'User not found.' });
  const isPasswordValid = await bcrypt.compare(creatuserdto.password, user.password);
  if (!isPasswordValid) throw new BadRequestException({ success: false, verified:null, message: 'Invalid password.' });
    
  const isverified = user.isverified;
  if (!isverified) throw new BadRequestException({ success: false, verified:false, message: 'User not verified.' });


const token = await this.jwtService.signAsync({ id: user.id });
return { success: true, verified:true, message: 'User logged in successfully.', token };



}
//update user by id
  UpdateUser(
    updateUserDto: UpdateUserDto,
    userID: string,
  ) {
    return this.userRepository.update(userID, updateUserDto);
  }

  async requestotp(verifydto: verifydto) {

      const waitTime = 1000 * 60 * 1; // 1 minutes

      const user = await this.userRepository.findOne({ where: { email: verifydto.email } });
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
      //creating otp
      const otp = await this.otpservice.createOTP(user.id, OTPType.EMAIL_VERIFICATION);
      const text = `${otp.code} is your verification code`;
      sendmail(user.email, text);
      return { success: true, message: 'OTP sent.', text };
  





  }
  async validateotp(validatedto: validatedto) {
  
      const user = await this.userRepository.findOne({ where: { email: validatedto.email } });
      if (!user) return new BadRequestException({ success: false, message: 'user not found' })
      if (user.isverified) return new BadRequestException({ success: false, message: 'User already verified' });
      const isOTPValid = await this.otpservice.validateOTP(user.id, validatedto.otp, OTPType.EMAIL_VERIFICATION);
      if (!isOTPValid) return new BadRequestException({ success: false, message: 'Invalid OTP.' });
      await this.userRepository.update(user.id, { isverified: true });
      await this.otpservice.deleteOTP(user.id, validatedto.otp, OTPType.EMAIL_VERIFICATION)
      return { success: true, message: 'User verified.' };
  
  }


  //forget password 
  async forgetpassword(verifydto: verifydto) {

    const waitTime = 1000 * 60 * 1; // 1 minutes
        //checking if user exists
    const user = await this.userRepository.findOne({ where: { email: verifydto.email } });
    if (!user) return new BadRequestException({ success: false, message: 'user not found' })
    if (!user.isverified) return new BadRequestException({ success: false, message: 'User not verified' });
    
    const previous_otp = await this.otpservice.findLastOTP(user.id, OTPType.PASSWORD_RESET);
    const completedWaitTime = previous_otp.created_at.getTime() + waitTime < Date.now();
    if (!completedWaitTime) {
      const remainingTime = Math.ceil((previous_otp.created_at.getTime() + waitTime - Date.now()) / 1000);
      
      throw new BadRequestException({
        success: false,
        message: `Please wait ${remainingTime} seconds before requesting another OTP.`,
      });
    }
    const otp = await this.otpservice.createOTP(user.id, OTPType.PASSWORD_RESET);
    const text = `${otp.code} is your verification code for password reset`;
    sendmail(user.email, text);
    return { success: true, message: 'OTP sent.check your email', text };
  }

  //reset password
  async resetpassword(resetpasswordto: resetpasswordto) {
    const user = await this.userRepository.findOne({ where: { email: resetpasswordto.email } });
    
    if (!user) return new BadRequestException({ success: false, message: 'user not found' })
    if (!user.isverified) return new BadRequestException({ success: false, message: 'User not verified' });
    const isOTPValid = await this.otpservice.validateOTP(user.id, resetpasswordto.otp, OTPType.PASSWORD_RESET);
    if (!isOTPValid) return new BadRequestException({ success: false, message: 'Invalid OTP.' });
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(resetpasswordto.newpassword, salt);
    const isMatch = await bcrypt.compare(resetpasswordto.newpassword, user.password);
    if (isMatch) return new BadRequestException({ success: false, message: 'New password cannot be same as old password.' });
    await this.userRepository.update(user.id, { password });
    await this.otpservice.deleteOTP(user.id, resetpasswordto.otp, OTPType.PASSWORD_RESET)
    return { success: true, message: 'Password reset successfully.' };
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
