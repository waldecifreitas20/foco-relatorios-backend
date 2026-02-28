import { Order } from "../../types/Order.js";
import { getErrorResponse } from "../../utils/errors.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { NoteRepository } from "../repositories/note.repository.js";
import { CreateOrderDto, GetAllOrdersDto } from "../../dtos/order.dto.js";


const isEqualDate = (date1: Date, date2: Date) => {
  const [date1Only] = new Date(date1).toISOString().split("T");
  const [date2Only] = new Date(date2).toISOString().split("T");
  return date1Only === date2Only;
}


export class OrderService {
  ordersRepo = new OrderRepository();
  notesRepo = new NoteRepository();

  async create(data: CreateOrderDto) {
    try {
      if (!data.ticket) {
        return {
          status: 400,
          error: "ticket must be provided"
        }
      }

      const { ticket } = await this.ordersRepo.create(data);
      const note = await this.notesRepo.create(ticket, data.notes ?? []);

      return {
        status: 200,
        message: "order created",
        ticket,
        note
      }

    } catch (error: any) {
      console.error(error);

      return {
        status: 500,
        error: error.message,
      }
    }

  }

  async getAll({ page, limit, createdAt }: GetAllOrdersDto) {
    try {
      const offset = page * limit;
      
      let orders;
      if (!createdAt) {
        orders = await this.ordersRepo.getAll(offset, limit) ?? [];
      } else {
        orders = await this.ordersRepo.getAllByDate(offset, limit, createdAt) ?? [];
      }




      return {
        status: 200,
        page,
        orders: orders.map(o => {
          return {
            ...o,
            notes: o.notes.map(n => n.note),
          }
        }),
      }
    } catch (error) {
      console.log(error);
      return getErrorResponse(error);
    }
  }


  async getOrder(ticket: string) {
    try {
      const order = await this.ordersRepo.getByTicket(ticket);

      if (!order) {
        return {
          status: 404,
          error: "order not found",
        }
      }

      return {
        status: 200,
        order: {
          ...order,
          notes: order.notes.map(n => n.note),
        },
      }
    } catch (error) {
      console.error(error);
      return getErrorResponse(error);
    }
  }


  async update(patch: Order) {
    try {
      await this.ordersRepo.update(patch);

      if (patch.notes) {
        await this.notesRepo.create(patch.ticket, patch.notes);
      }

      return {
        status: 204,
      }
    } catch (error) {
      console.error(error);
      return getErrorResponse(error);
    }
  }

}