import express from "express";
import { getAll, home } from "../controllers/index.js";

const router = express.Router();

router.route("/").get(home);
router.route("/getAll").post(getAll);

export default router;
