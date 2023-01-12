import express, { Application, Request, Response } from "express";
import userRouter from "./routes/users";
import tourRouter from "./routes/tour";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app: Application = express();

const PORT: any = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(express.json());
// app.use("auth");
//
app.use("/users", userRouter);
app.use("/tours", tourRouter);

app.listen(PORT, () => {
  console.log(`Hola Server is running on port ${PORT}`);
});
