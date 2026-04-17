import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name должен быть строкой' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price должен быть числом' })
  @Min(0, { message: 'Price должен быть не меньше 0' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock должен быть числом' })
  @Min(0, { message: 'Stock должен быть не меньше 0' })
  stock?: number;

  @IsOptional()
  @IsNumber({}, { message: 'CategoryId должен быть числом' })
  categoryId?: number;
}
