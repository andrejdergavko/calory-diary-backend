import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email должен быть валидным email адресом' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Name должен быть строкой' })
  name?: string;
}
