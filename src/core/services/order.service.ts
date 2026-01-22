import { CreateOrderDto, UpdateOrderDto } from "../../dto/order.dto";
import { CreateMinimalSpecialBudgetDto } from "../../dto/specialbudget.dto";
import { getErrorResponse } from "../../utils/databaseErrors.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { SpecialBudgetRepository } from "../repositories/specialbudget.repository.js";


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