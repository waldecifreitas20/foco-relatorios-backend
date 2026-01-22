import { AppDatabase } from "../../database/connection.js";
import { CreateOrderDto, UpdateOrderDto } from "../../dto/order.dto";

export class OrderRepository {
  table = AppDatabase.order;

  async create(order: CreateOrderDto) {
    return this.table.create({
      data: {
        client: order.client,
        plate: order.plate,
        date: order.date,
        protocol: order.protocol,
        hour: order.hour,
        providerProtocol: order.providerProtocol,
        service: order.service,
        status: order.status
      },
    });
  }

  async getAll() {
    return this.table.findMany({
      include: {
        mobilityService: true,
        specialBudgets: true,
      }
    });
  }

  async update(patch: UpdateOrderDto) {
    return this.table.update({
      where: {
        protocol: patch.protocol
      },
      data: {
        plate: patch.plate,
        date: patch.date,
        hour: patch.hour,
        service: patch.service,
        status: patch.status,
      }
    })

  }

  async delete() { }
}