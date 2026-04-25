import { IsInt, IsOptional, Min } from 'class-validator';

export class SetMacroTargetDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  calories: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  protein: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  fat: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  carbs: number;
}
