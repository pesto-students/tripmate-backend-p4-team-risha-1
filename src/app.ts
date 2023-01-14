import express, { Application, Request, Response } from "express";
import userRouter from "./routes/users";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db";
import colors from "colors";

dotenv.config();
connectDB();
const app: Application = express();

const PORT: any = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(express.json());
// app.use("auth");
//
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Hola Server is running on port ${PORT}`);
});
