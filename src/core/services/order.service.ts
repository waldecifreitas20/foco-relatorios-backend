import { CreateOrderDto } from "../../dto/order.dto";

export class OrderService {

  async create(order: CreateOrderDto) {
    return {
      status: 200,
      response: "Ok",
    }
  }
}