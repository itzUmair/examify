import express from "express";
import {
  getAll,
  home,
  signup,
  signin,
  verifyToken,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").get(home);
router.route("/getAll").get(getAll);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/verifyToken").post(verifyToken);

export default router;
