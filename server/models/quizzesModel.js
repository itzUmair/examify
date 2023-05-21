import mongoose from "mongoose";

const Quizzes = new mongoose.Schema(
  {
    _id: { type: String, required: true, minLength: 6 },
    createBy: { type: Number, required: true },
    createdOn: { type: Date, required: true },
    scheduledFor: { type: Date, required: true },
    timeLimit: { type: String, required: true },
    description: { type: String, maxLength: 200 },
    quizGrade: { type: String, required: true, maxLength: 10 },
    title: { type: String, required: true, maxLength: 50 },
    subject: { type: String, required: true, maxLength: 20 },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { collection: "quiz" }
);

const QuizzesModel = mongoose.model("Quizzes", Quizzes);

export default QuizzesModel;
