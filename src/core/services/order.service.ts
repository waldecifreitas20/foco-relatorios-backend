import { Order } from "../../types/Order.js";
import { getErrorResponse } from "../../utils/errors.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { NoteRepository } from "../repositories/note.repository.js";


export class OrderService {
  ordersRepo = new OrderRepository();
  notesRepo = new NoteRepository();

  async create(data: Order) {
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


  async getAll({
    page, limit, createdAt
  }: {
    page: number, limit: number, createdAt: Date
  }) {
    try {
      const offset = page * limit;
      const orders = await this.ordersRepo.getAll(offset, limit) ?? [];

      return {
        status: 200,
        page,
        orders: orders.filter(o => {
          const [orderDate] = new Date(o.createdAt).toISOString().split("T");
          const [dateToCompare] = new Date(createdAt).toISOString().split("T");

          return orderDate === dateToCompare;
        }),
      }
    } catch (error) {
      console.log(error);
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