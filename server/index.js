import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database/connect.js";

dotenv.config();

const app = express();

const startServer = () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("server listening on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
