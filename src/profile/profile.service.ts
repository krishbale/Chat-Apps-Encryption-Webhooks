import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { changepasswordDto } from './dto/changepassword.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { GetUser } from 'src/decorators/getuser.decorator';
import { DataSource } from 'typeorm';
import { generatersa } from 'src/encryption/rsakeyparigeneration';
import { decryptMessage } from 'src/encryption/rsaencyption';
@Injectable()
export class ProfileService {
  private protobuffer: any;

  @InjectRepository(User)
  private userRepository: Repository<User>;
  private readonly dataSource: DataSource;

  profile(@GetUser() User: User) {
    return { data: User.id };
  }
  //change password with old password
  async changepassword(
    @GetUser() User: User,
    @Body() changepassworddth: changepasswordDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id: User.id } });
    if (changepassworddth.newpassword === changepassworddth.oldpassword)
      throw new BadRequestException({
        success: false,
        verified: null,
        message: 'New password and old password are same.',
      });

    const isPasswordValid = await bcrypt.compare(
      changepassworddth.oldpassword,
      user.password,
    );
    if (!isPasswordValid)
      throw new BadRequestException({
        success: false,
        verified: null,
        message: 'try with valid  password.',
      });
    const salt = await bcrypt.genSalt();
    const changepassword = await bcrypt.hash(
      changepassworddth.newpassword,
      salt,
    );
    //save the changepassword
    await this.userRepository.update(
      { id: changepassworddth.id },
      { password: changepassword },
    );

    return { success: true, message: 'password changed successfully' };
  }

  getkeys() {
    return { package: generatersa().publickey };
  }
  sendmessagewithrsa(body: any) {
    const message = decryptMessage(body.data);
    return {
      success: true,
      message: 'Message decrypted successful',
      decrypte: message,
    };
  }
}
