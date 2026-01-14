import { Router } from "express";
import { OrderService } from "../services/order.service";
import { CreateOrderDto } from "../../dto/order.dto";


const appRouter = Router();
const orderService = new OrderService();

/* ORDERS ROUTES */
appRouter.post("/orders/create", async (req, res) => {
  const { body } = req;
  const { response, status } = await orderService.create(body as CreateOrderDto);

  return res.status(status).json(response);
});

appRouter.delete("/orders/delete/:protocol", async (req, res) => {
  return res.status(200).json({ msg: "route not implemented yet" });
});

appRouter.patch("/orders/update/:protocol", async (req, res) => {
  return res.status(200).json({ msg: "route not implemented yet" });
});

appRouter.get("/orders/all", async (req, res) => {
  return res.status(200).json({ msg: "route not implemented yet" });
});





export { appRouter };

