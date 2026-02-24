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


appRouter.patch("/update/:ticket", async (req, res) => {
  try {
    const { body, params } = req;
    const response = await orderService.update({ ...body, ticket: params.ticket });
    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });
  }
});


appRouter.get("/order/:ticket", async (req, res) => {
  try {
    const { ticket } = req.params;
    const response = await orderService.getOrder(ticket);

    return res.status(response.status).json({ ...response });

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
      limit: Number(req.query.limit ?? 50),
      page: Number(req.query.page ?? 0),
      createdAt: new Date((req.query.createdAt as string) ?? Date.now()),
    }
    const response = await orderService.getAll(filters);

    return res.status(response.status).json({ ...response });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });
  }
});


export { appRouter };

