import { AppDatabase } from "../../database/connection.js";

export class NoteRepository {
  async create(ticket: string, notes: string[]) {
    await AppDatabase.orderNote.createMany({
      data: notes.map(note => ({
        orderTicket: ticket,
        note,
        createdAt: new Date(Date.now()),
      })),
    });
  }
}