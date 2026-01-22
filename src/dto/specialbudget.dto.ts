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


export interface CreateMinimalSpecialBudgetDto {
  cost: number;
  status: SpecialBudgetStatus;
  protocol: string;
}


export interface UpdateSpecialBudgetDto {
  id: number;
  cost: number;
  status: SpecialBudgetStatus;
  protocol: string;
  reason: string;
}