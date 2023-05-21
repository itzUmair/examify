import express from "express";
import {
  getAll,
  home,
  signup,
  signin,
  verifyToken,
  createQuiz,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").get(home);
router.route("/getAll").get(getAll);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/verifyToken").post(verifyToken);
router.route("/createQuiz").post(createQuiz);

export default router;
