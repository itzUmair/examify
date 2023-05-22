import mongoose from "mongoose";

const QuizResults = new mongoose.Schema(
  {
    quiz_id: { type: String, required: true },
    studentName: { type: String, required: true, maxLength: 20 },
    studentScore: { type: Number, required: true },
    attemptOn: { type: Date, default: Date.now },
  },
  { collection: "quiz_result" }
);

const QuizResultsSchema = mongoose.model("QuizResults", QuizResults);
export default QuizResultsSchema;
