export class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;

  constructor(data: {
    id: number;
    name: string;
    price: number;
    stock: number;
    categoryId: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.stock = data.stock;
    this.categoryId = data.categoryId;
  }
}
