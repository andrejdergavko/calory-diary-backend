import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessMealDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
