import { SpecialBudgetReason, SpecialBudgetStatus } from "../types/SpecialBudget";

export interface CreateSpecialBudgetDto {
  protocol: string;
  cost: number;
  status: SpecialBudgetStatus;
  reason: SpecialBudgetReason;
  
  wheelDollies?: number;
  additionalWheels?: number;
  daysParked?: number;
  isUprighted?: boolean;
  isOffRoad?: boolean;
  needGroundWithdraw?: boolean;
  origin?: string;
  destiny?: string;
  workerBase?: string;
  explanation?: string;
}