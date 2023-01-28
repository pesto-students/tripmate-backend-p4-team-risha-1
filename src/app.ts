import express, { Application, Request, Response } from "express";
import userRouter from "./routes/users";
import tourRouter from "./routes/tour";
import notesRoter from "./routes/notes";
import favTour from "./routes/favTour";
import cms from "./routes/cms";
import explore from "./routes/explore";
import testimonial from "./routes/testimonial";
import * as dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import blogRouter from "./routes/blog";
import updateImageRoute from "./routes/updateImage";
import connectDB from "./config/db";
import colors from "colors";
import { updateImage } from "./controllers/updateImage";

dotenv.config();
connectDB();
const app: Application = express();

const PORT: any = process.env.PORT;

app.use(express.json());

// app.use("auth");
app.use(cors());
//

app.use("/users", userRouter);

app.use("/tours", tourRouter);
app.use("/blog", blogRouter);
app.use("/notes", notesRoter);
app.use("/favTour", favTour);
app.use("/cms", cms);
app.use("/explore", explore);
app.use("/testimonial", testimonial);
app.use("/update_image", updateImageRoute);

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
