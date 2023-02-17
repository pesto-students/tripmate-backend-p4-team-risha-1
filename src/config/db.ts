import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn: any = await mongoose.connect(
      process.env.DATABASE_URL ?? "url",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`MonogDB Connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};
export default connectDB;
