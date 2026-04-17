import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cart } from '../generated/prisma/client';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Обеспечивает наличие корзины для пользователя
   */
  async ensureCart(userId: number): Promise<Cart> {
    return this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }

  /**
   * Добавляет товар в корзину или увеличивает количество
   */
  async addItem(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart | null> {
    // Проверяем, что товар существует
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      this.logger.warn(`Product with id: ${productId} not found`);
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    // Гарантируем наличие корзины и добавляем товар в транзакции
    return await this.prisma.$transaction(async (tx) => {
      const cart = await tx.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      // Upsert для CartItem: если есть — увеличиваем quantity, если нет — создаём
      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });

      // Возвращаем полную корзину с items и product
      return tx.cart.findUnique({
        where: { id: cart.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });
  }

  /**
   * Удаляет товар из корзины
   */
  async removeItem(userId: number, productId: number): Promise<Cart | null> {
    // Находим корзину
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      this.logger.warn(`Cart for user ${userId} not found`);
      throw new NotFoundException(`Cart not found for user ${userId}`);
    }

    // Проверяем наличие item перед удалением
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!cartItem) {
      this.logger.warn(
        `CartItem not found for cart ${cart.id} and product ${productId}`,
      );
      throw new NotFoundException(
        `Item with product id ${productId} not found in cart`,
      );
    }

    // Удаляем item
    await this.prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    // Возвращаем полную корзину с items и product
    return this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  /**
   * Очищает корзину (удаляет все items)
   */
  async clear(userId: number): Promise<Cart | null> {
    // Находим корзину
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      this.logger.warn(`Cart for user ${userId} not found`);
      throw new NotFoundException(`Cart not found for user ${userId}`);
    }

    // Удаляем все items
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Возвращаем пустую корзину
    return this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  /**
   * Получает корзину пользователя
   */
  async getCart(userId: number): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
