import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TestJobData {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsDate()
  @IsOptional()
  timestamp?: Date;
}
