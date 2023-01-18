import express, { Application, Request, Response } from "express";
import userRouter from "./routes/users";
import tourRouter from "./routes/tour";
import notesRoter from "./routes/notes";
import favTour from "./routes/favTour";
import cms from "./routes/cms";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import blogRouter from "./routes/blog";

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

app.use("/users", userRouter);
app.use("/tours", tourRouter);
app.use("/blog",blogRouter);
app.use("/notes",notesRoter);
app.use("/favTour",favTour);
app.use("/cms",cms);


app.listen(PORT, () => {
  console.log(`Hola Server is running on port ${PORT}`);
});
