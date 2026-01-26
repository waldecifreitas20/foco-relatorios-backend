import { CreateSpecialBudgetDto, GetSpecialBudgetDto, UpdateSpecialBudgetDto } from "../../dto/specialbudget.dto";
import { getErrorResponse } from "../../utils/errors.js";
import { OrderRepository } from "../repositories/order.repository";
import { SpecialBudgetRepository } from "../repositories/specialbudget.repository.js";

export class SpecialBudgetService {
  specialBudgetRepo = new SpecialBudgetRepository();
  orderRepo = new OrderRepository();

  async create(data: CreateSpecialBudgetDto) {
    try {
      const hasOrder = await this.orderRepo.hasOrder(data.protocol);

      if (!hasOrder) {
        return {
          status: 404,
          error: "invalid order protocol"
        };
      }

      if (!data.cost) {
        return {
          status: 400,
          error: "cost must be provided"
        }
      }

      if (isNaN(data.cost)) {
        return {
          status: 400,
          error: "cost must be a number"
        }
      }

      await this.specialBudgetRepo.create(data);
      return {
        status: 200,
        response: "special budget created",
      };

    } catch (error) {
      console.error(error);
      return getErrorResponse(error);
    }

  }

  async update(patch: UpdateSpecialBudgetDto) {
    try {

      if (isNaN(patch.cost ?? 0)) {
        return {
          status: 400,
          error: "cost must be a number"
        }
      }

      await this.specialBudgetRepo.update(patch);

      return {
        status: 200,
        response: "special budget updated",
      };
    } catch (error) {
      console.error(error);
      return getErrorResponse(error);
    }
  }


  async getAll() {
    try {
      const specialBudgets = (await this.specialBudgetRepo.getAll()).map(sb => {
        const { fk_order_protocol, ...specialBudget } = sb;
        return {
          ...specialBudget,
          order: fk_order_protocol,
        }
      }) as GetSpecialBudgetDto[];

      return {
        status: 200,
        specialBudgets
      }
    } catch (error) {
      console.error(error);
      return getErrorResponse(error);
    }
  }
}