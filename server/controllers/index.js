import TeacherSchema from "../models/teacherModel.js";
import QuizzesSchema from "../models/quizzesModel.js";
import QuizResultsSchema from "../models/quizResultsModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { CustomErrors } from "../utils/index.js";

dotenv.config();

const home = async (req, res) => {
  res.status(200).json({ message: "home" });
};

const getAll = async (req, res) => {
  // const { id, name, email, password } = req.body;
  const data = await TeacherSchema.find();
  res.status(200).json(data.length + 1);
};

// ==========================================Teacher Methods=============================================

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUserEmail = await TeacherSchema.find({ email });
  if (existingUserEmail.length) {
    CustomErrors(400, "account with this email already exists.");
  }
  const existingUserName = await TeacherSchema.find({ name });
  if (existingUserName.length) {
    CustomErrors(400, "account with this name already exists.");
  }
  const id = await TeacherSchema.find();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newTeacher = await TeacherSchema.create({
    _id: id.length + 1,
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "account created successfully." });
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const accountExist = await TeacherSchema.findOne({ email });
  if (accountExist && accountExist.length === 0) {
    CustomErrors(404, "invalid credentials.");
  }

  const validPassword = await bcrypt.compare(password, accountExist.password);

  if (!validPassword) {
    CustomErrors(404, "invalid credentials");
  }

  const id = accountExist._id;
  const emailAddress = accountExist.email;
  const name = accountExist.name;
  const accessToken = jwt.sign(
    {
      id,
      emailAddress,
      name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  const data = {
    id,
    emailAddress,
    name,
  };

  res.status(200).json({ accessToken, data });
});

const verifyToken = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : false;

  if (!token) {
    CustomErrors(400, "invalid token.");
  }

  try {
    const tokenValid = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    CustomErrors(401, "token expired.");
  }

  const data = jwt.decode(token, process.env.JWT_SECRET);
  res.status(200).json({ message: "valid", accessToken: token, data });
});

const createQuiz = asyncHandler(async (req, res) => {
  const {
    createdBy,
    scheduledFor,
    expiresOn,
    timeLimit,
    description,
    grade,
    title,
    subject,
    questions,
  } = req.body;

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };
  const quizID = generateRandomString();

  const newQuiz = await QuizzesSchema.create({
    _id: quizID,
    createdBy,
    createdOn: Date.now(),
    scheduledFor,
    expiresOn,
    timeLimit,
    description,
    grade,
    title,
    subject,
    questions,
  });

  res
    .status(200)
    .json({ message: "quiz created successfully", quizID: newQuiz._id });
});

const getAllQuizzes = asyncHandler(async (req, res) => {
  const id = req.params.teacherID;
  const date = new Date();
  const currentDate = date.toISOString();
  const quizzes = await QuizzesSchema.find({ createdBy: id })
    .where("expiresOn")
    .lte(currentDate)
    .select({
      _id: 1,
      title: 1,
      grade: 1,
      subject: 1,
      expiresOn: 1,
    });
  res.status(200).json(quizzes);
});

const getAllActiveQuizzes = asyncHandler(async (req, res) => {
  const id = req.params.teacherID;
  const date = new Date();
  const currentDate = date.toISOString();
  const activeQuizzes = await QuizzesSchema.find({ createdBy: id })
    .where("expiresOn")
    .gte(currentDate)
    .select({ _id: 1, title: 1, grade: 1, subject: 1, expiresOn: 1 });
  res.status(200).json(activeQuizzes);
});

const getQuizDetails = asyncHandler(async (req, res) => {
  const id = req.params.quizID;
  const quiz = await QuizzesSchema.findOne({ _id: id });
  if (quiz.length === 0) {
    CustomErrors(404, "no quiz with this id was found.");
  }
  res.status(200).json(quiz);
});

const getAllQuizResults = asyncHandler(async (req, res) => {
  const id = req.params.quizID;
  const quizzes = await QuizResultsSchema.find({ quiz_id: id }).sort({
    studentScore: -1,
  });
  res.status(200).json({ data: quizzes });
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const id = req.params.quizID;
  const quiz = await QuizzesSchema.deleteOne({ _id: id });
  res.status(200).json({ message: "deleted successfully" });
});

// ================================================Student Methods========================

const getQuiz = asyncHandler(async (req, res) => {
  const id = req.params.quizID;
  const quiz = await QuizzesSchema.findOne({ _id: id })?.select(
    "-questions.correctAnswer"
  );
  const currentDate = new Date();
  const sf = new Date(quiz.scheduledFor);
  const eo = new Date(quiz.expiresOn);
  const expiryTime = (eo - sf) / (1000 * 60);
  if (!quiz || eo < currentDate || expiryTime < quiz.timeLimit) {
    CustomErrors(404, "no quiz with this code was found.");
  }
  res.status(200).json(quiz);
});

const submitQuiz = asyncHandler(async (req, res) => {
  const { id, name, answers } = req.body;
  let score = 0;
  const correctAnswers = await QuizzesSchema.findOne({ _id: id }).select(
    "questions.correctAnswer"
  );
  for (let answer = 0; answer < answers.length; answer++) {
    if (answers[answer] === correctAnswers.questions[answer].correctAnswer) {
      score++;
    }
  }
  const date = new Date();
  await QuizResultsSchema.create({
    quiz_id: id,
    studentName: name,
    studentScore: score,
    attemptOn: date.toISOString(),
  });
  res.status(200).json({ score });
});

export {
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
};
