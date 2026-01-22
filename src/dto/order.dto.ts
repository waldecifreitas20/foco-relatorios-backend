import { Service } from "../types/Service";
import { SpecialBudgetStatus } from "../types/SpecialBudget";

export interface CreateOrderDto {
  protocol: string;
  plate: string;
  date: string;
  hour: string;
  status: string;
  service: Service;
  specialBudget? : {
    cost: number;
    status: SpecialBudgetStatus;
  } 
}

export interface UpdateOrderDto {
  protocol: string;
  plate?: string;
  date?: string;
  hour?: string;
  status?: string;
  service?: Service;
}

