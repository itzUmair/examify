import express from "express";
import {
  getAll,
  home,
  signup,
  signin,
  verifyToken,
  createQuiz,
  getAllQuizzes,
  getAllActiveQuizzes,
  getAllQuizResults,
  getQuiz,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").get(home);
router.route("/getAll").get(getAll);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/verifyToken").post(verifyToken);
router.route("/createQuiz").post(createQuiz);
router.route("/getAllQuizzes").post(getAllQuizzes);
router.route("/getAllActiveQuizzes").post(getAllActiveQuizzes);
router.route("/getAllQuizResults").post(getAllQuizResults);
router.route("/getQuiz").post(getQuiz);

export default router;
