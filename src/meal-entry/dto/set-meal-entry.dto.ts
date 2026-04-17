// import { Type } from 'class-transformer';
// import {
//   ArrayMinSize,
//   IsArray,
//   IsDateString,
//   IsEnum,
//   IsInt,
//   IsNumber,
//   IsPositive,
//   IsString,
//   Min,
//   ValidateNested,
// } from 'class-validator';
// import { MealType } from '@prisma/client';

// export class SetMealEntryFoodDto {
//   @IsString()
//   name: string;

//   @IsNumber()
//   @Min(0)
//   @Type(() => Number)
//   quantity: number;

//   @IsInt()
//   @Min(0)
//   @Type(() => Number)
//   calories: number;

//   @IsInt()
//   @Min(0)
//   @Type(() => Number)
//   protein: number;

//   @IsInt()
//   @Min(0)
//   @Type(() => Number)
//   fat: number;

//   @IsInt()
//   @Min(0)
//   @Type(() => Number)
//   carbs: number;
// }

// export class SetMealEntryDto {
//   @IsInt()
//   @Type(() => Number)
//   @IsPositive()
//   userId: number;

//   @IsEnum(MealType)
//   mealType: MealType;

//   @IsDateString()
//   loggedAt: string;

//   @IsArray()
//   @ArrayMinSize(1)
//   @ValidateNested({ each: true })
//   @Type(() => SetMealEntryFoodDto)
//   foods: SetMealEntryFoodDto[];
// }
