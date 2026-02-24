import { AppDatabase } from "../../database/connection.js";
import { Order } from "../../types/Order.js";
import { getDatabaseErrorMessage } from "../../utils/errors.js";

export class OrderRepository {
  table = AppDatabase.order;

  async create(order: Order) {
    try {
      return await this.table.create({
        data: {
          client: order.client,
          plate: order.plate,
          service: order.service,
          status: order.status,
          ticket: order.ticket,
          provider: order.provider,
          agentName: order.agentName ?? "",
        },
      });
    } catch (error: any) {
      console.error(error);
      const msg = getDatabaseErrorMessage(error.code);

      throw new Error(msg);
    }

  }

  async getAll(skip: number, take: number) {
    return await this.table.findMany({
      include: {
        notes: {
          select: {
            note: true,
          }
        },
      },
      skip,
      take,
    });
  }


  async update(patch: any) {
    return await this.table.update({
      where: {
        ticket: patch.ticket
      },
      data: {
        plate: patch.plate,
        service: patch.service,
        status: patch.status,
        eta: patch.eta,
        agentName: patch.agentName,
        hasChecklist: patch.hasChecklist,
        client: patch.client,
        provider: patch.provider,
      }
    })

  }

  async delete() { }
}