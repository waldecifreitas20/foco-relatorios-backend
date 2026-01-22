import { CreateOrderDto, UpdateOrderDto } from "../../dto/order.dto";
import { CreateMinimalSpecialBudgetDto } from "../../dto/specialbudget.dto";
import { getErrorMessage } from "../../utils/databaseErrors";
import { OrderRepository } from "../repositories/order.repository.js";
import { SpecialBudgetRepository } from "../repositories/specialbudget.repository";


const getErrorResponse = (error: any) => {
  const { status, message } = getErrorMessage(error.code);

  return {
    status: message ? status : 500,
    response: message ?? "An error occurred at server",
  }
}

export class OrderService {
  ordersRepo = new OrderRepository();
  specialBudgetRepo = new SpecialBudgetRepository();


  async create(data: CreateOrderDto) {

    try {
      const { specialBudget, ...order } = data;

      await this.ordersRepo.create(order);
      await this.specialBudgetRepo.createMinimal({ ...specialBudget, protocol: order.protocol } as CreateMinimalSpecialBudgetDto);

      return {
        status: 200,
        response: "order created"

      }
    } catch (error: any) {
      console.log(error);

      return getErrorResponse(error);
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