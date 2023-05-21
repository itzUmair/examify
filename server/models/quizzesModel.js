import mongoose from "mongoose";

const Quizzes = new mongoose.Schema(
  {
    _id: { type: String, required: true, minLength: 6 },
    createdBy: { type: String, required: true },
    createdOn: { type: Date, required: true },
    scheduledFor: { type: Date, required: true },
    expiresOn: { type: Date, required: true },
    timeLimit: { type: String, required: true },
    description: { type: String, maxLength: 200 },
    grade: { type: String, required: true, maxLength: 10 },
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

const QuizzesSchema = mongoose.model("Quizzes", Quizzes);

export default QuizzesSchema;
