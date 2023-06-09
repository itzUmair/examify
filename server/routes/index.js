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
  getQuizDetails,
  deleteQuiz,
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
router.route("/getQuizDetails/:quizID").get(getQuizDetails);
router.route("/getQuiz/:quizID").get(getQuiz);
router.route("/submitQuiz").post(submitQuiz);
router.route("/deleteQuiz/:quizID").delete(deleteQuiz);

export default router;
