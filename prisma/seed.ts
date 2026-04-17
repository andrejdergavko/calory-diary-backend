import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data in correct order (respecting foreign keys)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      hashedPassword: 'hashedpassword123',
    },
  });
  console.log(`Created user: ${user1.name}`);

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      hashedPassword: 'hashedpassword456',
    },
  });
  console.log(`Created user: ${user2.name}`);

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Electronics',
    },
  });
  console.log(`Created category: ${category1.name}`);

  const category2 = await prisma.category.create({
    data: {
      name: 'Clothing',
    },
  });
  console.log(`Created category: ${category2.name}`);

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop',
      price: 999.99,
      stock: 10,
      categoryId: category1.id,
    },
  });
  console.log(`Created product: ${product1.name}`);

  const product2 = await prisma.product.create({
    data: {
      name: 'T-Shirt',
      price: 29.99,
      stock: 50,
      categoryId: category2.id,
    },
  });
  console.log(`Created product: ${product2.name}`);

  // Create Cart for user1
  const cart1 = await prisma.cart.create({
    data: {
      userId: user1.id,
    },
  });
  console.log(`Created cart for user: ${user1.name}`);

  // Create Cart for user2
  const cart2 = await prisma.cart.create({
    data: {
      userId: user2.id,
    },
  });
  console.log(`Created cart for user: ${user2.name}`);

  // Create CartItems
  await prisma.cartItem.create({
    data: {
      quantity: 1,
      cartId: cart1.id,
      productId: product1.id,
    },
  });
  console.log(`Added ${product1.name} to ${user1.name}'s cart`);

  await prisma.cartItem.create({
    data: {
      quantity: 2,
      cartId: cart2.id,
      productId: product2.id,
    },
  });
  console.log(`Added ${product2.name} to ${user2.name}'s cart`);

  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      totalPrice: 999.99,
      status: 'pending',
      userId: user1.id,
    },
  });
  console.log(`Created order for user: ${user1.name}`);

  const order2 = await prisma.order.create({
    data: {
      totalPrice: 59.98,
      status: 'confirmed',
      userId: user2.id,
    },
  });
  console.log(`Created order for user: ${user2.name}`);

  // Create OrderItems
  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 999.99,
      orderId: order1.id,
      productId: product1.id,
    },
  });
  console.log(`Added ${product1.name} to order #${order1.id}`);

  await prisma.orderItem.create({
    data: {
      quantity: 2,
      price: 29.99,
      orderId: order2.id,
      productId: product2.id,
    },
  });
  console.log(`Added ${product2.name} to order #${order2.id}`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
