import { Router } from "express";
import { OrderService } from "../services/order.service";


const appRouter = Router();

const orderService = new OrderService();

/* ORDERS ROUTES */
appRouter.post("/orders/create", orderService.create);


export { appRouter };

