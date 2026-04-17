import { IsInt, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  productId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number = 1;
}
