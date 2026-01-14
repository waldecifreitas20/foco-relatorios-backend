import { AppDatabase } from "../../database/connection";
import { CreateOrderDto } from "../../dto/order.dto";

export class OrderRepository {
  table = AppDatabase.order;

  async create(order: CreateOrderDto) {
    return this.table.create({
      data: order,
    });
  }

  async getAll() { }

  async update() { }

  async delete() { }
}