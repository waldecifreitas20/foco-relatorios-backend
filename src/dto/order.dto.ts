import { Client } from "../types/Client";
import { MtaRequest } from "../types/MtaRequest";
import { Service } from "../types/Service";
import { ServiceStatus } from "../types/ServiceStatus";
import { SpecialBudgetStatus } from "../types/SpecialBudget";

export interface CreateOrderDto {
  plate: string;
  client: Client;
  protocol: string;
  service: Service;
  status: ServiceStatus;
  providerProtocol: string;
  date: string;
  hour?: string;
  mta?: MtaRequest;
  specialBudget ? : {
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

