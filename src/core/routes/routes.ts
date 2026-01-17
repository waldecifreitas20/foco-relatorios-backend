import { Router } from "express";
import { OrderService } from "../services/order.service.js";
import { CreateOrderDto, UpdateOrderDto } from "../../dto/order.dto";


const appRouter = Router();
const orderService = new OrderService();

/* ORDERS ROUTES */
appRouter.post("/orders/create", async (req, res) => {
  const { body } = req;
  const response = await orderService.create(body as CreateOrderDto);

  return res.status(response.status).json(response);
});


appRouter.delete("/orders/delete/:protocol", async (req, res) => {
  return res.status(200).json({ msg: "route not implemented yet" });
});


appRouter.patch("/orders/update", async (req, res) => {
  const { body } = req;
  const response = await orderService.update(body as UpdateOrderDto);
  return res.status(response.status).json(response);
});


appRouter.get("/orders/all", async (req, res) => {
  const response = await orderService.getAll();
  return res.status(response.status).json(response);
});

/* ===================================== */


export { appRouter };

