export type SpecialBudgetReason =
  "Indisponibilidade de Prestadores" |
  "Trajeto Longo " |
  "Baixa Infraestrutura" |
  "Complexidade do Serviço";


export type SpecialBudgetStatus =
  "Aguardando aprovação" |
  "Aprovado" |
  "Recusado";

export type SpecialBudget = {
  id: number,
  status: SpecialBudgetStatus
  cost: number,
  wheelDolliesQtd?: number,
  additionalWheels?: number,
  daysParked?: number,
  isUprighted?: boolean,
  isGroundWithdraw?: boolean,
  isOffRoad?: boolean,
  origin: string,
  destiny: string,
  workerBase: string,
  reason: SpecialBudgetReason,
  explanation: string,
}

