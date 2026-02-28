import { Client } from "../types/Client";
import { Provider } from "../types/Provider";
import { Service } from "../types/Service";
import { ServiceStatus } from "../types/ServiceStatus";

export interface CreateOrderDto {
  plate: string;
  ticket: string;
  client: Client;
  service: Service;
  status: ServiceStatus;
  date: string;
  provider: Provider;
  notes: string[];
  eta?: number;
  agentName?: string;
  hasChecklist?: boolean;
};

export interface GetAllOrdersDto {
  page: number,
  limit: number,
  createdAt: string,
}; 
