import express from "express";
import { appRouter } from "./core/routes/routes";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ msg: 'ok' });
});


app.use("/", appRouter);



app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});