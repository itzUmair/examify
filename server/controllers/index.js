import { TeacherSchema } from "../models/teacherModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const home = async (req, res) => {
  res.status(200).json({ message: "home" });
};

const getAll = async (req, res) => {
  // const { id, name, email, password } = req.body;
  const data = await TeacherSchema.find();
  res.status(200).json(data.length + 1);
};

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await TeacherSchema.find({ email });
  if (existingUser.length) {
    res
      .status(400)
      .json({ message: "account with this email already exists." });
    return;
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

  if (accountExist.length === 0) {
    res.status(404).json({ message: "invalid credentials." });
    return;
  }

  const validPassword = await bcrypt.compare(password, accountExist.password);

  if (!validPassword) {
    res.status(401).json({ message: "invalid credentials." });
    return;
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
      expiresIn: "2m",
    }
  );

  res.status(200).json(accessToken);
});

const verifyToken = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : false;

  if (!token) {
    res.status(400).json({ message: "invalid token" });
    return;
  }

  const tokenValid = jwt.verify(token, process.env.JWT_SECRET);

  if (!tokenValid) {
    res.status(401).json({ message: "token expired" });
    return;
  }

  const data = jwt.decode(token, process.env.JWT_SECRET);
  res.status(200).json({ accessToken: token, data });
});

export { getAll, home, signup, signin, verifyToken };
