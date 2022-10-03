import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ForgotDto from './dtos/forgotPass.dto';
import CreateUser from './dtos/UserCreate.dto';
import { User } from './user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private UserModel: Model<User>,
    private mailService: MailerService,
  ) {}

  async create(userDto: CreateUser): Promise<User> {
    const users = new this.UserModel(userDto);
    return users.save();
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find();
  }

  async forgotten(email: string): Promise<any> {
    const response = await this.mailService.sendMail({
      to: email,
      from: 'msvinay456@gmail.com',
      subject: 'Reset the password',
      html: `<p>Your password can be reset through this link.</p>
            <a href='http://localhost:3000/user/reset'>Click here</a>`,
    });
    return response;
  }

  async reset_pass(body: ForgotDto): Promise<any> {
    if (body.password === body.confirm_pass) {
      return this.UserModel.updateOne(
        { email: body.email },
        { $set: { password: body.password } },
      );
    } else {
      return "Password doesn't match";
    }
  }
}
