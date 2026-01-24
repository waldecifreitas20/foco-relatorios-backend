import { Router } from "express";
import { OrderService } from "../services/order.service.js";
import { SpecialBudgetService } from "../services/specialbudget.service.js";
import { CreateOrderDto, UpdateOrderDto } from "../../dto/order.dto";


const appRouter = Router();
const orderService = new OrderService();
const specialBudgetService = new SpecialBudgetService();

/* ORDERS ROUTES */
appRouter.post("/orders/create", async (req, res) => {
  try {

    const { body } = req;
    const response = await orderService.create(body as CreateOrderDto);
    return res.status(response.status).json(response);

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });

  }
});


appRouter.delete("/orders/delete/:protocol", async (req, res) => {
  return res.status(200).json({ msg: "route not implemented yet" });
});


appRouter.patch("/orders/update", async (req, res) => {
  try {
    const { body } = req;
    const response = await orderService.update(body as UpdateOrderDto);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });
  }
});


appRouter.get("/orders/all", async (req, res) => {
  try {
    
  const response = await orderService.getAll();
  return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });
  }
});


/* SPECIAL BUDGET */
appRouter.post("/special-budget/create", async (req, res) => {
  const { body } = req;
  const response = await specialBudgetService.create(body);

  return res.status(response.status).json(response);
});

appRouter.patch("/special-budget/update", async (req, res) => {
  const { body } = req;
  const response = await specialBudgetService.update(body);

  return res.status(response.status).json(response);
});

appRouter.get("/special-budget/all", async (req, res) => {
  try {
    
  const response = await specialBudgetService.getAll();
  return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      response: "Internal error",
    });
  }
});

export { appRouter };

