import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UsersModel.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const secret = process.env.secret;
// console.log({ secret });
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "user alrdy exists " });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "user reg. successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "user doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); //pw he put , pw in db

  if (!isPasswordValid) {
    return res.json({ message: "username or password incorrect try again!" });
  }
  //if done all the steps then
  const token = jwt.sign({ id: user._id }, secret);
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(req.body);
  // console.log(req.headers);
  if (token) {
    jwt.verify(token, secret, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
