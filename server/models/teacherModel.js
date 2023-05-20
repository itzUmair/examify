import mongoose from "mongoose";

const Teacher = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true, maxLength: 50 },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 8 },
});

const TeacherSchema = mongoose.model("Teacher", Teacher);

export default TeacherSchema;
