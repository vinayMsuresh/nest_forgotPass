import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
export default class ForgotDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  confirm_pass: string;
}
