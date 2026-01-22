import { AppDatabase } from "../../database/connection";
import { CreateMinimalSpecialBudgetDto, CreateSpecialBudgetDto } from "../../dto/specialbudget.dto";

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

  async create(data: CreateSpecialBudgetDto) {
    return await this.table.create({
      data: {
        cost: data.cost,
        status: data.status,
        orderProtocol: data.protocol,
        reason: data.reason,
      }
    });
  }

  async getAll() {}

  async update() {}
}