import { CreateOrderDto } from "../../dto/order.dto";
import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  repo = new OrderRepository();

  async create(order: CreateOrderDto) {

    try {
      await this.repo.create(order);

      return {
        status: 200,
        response: "order created"

      }
    } catch (error) {
      console.log(error);

      return {
        status: 502,
        response: "An error occurred at server",
      }
    }

  }


  async getAll() {
    try {
      const orders = await this.repo.getAll();

      return {
        status: 200,
        orders,
      }
    } catch (error) {
      console.log(error);

      return {
        status: 502,
        response: "An error occurred at server",
      }
    }
  }
}