import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
