import { Order } from "../../types/Order.js";
import { getErrorResponse } from "../../utils/errors.js";
import { OrderRepository } from "../repositories/order.repository.js";


export class OrderService {
  ordersRepo = new OrderRepository();

  async create(data: Order) {
    try {
      if (!data.ticket) {
        return {
          status: 400,
          error: "ticket must be provided"
        }
      }

      const { ticket } = await this.ordersRepo.create(data);
      return {
        status: 200,
        message: "order created",
        ticket,
      }

    } catch (error: any) {
      console.error(error);

      return {
        status: 500,
        error: error.message,
      }
    }

  }


  async getAll({
    page, limit, createdAt
  }: {
    page: number, limit: number, createdAt: Date
  }) {
    try {
      const offset = page * limit;
      const orders = await this.ordersRepo.getAll(offset, limit, createdAt);

      return {
        status: 200,
        page,
        orders,
      }
    } catch (error) {
      console.log(error);
      return getErrorResponse(error);
    }
  }


  async update(patch: Order) {
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