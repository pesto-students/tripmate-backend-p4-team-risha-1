import express, { Application, Request, Response } from "express";
import userRouter from "./routes/users";
import mongoose from "mongoose";

const app: Application = express();

const PORT: number = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hi this is our first page");
});

app.use(express.json());
// app.use("auth");
//
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Hola Server is running on port ${PORT}`);
});
