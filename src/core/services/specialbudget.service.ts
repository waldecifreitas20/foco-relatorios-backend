import { CreateSpecialBudgetDto } from "../../dto/specialbudget.dto";
import { SpecialBudgetRepository } from "../repositories/specialbudget.repository";

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
      
    }

   }

  async getAll() { }

  async update() {}

}