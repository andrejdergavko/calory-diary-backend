import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessMealEntryDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
