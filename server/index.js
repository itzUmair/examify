import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database/connect.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.use(express.json());
app.use("/api/v1", router);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(8080, () => console.log("server listening on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
