import { AppDatabase } from "../../database/connection.js";
import { CreateOrderDto, UpdateOrderDto } from "../../dto/order.dto";
import { getDatabaseErrorMessage } from "../../utils/errors.js";

export class OrderRepository {
  table = AppDatabase.order;

  async create(order: CreateOrderDto) {
    try {
      return await this.table.create({
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
    } catch (error: any) {
      // console.error(error);
      const msg = getDatabaseErrorMessage(error.code);
      console.log(msg);

      throw new Error(msg);
    }

  }

  async getAll() {
    return await this.table.findMany({
      include: {
        mobilityService: true,
        specialBudgets: true,
      }
    });
  }


  async hasOrder(protocol: string) {
    try {
      await this.table.findUniqueOrThrow({
        where: {
          protocol: protocol,
        }
      });
      return true;
      
    } catch (error: any) {
      return false;
    }
  }


  async update(patch: UpdateOrderDto) {
    return await this.table.update({
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