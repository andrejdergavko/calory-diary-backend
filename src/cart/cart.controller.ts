import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { User } from '../generated/prisma/client';

interface AuthenticatedRequest extends Request {
  user: Omit<User, 'hashedPassword'>;
}

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@Request() req: AuthenticatedRequest) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('items')
  async addItem(
    @Request() req: AuthenticatedRequest,
    @Body() addToCartDto: AddToCartDto,
  ) {
    const quantity = addToCartDto.quantity || 1;
    return this.cartService.addItem(
      req.user.id,
      addToCartDto.productId,
      quantity,
    );
  }

  @Delete('items/:productId')
  async removeItem(
    @Request() req: AuthenticatedRequest,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeItem(req.user.id, productId);
  }

  @Delete()
  async clearCart(@Request() req: AuthenticatedRequest) {
    return this.cartService.clear(req.user.id);
  }
}
