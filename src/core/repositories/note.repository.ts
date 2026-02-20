import { AppDatabase } from "../../database/connection";

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