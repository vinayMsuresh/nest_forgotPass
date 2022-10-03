import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export default class CreateUser {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
