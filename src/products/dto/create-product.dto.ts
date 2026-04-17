import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name должен быть строкой' })
  name: string;

  @IsNumber({}, { message: 'Price должен быть числом' })
  @Min(0, { message: 'Price должен быть не меньше 0' })
  price: number;

  @IsNumber({}, { message: 'Stock должен быть числом' })
  @Min(0, { message: 'Stock должен быть не меньше 0' })
  stock: number;

  @IsNumber({}, { message: 'CategoryId должен быть числом' })
  categoryId: number;
}
