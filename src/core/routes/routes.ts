import { Router } from "express";
import { OrderService } from "../services/order.service.js";


const appRouter = Router();
const orderService = new OrderService();

/* ORDERS ROUTES */
appRouter.post("/create", async (req, res) => {
  try {

    const { body } = req;
    const response = await orderService.create(body);
    return res.status(response.status).json(response);

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });

  }
});


appRouter.delete("/delete/:protocol", async (req, res) => {
  return res.status(200).json({ msg: "route not implemented yet" });
});


appRouter.patch("/update", async (req, res) => {
  try {
    const { body } = req;
    const response = await orderService.update(body);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });
  }
});


appRouter.get("/all", async (req, res) => {
  try {
    const filters = {
      limit: Number(req.query.limit) ?? 50,
      offset: Number(req.query.offset) ?? 0,
      date: new Date((req.query.date as string) ?? Date.now()),
    }
    const response = await orderService.getAll();

    return res.status(response.status).json({ ...response, filters });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });
  }
});



export { appRouter };

