import express, { Application, Request, Response } from "express";
import userRouter from "./routes/users";
import tourRouter from "./routes/tour";
import * as dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import blogRouter from "./routes/blog";

import connectDB from "./config/db";
import colors from "colors";

dotenv.config();
connectDB();
const app: Application = express();

const PORT: any = process.env.PORT;

app.use(express.json());
// app.use("auth");
app.use(cors());
//

app.use("/users", userRouter);

app.use(notFound);

app.use(errorHandler);

app.use("/tours", tourRouter);
app.use("/blog", blogRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`Hola Server is running on port ${PORT}`);
});
