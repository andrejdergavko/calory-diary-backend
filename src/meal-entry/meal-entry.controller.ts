import {
  Controller,
  // Post,
  // Delete,
  // Get,
  // Body,
  // Param,
  // ParseIntPipe,
  Request,
} from '@nestjs/common';
import { MealEntryService } from './meal-entry.service';
// import { User } from '../generated/prisma/client';

// interface AuthenticatedRequest extends Request {
//   user: Omit<User, 'hashedPassword'>;
// }

@Controller('meal-entry')
export class MealEntryController {
  constructor(private mealEntryService: MealEntryService) {}

  // @Get()
  // async getCart(@Request() req: AuthenticatedRequest) {
  //   return this.mealEntryService.getCart(req.user.id);
  // }

  // @Post('items')
  // async addItem(
  //   @Request() req: AuthenticatedRequest,
  //   @Body() addToCartDto: AddToCartDto,
  // ) {
  //   const quantity = addToCartDto.quantity || 1;
  //   return this.mealEntryService.addItem(
  //     req.user.id,
  //     addToCartDto.productId,
  //     quantity,
  //   );
  // }

  // @Delete('items/:productId')
  // async removeItem(
  //   @Request() req: AuthenticatedRequest,
  //   @Param('productId', ParseIntPipe) productId: number,
  // ) {
  //   return this.mealEntryService.removeItem(req.user.id, productId);
  // }

  // @Delete()
  // async clearCart(@Request() req: AuthenticatedRequest) {
  //   return this.mealEntryService.clear(req.user.id);
  // }
}
