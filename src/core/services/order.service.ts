import { CreateOrderDto, UpdateOrderDto } from "../../dto/order.dto";
import { getErrorResponse } from "../../utils/errors.js";
import { OrderRepository } from "../repositories/order.repository.js";


export class OrderService {
  ordersRepo = new OrderRepository();

  async create(data: CreateOrderDto) {
    try {
      if (!data.protocol) {
        return {
          status: 400,
          error: "protocol must be provided"
        }
      }

      const { protocol } = await this.ordersRepo.create(data);
      return {
        status: 200,
        message: "order created",
        orderId: protocol,
      }

    } catch (error: any) {
      console.error(error);

      return {
        status: 500,
        error: error.message,
      }
    }

  }


  async getAll() {
    try {
      const orders = await this.ordersRepo.getAll();

      return {
        status: 200,
        orders,
      }
    } catch (error) {
      console.log(error);
      return getErrorResponse(error);
    }
  }


  async update(patch: UpdateOrderDto) {
    try {
      await this.ordersRepo.update(patch);

      return {
        status: 204,
      }
    } catch (error) {
      console.error(error);
      return getErrorResponse(error);
    }
  }

}