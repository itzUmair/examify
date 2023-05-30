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
  submitQuiz,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").get(home);
router.route("/getAll").get(getAll);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/verifyToken").post(verifyToken);
router.route("/createQuiz").post(createQuiz);
router.route("/getAllQuizzes/:teacherID").get(getAllQuizzes);
router.route("/getAllActiveQuizzes/:teacherID").get(getAllActiveQuizzes);
router.route("/getAllQuizResults/:quizID").get(getAllQuizResults);
router.route("/getQuiz/:quizID").get(getQuiz);
router.route("/submitQuiz").post(submitQuiz);

export default router;
