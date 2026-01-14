import { Service } from "../types/Service";

interface CreateOrderDto {
  protocol: string;
  plate: string;
  date: string;
  hour: string;
  status: string;
  service: Service;
}