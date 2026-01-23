import { CreateSpecialBudgetDto, GetSpecialBudgetDto, UpdateSpecialBudgetDto } from "../../dto/specialbudget.dto";
import { SpecialBudget } from "../../types/SpecialBudget";
import { getErrorResponse } from "../../utils/databaseErrors.js";
import { SpecialBudgetRepository } from "../repositories/specialbudget.repository.js";

export class SpecialBudgetService {
  specialBudgetRepo = new SpecialBudgetRepository();

  async create(data: CreateSpecialBudgetDto) {
    try {
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
        response: {
          specialBudgets
        },
      }
    } catch (error) {
      console.error(error);
      return getErrorResponse(error);
    }
  }
}