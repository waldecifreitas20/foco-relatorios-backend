import { AppDatabase } from "../../database/connection";
import { CreateMinimalSpecialBudgetDto } from "../../dto/specialbudget.dto";

export class SpecialBudgetRepository {
  table = AppDatabase.specialBudget;


  async createMinimal(specialBudget: CreateMinimalSpecialBudgetDto) {
    return await this.table.create({
      data: {
       cost: specialBudget.cost,
       status: specialBudget.status,
       orderProtocol: specialBudget.protocol,
      },   
    });
  }

  async create() {}

  async getAll() {}

  async update() {}
}