import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL)
    .then(() => console.log("connected to mongodb"))
    .catch((error) => console.log(error));
};

export default connectDB;
