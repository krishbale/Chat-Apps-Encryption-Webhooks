import { BadRequestException, Injectable } from '@nestjs/common';
import { generateOTP } from '../utils/otpgenerator/generatenewotp';
import { DataSource } from 'typeorm';
import { OTPType } from './enums/otp.enum';
import { OTP } from './enitity/otp.entity';

@Injectable()
export class OtpService {
  constructor(private readonly dataSource: DataSource) {}

  async createOTP(user_id: string, otp_type: OTPType) {
    const code = generateOTP(6);
    return await this.dataSource
      .getRepository(OTP)
      .save({ code, user_id, otp_type });
  }

  async deleteOTP(user_id: string, code: string, otp_type: OTPType) {
    return await this.dataSource
      .getRepository(OTP)
      .delete({ code, user_id, otp_type });
  }

  async findLastOTP(user_id: string, otp_type: OTPType) {
    return await this.dataSource
      .getRepository(OTP)
      .findOne({ where: { user_id, otp_type }, order: { created_at: 'DESC' } });
  }

  async validateOTP(user_id: string, code: string, otp_type: OTPType) {
    const otp = await this.dataSource
      .getRepository(OTP)
      .findOne({ where: { user_id, code, otp_type } });
    if (!otp) throw new BadRequestException('Invalid OTP.');
    const expiryTime = 1000 * 60 * 15; // 15 minutes
    // console.log(otp.created_at.getTime() + expiryTime > Date.now());
    if (otp.created_at.getTime() + expiryTime > Date.now()) {
      throw new BadRequestException('OTP expired.');
    }

    return true;
  }
}
