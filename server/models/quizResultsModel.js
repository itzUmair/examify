import mongoose from "mongoose";

const QuizResults = new mongoose.Schema({
  quizID: { type: String, required: true },
  results: [
    {
      studentName: { type: String, required: true, maxLength: 20 },
      studentScore: { type: Number, required: true },
      attemptOn: { type: Date, default: Date.now },
    },
  ],
});

const QuizResultsModel = mongoose.model("QuizResults", QuizResults);
