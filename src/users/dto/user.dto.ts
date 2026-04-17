import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  createdAt: Date;

  updatedAt: Date;
}
