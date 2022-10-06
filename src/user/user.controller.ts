import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import ForgotDto from './dtos/forgotPass.dto';
import CreateUser from './dtos/UserCreate.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() user: CreateUser) {
    return this.userService.create(user);
  }

  @Get()
  fetchUser() {
    return this.userService.findAll();
  }

  @Get('forgot/:email')
  forgot(@Param() params) {
    return this.userService.forgotten(params.email);
  }

  @Post('reset')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  resetPass(@Body() body: ForgotDto) {
    return this.userService.reset_pass(body);
  }
}
