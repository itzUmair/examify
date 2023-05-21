import { TeacherSchema } from "../models/teacherModel.js";

const home = async (req, res) => {
  res.status(200).json({ message: "home" });
};

const getAll = async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    const newTeacher = await TeacherSchema.create({
      _id: id,
      name,
      email,
      password,
    });
    res.status(200).json({ message: "created your account", newTeacher });
  } catch (error) {
    res.status(500).json({ message: error.errors });
  }
};

export { getAll, home };
