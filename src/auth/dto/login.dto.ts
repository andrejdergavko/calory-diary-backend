import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email должен быть валидным email адресом' })
  email: string;

  @IsString({ message: 'Password должен быть строкой' })
  @MinLength(6, { message: 'Password должен быть минимум 6 символов' })
  password: string;
}
